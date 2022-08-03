import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const defaultPosition = toast.POSITION.TOP_CENTER;

/**
 * Show Toast
 *
 * Display toast
 *
 * @param {string} type message type, success/error
 * @param {string} msg toast message
 * @param {integer} autoClose auto close value in millisecond
 * @param {string} className toaster class name
 * @param {string} position toast position; ex-'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'
 */

export const showToast = ( type = "success", msg, autoClose = 2000, className = "primaryColor", position = defaultPosition ) => {
  if (type === "success") {
    toast.success(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "primaryColor" : className,
      position: position,
    });
  } else if (type === "error") {
    toast.error(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "dangerColor" : className,
      position: position,
    });
  }else if (type === "info") {
    toast.info(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? "infoColor" : className,
      position: position,
    });
  }
};


// How to use react-toastify
//showToast('success', 'Product add to cart successfully !');

//showToast('error', 'Please fill the inputs properly.');