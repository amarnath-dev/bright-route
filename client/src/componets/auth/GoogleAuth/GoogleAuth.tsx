import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const GoogleAuth = () => {
  const responseGoogle = async (response: CredentialResponse) => {
    console.log(response);
    if (response.credential) {
      console.log(response.credential);
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
