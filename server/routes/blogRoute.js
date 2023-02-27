const dotenv = require("dotenv");
dotenv.config();
const { Router } = require("express");
const router = Router();
const verifyJwt = require("../middleware/jwtValidate");
const {
  createBlog,
  deleteBlog,
  getMyBlog,
  getBlog,
  editBlog,
} = require("../controller/blog-controller");

router.post("/api/get-my-blog", verifyJwt, getMyBlog);

router.delete("/api/delete-blog/:id", deleteBlog);

router.put("/api/edit-blog", editBlog);

router.get("/api/get-blog/:id", getBlog);

router.post("/api/create-blog", verifyJwt, createBlog);

module.exports = router;
