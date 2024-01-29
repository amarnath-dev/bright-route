import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useAppDispatch } from "../../../app/hooks";
import { googleAuth } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../redux/auth/authSlice";

const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (response: CredentialResponse) => {
    if (response.credential) {
      const responseData = await dispatch(googleAuth(response.credential));
      const payloadData = responseData.payload;
      console.log("this is new payload data", payloadData);
      if (payloadData) {
        dispatch(authActions.setUser(payloadData.user));
        navigate("/");
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
