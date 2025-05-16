import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import {
  Bounce,
  toast,
  ToastContentProps,
  ToastPosition,
} from "react-toastify";

const customToastFunction = (
  message:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<unknown>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | ((props: ToastContentProps<unknown>) => ReactNode)
    | null
    | undefined,
  position: ToastPosition | undefined,
  theme: string,
  type: string,
) => {
  return type === "error"
    ? toast.error(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
        className: "font-bold",
      })
    : toast(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
        className: "font-bold",
      });
};

export default customToastFunction;
