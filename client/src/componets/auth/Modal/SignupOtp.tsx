import React from "react";
import { Button, Label, Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { signup } from "../../../services/authServices";
import { useAppDispatch } from "../../../app/hooks";
// import { authActions } from "../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import Snackbar from "@mui/material/Snackbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignupOtp.css";

const SignupOtp = ({
  openModal,
  setOpenModal,
  serverResponse,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  serverResponse: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    otp: string;
  } | null;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const box1 = useRef<HTMLInputElement>(null);
  const box2 = useRef<HTMLInputElement>(null);
  const box3 = useRef<HTMLInputElement>(null);
  const box4 = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (box1.current && box2.current && box3.current && box4.current) {
      if (
        box1.current.value.length &&
        box2.current.value.length &&
        box3.current.value.length &&
        box1.current.value.length > 0
      ) {
        try {
          const b1 = box1.current.value;
          const b2 = box2.current.value;
          const b3 = box3.current.value;
          const b4 = box4.current.value;
          const userOtp: string = b1 + b2 + b3 + b4;
          if (serverResponse) {
            serverResponse.otp = userOtp;
            const response = await dispatch(signup(serverResponse));
            if (response) {
              const payloadData = response.payload;
              if (payloadData.status == 404) {
                toast.error(payloadData.message);
              } else if (payloadData.status == 400) {
                toast.error(payloadData.message);
              } else {
                // dispatch(authActions.setUser(payloadData));
                if (payloadData?.user?.role === "mentee") {
                  navigate("/");
                }
              }
            }
          } else {
            console.log("Server Response is Null");
            toast.error("Something went wrong");
          }
        } catch (error) {
          if (typeof error == "string") {
            console.log(error);
          }
        }
      } else {
        console.log("Invalid OTP");
        toast.error("Invalid OTP");
      }
    }
  };

  const resendOtp = async () => {
    try {
      const response = await API.post("/resendOTP", {
        serverResponse,
      });
      if (response.data.status == "success") {
        setOpen(true);
      } else {
        toast("Please Try Again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Email sent Successfully"
        />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white ml-2">
          Enter the OTP
        </h3>
        <div className="otp-box">
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value="Please enter the OTP that send to youre email"
              className="ml-2"
            />
          </div>
          <input
            type="number"
            size={1}
            className="w-12 h-12 rounded-lg indent-5 ml-2"
            ref={box1}
            autoFocus
            onChange={(e) => {
              if (e.target.value && e.target.value.length > 1) {
                if (box1.current) {
                  box1.current.value = e.target.value[1];
                }
              }
              box2.current?.focus();
            }}
          />
          <input
            type="number"
            size={1}
            className="w-12 h-12 rounded-lg indent-5 ml-2"
            ref={box2}
            onChange={(e) => {
              if (e.target.value && e.target.value.length > 1) {
                if (box2.current) {
                  box2.current.value = e.target.value[1];
                }
              }
              box3.current?.focus();
            }}
          />
          <input
            type="number"
            size={1}
            className="w-12 h-12 rounded-lg indent-5 ml-2"
            ref={box3}
            onChange={(e) => {
              if (e.target.value && e.target.value.length > 1) {
                if (box3.current) {
                  box3.current.value = e.target.value[1];
                }
              }
              box4.current?.focus();
            }}
          />
          <input
            type="number"
            size={1}
            maxLength={1}
            className="w-12 h-12 rounded-lg indent-5 ml-2"
            ref={box4}
            onChange={(e) => {
              if (e.target.value && e.target.value.length > 1) {
                if (box4.current) {
                  box4.current.value = e.target.value[1];
                }
              }
            }}
          />
          <div className="w-full mt-3 ml-2">
            <Button onClick={handleClick}>Submit</Button>
            <button
              className="text-blue-700 mt-4 underline"
              onClick={resendOtp}
            >
              Re-send OTP
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default SignupOtp;
