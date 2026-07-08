import { Router } from "express";
import { login, register,verifyEmail ,getMe, logout, resendVerification} from "../controllers/auth.controller.js";
import { registerValidator , loginValidator, resendVerificationValidator } from "../validator/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

//
//@route POST /api/auth/register
//@desc Register a new user
//@access Public
//@body { username, email, password }
authRouter.post("/register", registerValidator, register);


//
//@route POST /api/auth/login
//@desc Login a user
//@access Public
//@body { email, password }
authRouter.post('/login', loginValidator, login)

//
//@route GET /api/auth/get-me
//@desc Get current logged in user's details
//@access Private
authRouter.get('/get-me', authUser, getMe)


//@route GET/api/auth/verify-email
//@desc register a new user
//@access public
//@body {username , email, password}
authRouter.get('/verify-email',verifyEmail)

//@route POST /api/auth/resend-verification
//@desc Resend email verification link
//@access Public
//@body { email }
authRouter.post('/resend-verification', resendVerificationValidator, resendVerification)

//@route POST /api/auth/logout
//@desc Logout a user and clear cookie
//@access Private
authRouter.post('/logout', authUser, logout)

export default authRouter;