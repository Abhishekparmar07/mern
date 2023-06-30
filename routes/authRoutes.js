import express  from "express";
import { logincotroller, 
    registerConroller, 
    testController } from "../controllers/authcontroller.js";
import { isAdmin, requireSignIn } from "../middlewewors/authmiddleware.js";

const router = express.Router()
// rotes
// register
router.post('/register',registerConroller)

// Login
router.post('/login',logincotroller)

// test routes
router.get('/test', requireSignIn,isAdmin,testController)

export default router;