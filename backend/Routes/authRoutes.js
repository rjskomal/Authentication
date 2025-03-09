const router = require('express').Router();
const authController = require('../Controllers/authControllers');
const authorizationController = require('../Controllers/authorizationController');
const { requireAuth, isAdmin } = require('../Middlewares/authMiddleware');

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.post("/logout", authController.logout_user);
router.get("/userdetails", requireAuth, authController.userDetails);


router.get("/getAllUserDetails", requireAuth, isAdmin, authorizationController.getAllUserDetails);
router.post("/deleteUser", requireAuth, isAdmin, authorizationController.deleteUser);
router.post("/updateUser", requireAuth, isAdmin, authorizationController.updateUser);

module.exports = router;
