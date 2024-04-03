import { Modal } from "flowbite-react";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { toast } from "react-toastify";

interface RateMentorProps {
  openModal: boolean;
  mentorId: string | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RateMentor: React.FC<RateMentorProps> = ({
  openModal,
  mentorId,
  setOpenModal,
}) => {
  const [value, setValue] = React.useState<number | null>(0);
  const [experiance, setExperiance] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async () => {
    if (!experiance || !value) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        `/rate/${mentorId}`,
        { value, experiance },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (mentorId) {
    console.log("Mentor ID", mentorId);
  }

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Rate the Mentor</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <h1 className="text-white py-2 text-lg">
                  How much would you rate this mentor ?
                </h1>
                <Rating
                  className="bg-white rounded-md"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
            </div>

            <div className="w-full">
              <h1 className="text-white py-2">Tell us about your experiance</h1>
              <textarea
                name="experiance"
                rows={5}
                value={experiance}
                onChange={(e) => setExperiance(e.target.value)}
                className="w-full bg-gray-800 rounded-md px-3 py-2 text-white"
                placeholder="Write your experiance here"
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-end">
            <button
              className="px-3 py-1 rounded-md text-white bg-teal-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RateMentor;
