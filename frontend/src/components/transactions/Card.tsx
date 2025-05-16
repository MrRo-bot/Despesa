import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { motion } from "motion/react";

import formatDate from "../../utils/formatDate";
import { DELETE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import { NumericFormat } from "react-number-format";
import dynamicCategoryColor from "../../utils/dynamicCategoryColor";
import DynamicIcon from "../DynamicIcon";
import { accountColorBgMap, accountColorMap } from "../../utils/constants";
import customToastFunction from "../Toastify";
import { useEffect, useRef, useState } from "react";
import Transaction from "./Transaction";

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

  //@ts-expect-error don't know why it cant recognize
  const cardClassBg = accountColorBgMap[account];

  //@ts-expect-error don't know why it cant recognize
  const cardClassText = accountColorMap[account];

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="flex items-center justify-start gap-5 p-2 mb-4 text-lg transition-colors duration-100 ease-in-out rounded-full cursor-no-drop bg-zinc-50 hover:bg-pink-100 focus:bg-pink-100"
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
              <div className="modal-box shadow-main flex aspect-square h-2/12 w-2/12 flex-col justify-between bg-zinc-50 bg-[url('/bg_enhanced.png')] bg-cover bg-fixed bg-center bg-no-repeat">
                <h3 className="mx-auto text-2xl font-black text-transparent max-w-max bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text">
                  Are you SURE!!!!
                </h3>

                <form method="dialog">
                  <div className="flex items-center justify-center gap-3 mx-auto max-w-max">
                    <button
                      className="font-black btn font-roboto shadow-main bg-zinc-100 text-zinc-900/80 active:shadow-none"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="font-black btn font-roboto shadow-main bg-zinc-100 text-zinc-900/80 active:shadow-none"
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
          <HiPencilAlt className="text-yellow-600 cursor-pointer" size={20} />
        </button>
        <dialog ref={updDialogRef} className="modal">
          <div className="modal-box shadow-main flex max-h-max flex-col bg-zinc-50 bg-[url('/bg_enhanced.png')] bg-cover bg-fixed bg-center bg-no-repeat pt-10">
            {isOpen && <Transaction id={_id} />}
            <button
              className="absolute btn btn-sm btn-circle btn-secondary top-2 right-2"
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
