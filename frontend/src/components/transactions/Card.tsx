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
      className="mb-4 grid cursor-no-drop grid-cols-[0.5fr_1fr_1fr_0.75fr] grid-rows-[1.5fr_1fr] gap-2 rounded-2xl bg-zinc-50 p-2 text-lg shadow-sm shadow-zinc-50/70 transition-colors duration-100 ease-in-out hover:bg-pink-100 focus:bg-pink-100 sm:px-4 sm:py-3 xl:mx-auto xl:max-w-10/12 xl:grid-cols-[0.5fr_1fr_1fr_0.75fr] xl:grid-rows-[2fr_1fr] xl:px-8 2xl:mx-auto 2xl:max-w-9/12 2xl:grid-cols-[0.5fr_1fr_1fr_0.5fr] 2xl:grid-rows-[2.5fr_1.5fr] 2xl:px-10"
    >
      {/* icon */}
      <div
        className={`${dynamicCategoryColor(category)} grid aspect-square min-h-12 w-max min-w-12 place-items-center rounded-2xl p-2 md:min-h-13 md:min-w-13 2xl:min-h-14 2xl:min-w-14`}
      >
        {<DynamicIcon icon={category} />}
      </div>

      {/* description */}
      {/* date */}
      <div className="col-start-2 col-end-4 flex flex-col gap-1">
        <div className="line-clamp-2 rounded-2xl bg-blue-50 px-2 font-bold text-ellipsis text-stone-800 md:text-xl">
          {description.slice(0, 1).toUpperCase() + description.slice(1)}
        </div>

        <div className="pl-2 text-left text-sm font-semibold text-slate-700 md:text-base">
          {dateStr}
        </div>
      </div>

      {/* amount */}
      <div
        className={`font-roboto mx-auto flex h-max max-w-max gap-1 rounded-2xl bg-amber-100/40 px-2 text-sm md:px-3 md:text-base ${cardClassText} md:font-medium`}
      >
        ₹
        <NumericFormat
          value={amount}
          thousandSeparator
          thousandsGroupStyle="lakh"
          displayType="text"
        />
      </div>

      {/* actions */}
      <div className="justify-left col-start-1 col-end-2 row-start-2 row-end-3 my-auto ml-1 flex items-end gap-2">
        {!delLoading && (
          <>
            <button id="delete" onClick={openModal}>
              <FaTrash className={"cursor-pointer text-rose-500"} />
            </button>
            <dialog ref={delDialogRef} className="modal">
              <div className="modal-box shadow-main flex aspect-square w-10/12 flex-col justify-around bg-zinc-50 bg-[url('/bg_enhanced.webp')] bg-cover bg-fixed bg-center bg-no-repeat sm:h-4/12 sm:w-1/2 2xl:h-[25%] 2xl:w-1/6">
                <div className="mx-auto w-max rounded-2xl bg-zinc-900/10 px-4 py-1">
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
          <div className="modal-box shadow-main flex !h-[80vh] flex-col bg-zinc-50 bg-[url('/bg_enhanced.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-10 xl:!max-w-[60vw] 2xl:!max-w-[50vw]">
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

      {/* account */}
      {/* category */}
      {/* location */}
      <div className="col-start-2 col-end-4 row-start-2 row-end-3 my-auto flex flex-wrap items-end justify-start gap-2 pl-2 md:gap-8 xl:gap-14">
        <div
          className={`${cardClassText} ${cardClassBg} max-w-max rounded-2xl px-2 py-0.5 text-sm font-semibold md:text-base`}
        >
          {account[0].toUpperCase() + account.slice(1)}
        </div>

        <div
          className={`max-w-max rounded-2xl bg-purple-400/20 px-2 py-0.5 text-sm font-semibold text-purple-800 md:text-base`}
        >
          {category[0].toUpperCase() + category.slice(1)}
        </div>

        <div className="rounded-2xl bg-zinc-200/80 px-2 py-0.5 text-sm font-semibold text-slate-800 md:text-base">
          {location.slice(0, 1).toUpperCase() + location.slice(1)}
        </div>
      </div>

      {/* paymentType */}
      <div className="row-start-2 row-end-3 my-auto text-center text-sm md:text-base">
        <div className="font-semibold text-zinc-500">
          {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
