import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
};

interface AdminModalApproveProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  mentor: string | undefined;
  handleApprove: (id: string) => void;
}

export const AdminModalApprove: FC<AdminModalApproveProps> = ({
  open,
  handleClose,
  // handleOpen,
  mentor,
  handleApprove,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Approve Application
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to Approve ?
          </Typography>
          <div className="flex justify-end mt-3">
            <Button color="error" onClick={handleClose}>
              NO
            </Button>
            <Button
              onClick={() => {
                if (mentor) {
                  handleApprove(mentor);
                }
              }}
            >
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

interface AdminModalRejectProps {
  openModalTwo: boolean;
  handleCloseTwo: () => void;
  mentor: string | undefined;
  handleOpenTwo: () => void;
  handleReject: (id: string) => void;
}

export const AdminModalReject: FC<AdminModalRejectProps> = ({
  openModalTwo,
  handleCloseTwo,
  mentor,
  handleReject,
}) => {
  return (
    <div>
      <Modal
        open={openModalTwo}
        onClose={handleCloseTwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reject Application
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to Reject ?
          </Typography>
          <div className="flex justify-end mt-3">
            <Button color="error" onClick={handleCloseTwo}>
              NO
            </Button>
            <Button
              onClick={() => {
                if (mentor) {
                  handleReject(mentor);
                }
              }}
            >
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
