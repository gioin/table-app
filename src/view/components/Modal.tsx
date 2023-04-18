import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useKey } from "react-use";

interface ModalProps {
  readonly children?: React.ReactNode | undefined;
  readonly isModalOpen: boolean;
  readonly footer?: JSX.Element;
  readonly onClose?: any;
  readonly className?: string;
  readonly height?: string | number;
  readonly width?: string | number;
}

const Modal = ({
  children,
  isModalOpen,
  footer,
  onClose,
  className,
  height,
  width
}: ModalProps): JSX.Element => {

  useKey("Escape", () => void onClose());
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);


  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 z-[11111] flex h-[100vh] w-[100vw] items-center justify-center bg-[#000]/50 duration-[200ms]  ease-in-out ${
        isModalOpen ? "visible opacity-100 block" : "hidden z-[-1] opacity-0"
      } ${className ?? ""}`}
    >
      <div
        id="global-modal-id"
        className={`w-full max-w-[80%] overflow-y-hidden rounded-card  bg-primaryWhite duration-[200ms] ease-in-out
        ${isModalOpen ? "mb-0" : "mb-5"} bg-white`}
        style={{ height, width }}
      >
        <div className="flex items-center justify-between border-borderColor py-3 px-4">
          <div className="flex items-center">
          </div>
          <button
            onClick={onClose}
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full p-[3px] duration-[300ms] ease-in-out hover:bg-hover-icon"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="py-3 px-4 ">
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
        {footer != null && <div className="py-3 px-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
