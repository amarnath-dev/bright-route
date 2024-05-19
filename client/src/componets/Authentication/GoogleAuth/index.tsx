import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { googleAuth } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (response: CredentialResponse) => {
    if (response.credential) {
      const responseData = await dispatch(googleAuth(response.credential));
      const payloadData = responseData.payload;
      if (payloadData.status === "success") {
        navigate("/");
      } else if (payloadData.status == 409) {
        toast.error(payloadData.message);
      }
    }
  };

  const responseError = async (): Promise<void> => {
    console.log("Error Occured");
  };

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={responseError}
          width="300"
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleAuth;
