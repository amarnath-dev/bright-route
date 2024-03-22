import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../../app/hooks";

const VideoChat = () => {
  const { roomId } = useParams();
  const { user } = useAppSelector((state) => state.userAuth);

  const myMeeting = async (element: HTMLDivElement) => {
    try {
      const appId = 930308710;
      const serverSecret = "1623916fe2dd602dd32cfcb6873eb8d6";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId as string,
        Date.now().toString(),
        user?.first_name
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:5173/video/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
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
