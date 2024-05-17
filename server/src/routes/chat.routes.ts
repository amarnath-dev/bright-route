import { Router } from "express";
import { ChatControls } from "../controllers/chat.controller";
import { Authentication } from "../middleware/verifyUser";

const router: Router = Router();
const chatControls = new ChatControls();

router.post(
  "/roomId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.roomId
);

router.post(
  "/conversation",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.makeConversation
);

router.get(
  "/conversation",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.getConversation
);

router.get(
  "/mentee/conversation/:menteeId/:mentorId",
  Authentication.ensureAuth(["mentee"]),
  chatControls.getSingleConversation
);

router.get(
  "/mentor/conversation/:mentorId/:menteeId",
  Authentication.ensureAuth(["mentor"]),
  chatControls.getSingleConversationMentor
);

router.post(
  "/message",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.newMessage
);

router.get(
  "/allConversation/:conversationId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.getAllConversation
);

router.get(
  "/getUser/:friendId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.getFriendDetails
);

router.patch(
  "/message/delete/:messageId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  chatControls.deleteMessage
);

export default router;
