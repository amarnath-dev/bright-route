import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      title: "Payment Successull",
      icon: "success",
      allowOutsideClick: false,
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/my-mentors");
      }
    });
  }, [navigate]);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col bg-background-two"></div>
    </>
  );
};

export default PaymentSuccess;
