const router = require('express').Router();
const authController = require('../Controllers/authControllers');
const { requireAuth } = require('../Middlewares/authMiddleware');

router.post("/signup", authController.signup_post);

router.post("/login", authController.login_post);
router.get("/loginget", authController.login_get);
router.post("/logout" , authController.logout_user);
router.get("/UserDetails" , requireAuth,authController.userDetails);



module.exports = router;