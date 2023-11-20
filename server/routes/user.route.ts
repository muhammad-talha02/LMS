import express from "express";
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAcessToken, updatePassword, updateUserInfo } from "../controllers/user.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();


userRouter.post("/registration" , registrationUser);

userRouter.post("/activation-user", activateUser)

userRouter.post("/login", loginUser)

userRouter.get("/logout",isAuthenticated,authrizeRoles("user"), logoutUser)

userRouter.get("/refresh", updateAcessToken)

userRouter.get("/me", isAuthenticated, getUserInfo)

userRouter.post("/social-auth", socialAuth)

userRouter.put("/updateUser", isAuthenticated, updateUserInfo)

userRouter.put("/updatePassword", isAuthenticated, updatePassword)

export default userRouter