const router = require("express").Router();
const adminController = require("../Controllers/adminController");
const { requireAuth, isAdmin } = require("../Middlewares/authMiddleware");

router.get("/getFlaggedPosts", requireAuth, isAdmin, adminController.getFlaggedPosts);
router.post("/unflagPost", requireAuth, isAdmin, adminController.unflagPost);
router.post("/deleteFlaggedPost", requireAuth, isAdmin, adminController.deleteFlaggedPost);

module.exports = router;
