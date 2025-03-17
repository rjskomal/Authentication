const router = require("express").Router();
const postsController = require("../Controllers/postsController");
const { requireAuth } = require("../Middlewares/authMiddleware");

router.post("/createPost", requireAuth, postsController.createPost);
router.get("/getAllPosts", requireAuth, postsController.getAllPosts);
router.post("/likePost", requireAuth, postsController.likePost);
router.post("/flagPost", requireAuth, postsController.flagPost);
router.post("/toggleLikePost", requireAuth, postsController.toggleLikePost);


module.exports = router;
