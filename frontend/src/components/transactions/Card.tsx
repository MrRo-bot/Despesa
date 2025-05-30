import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
// import { Link } from "react-router-dom";

import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";

import { DELETE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";

import formatDate from "../../utils/formatDate";
import dynamicCategoryColor from "../../utils/dynamicCategoryColor";
import customToastFunction from "../../utils/Toastify";

import DynamicIcon from "../DynamicIcon";
import UpdateTransaction from "./UpdateTransaction";

import { accountColorBgMap, accountColorMap } from "../../utils/constants";

const Card = ({
  transactionData,
}: {
  transactionData: {
    _id: string;
    description: string;
    paymentType: string;
    account: string;
    category: string;
    amount: number;
    location: string;
    date: string;
  };
}) => {
  const {
    _id,
    description,
    paymentType,
    amount,
    account,
    category,
    location,
    date,
  } = transactionData;

  const [isOpen, setIsOpen] = useState(false);
  const delDialogRef = useRef<HTMLDialogElement>(null);
  const updDialogRef = useRef<HTMLDialogElement>(null);

  const openModal = (e: { currentTarget: { id: string } }) => {
    setIsOpen(true);
    return e.currentTarget.id === "delete"
      ? delDialogRef.current?.showModal()
      : updDialogRef.current?.showModal();
  };

  const closeModal = (e: { currentTarget: { id: string } }) => {
    setIsOpen(false);
    return e.currentTarget.id === "delete"
      ? delDialogRef.current?.close()
      : updDialogRef.current?.close();
  };

  useEffect(() => {
    if (updDialogRef.current?.open && !isOpen) updDialogRef.current?.close();
    if (delDialogRef.current?.open && !isOpen) delDialogRef.current?.close();
    if (updDialogRef.current?.open && isOpen) updDialogRef.current?.showModal();
    if (delDialogRef.current?.open && isOpen) delDialogRef.current?.showModal();
  }, [isOpen]);

  const [deleteTransaction, { loading: delLoading }] = useMutation(
    DELETE_TRANSACTION,
    {
      refetchQueries: ["GetTransactions"],
    },
  );

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: transactionData._id,
        },
      });
      customToastFunction(`❌👋 POOF!! Gone`, "top-center", "light", "");
    } catch (error) {
      customToastFunction(`${error}`, "top-center", "colored", "");
    }
  };

  const dateStr = formatDate(date);

  const cardClassBg = accountColorBgMap[account];
  const cardClassText = accountColorMap[account];

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="mb-4 flex cursor-no-drop items-center justify-start gap-5 rounded-full bg-zinc-50 p-2 text-lg shadow-sm shadow-zinc-50/70 transition-colors duration-100 ease-in-out hover:bg-pink-100 focus:bg-pink-100"
    >
      <div
        className={`${dynamicCategoryColor(category)} grid aspect-square h-12 w-12 place-items-center rounded-full p-2`}
      >
        {<DynamicIcon icon={category} />}
      </div>
      <div className="line-clamp-1 w-[25%] text-xl font-bold text-stone-800">
        {description.slice(0, 1).toUpperCase() + description.slice(1)}
      </div>
      <div className="w-[12%]">
        <div className="text-zinc-500">
          {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
        </div>
      </div>
      <div className="w-[10%]">
        <span
          className={`font-roboto mx-auto flex w-max gap-1 rounded-full bg-slate-100 px-3 ${cardClassText} font-medium`}
        >
          ₹
          <NumericFormat
            value={amount}
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
          />
        </span>
      </div>
      <div className="line-clamp-1 w-[10%]">
        <div
          className={`${cardClassText} ${cardClassBg} mx-auto w-max rounded-full px-2 py-0.5 text-base font-semibold`}
        >
          {account[0].toUpperCase() + account.slice(1)}
        </div>
      </div>
      <div className="w-[13%]">
        <div
          className={`mx-auto w-max rounded-full bg-purple-400/20 px-2 py-0.5 text-base font-semibold text-purple-800`}
        >
          {category[0].toUpperCase() + category.slice(1)}
        </div>
      </div>
      <div className="font-roboto line-clamp-1 w-[10%] gap-2 text-center text-base font-medium text-slate-600">
        {dateStr}
      </div>
      <div className="text-medium line-clamp-1 w-[12%] px-2 text-center font-semibold text-slate-800">
        {location.slice(0, 1).toUpperCase() + location.slice(1)}
      </div>
      <div className="flex w-[6%] items-center justify-center gap-2">
        {!delLoading && (
          <>
            <button id="delete" onClick={openModal}>
              <FaTrash className={"cursor-pointer text-rose-500"} />
            </button>
            <dialog ref={delDialogRef} className="modal">
              <div className="modal-box shadow-main flex aspect-square h-[25%] w-1/6 flex-col justify-around bg-zinc-50 bg-[url('/bg_enhanced.webp')] bg-cover bg-fixed bg-center bg-no-repeat">
                <div className="mx-auto w-max rounded-full bg-zinc-900/10 px-4 py-1">
                  <h3 className="bg-gradient-to-r from-pink-800 via-indigo-800 to-pink-800 bg-clip-text text-2xl font-black text-transparent">
                    Are you SURE!!!!
                  </h3>
                </div>

                <form method="dialog">
                  <div className="mx-auto flex max-w-max items-center justify-center gap-3">
                    <button
                      className="font-roboto btn mx-auto mt-5 w-max rounded-xl border-[#591660] bg-[#622069] py-2 font-black text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="font-roboto btn mx-auto mt-5 w-max rounded-xl border-[#591660] bg-[#622069] py-2 font-black text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </>
        )}

        <button id="update" onClick={openModal}>
          <HiPencilAlt className="cursor-pointer text-yellow-600" size={20} />
        </button>
        <dialog ref={updDialogRef} className="modal">
          <div className="modal-box shadow-main flex !min-w-[45rem] flex-col bg-zinc-50 bg-[url('/bg_enhanced.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-10">
            {isOpen && <UpdateTransaction id={_id} />}
            <button
              className="btn btn-sm btn-circle btn-secondary absolute top-2 right-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </dialog>
      </div>
    </motion.div>
  );
};

export default Card;
