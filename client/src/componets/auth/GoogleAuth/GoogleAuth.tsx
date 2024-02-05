import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useAppDispatch } from "../../../app/hooks";
import { googleAuth } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../redux/auth/authSlice";
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
        dispatch(authActions.setUser(payloadData.user));
        navigate("/");
      } else if (payloadData.status == 409) {
        toast.error(payloadData.message);
      }
    }
  };

  const responseError = async (): Promise<void> => {
    console.log("Error Occured");
  };

  const clientId =
    "830991888272-l40hjhbivufur9m6aamom5rs0qkl8e0u.apps.googleusercontent.com";

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
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
