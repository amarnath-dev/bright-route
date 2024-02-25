import { Router } from "express";
import { ChatControls } from "../controllers/chatControls";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();
const chatControls = new ChatControls();

router.get("/conversation", verifyJWT, chatControls.getConversation);
router.post("/conversation", verifyJWT, chatControls.makeConversation);
router.post("/message", verifyJWT, chatControls.newMessage);
router.get(
  "/allConversation/:conversationId",
  verifyJWT,
  chatControls.getAllConversation
);

router.get("/getUser/:friendId", verifyJWT, chatControls.getFriendDetails);
export default router;
