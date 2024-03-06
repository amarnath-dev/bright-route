import { Router } from "express";
import { ChatControls } from "../controllers/chatControls";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();
const chatControls = new ChatControls();

router.post("/conversation", verifyJWT, chatControls.makeConversation);
router.get("/conversation", verifyJWT, chatControls.getConversation);
router.get(
  "/mentee/conversation/:menteeId/:mentorId",
  verifyJWT,
  chatControls.getSingleConversation
);
router.get(
  "/mentor/conversation/:mentorId/:menteeId",
  verifyJWT,
  chatControls.getSingleConversationMentor
);
router.post("/message", verifyJWT, chatControls.newMessage);
router.get(
  "/allConversation/:conversationId",
  verifyJWT,
  chatControls.getAllConversation
);
router.get("/getUser/:friendId", verifyJWT, chatControls.getFriendDetails);

export default router;