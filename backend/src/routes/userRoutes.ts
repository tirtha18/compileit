import { userRegister, userLogin, userDelete, userUpdate, getUser } from "../controllers/userController";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/register", userRegister as any);
userRouter.post("/login", userLogin as any);
userRouter.put("/update/:id", userUpdate as any);
userRouter.delete("/delete/:id", userDelete as any);
userRouter.get("/get/:id", getUser as any);

export default userRouter;