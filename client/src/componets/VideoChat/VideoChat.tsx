import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../../app/hooks";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VideoChat = () => {
  const { pairId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAppSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const myMeeting = async (element: HTMLDivElement) => {
    try {
      const userId = user?._id;
      const response = await axiosPrivate.post(
        "chat/roomId",
        { pairId, userId },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        try {
          const appId = 930308710;
          const serverSecret = "1623916fe2dd602dd32cfcb6873eb8d6";
          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            response.data.roomId,
            Date.now().toString(),
            user?.first_name
          );
          const zc = ZegoUIKitPrebuilt.create(kitToken);
          zc.joinRoom({
            container: element,
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire({
          title: "Video Session Creation Failed",
          text: "Looks like video calls are not available",
          icon: "error",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            if (user?.role === "mentee") {
              navigate("/my-mentors");
            }
            if (user?.role === "mentor") {
              navigate("/mentor/my-mentees");
            }
            window.close();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full h-full" ref={myMeeting} />
      </div>
    </>
  );
};

export default VideoChat;
