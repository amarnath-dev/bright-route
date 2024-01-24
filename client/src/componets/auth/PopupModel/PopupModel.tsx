import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const PopupModal = ({
  modalState,
  message,
  posText,
  negText,
  successCallback,
  cancelCallback,
}: {
  modalState: boolean;
  message: string;
  posText: string;
  negText: string;
  successCallback: (() => void) | null;
  cancelCallback: (() => void) | null;
}) => {
  const [openModal, setOpenModal] = useState(modalState);
  const buttonStyle = {
    width: "150px",
    height: "40px",
  };
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  setOpenModal(false);
                  {
                    successCallback ? successCallback() : null;
                  }
                }}
                style={buttonStyle}
              >
                {posText}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setOpenModal(false);
                  {
                    cancelCallback ? cancelCallback() : null;
                  }
                }}
                style={buttonStyle}
              >
                {negText}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopupModal;
