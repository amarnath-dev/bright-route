import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div>
          <img
            className="h-52  w-68"
            src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
            alt="paymen_successfull"
          />
        </div>
        <div className="w-full text-center">
          <h1 className="text-xl">Payment Successfull 🤝</h1>
          <div className="mt-4">
            <Link
              to={"/chat"}
              className="text-center border-2 px-2 py-1 mt-3 rounded"
            >
              Message Mentor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
