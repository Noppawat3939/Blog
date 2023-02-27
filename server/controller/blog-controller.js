const Blog = require("../models/Blog");

const getMyBlog = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).send({ message: "id is required" });

  const blog = await Blog.findOne({ userId: id });

  try {
    if (!blog)
      return res
        .status(204)
        .send({ message: `User id ${id}, Blog is not found` });

    const response = await Blog.find();

    res.json(response);
  } catch (error) {
    res.send({ message: "error" });
  }
};

const createBlog = async (req, res) => {
  const { id, title, subtitle, cover, content } = req.body;

  try {
    if (!id)
      return res
        .status(404)
        .send({ error: true, message: "user is not found" });

    if (!title || !subtitle || !content)
      return res.status(404).send({
        error: true,
        message: "title , subtitle and content is required",
      });

    if (!!id && !!title && !!subtitle && !!content && !!cover) {
      const blog = new Blog({
        userId: id,
        title,
        subtitle,
        cover,
        content,
      });

      await blog.save();
      return res.json({ create: true, newBlog: blog });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  if (!blogId) res.status(400).send({ message: "blog id is required" });

  try {
    const found = await Blog.findByIdAndDelete(blogId);

    if (!found)
      return res
        .status(404)
        .send({ success: false, message: `blog id ${blogId} is not found` });

    if (found) {
      res
        .status(202)
        .send({ success: true, message: `delete ${blogId} success` });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getBlog = async (req, res) => {
  const blogId = req.params.id;

  if (!blogId) return res.status(400).send({ message: "id is required" });

  try {
    const blog = await Blog.findOne({ _id: blogId });

    if (!blog)
      return res
        .status(404)
        .send({ success: false, message: `id ${blogId} is not blog` });

    if (blog) return res.status(200).json({ found: true, blog });
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
};

const editBlog = async (req, res) => {
  const { id, title, subtitle, cover, content } = req.body;
  if (!id) return res.status(404).send({ message: "id is required" });

  try {
    const blog = await Blog.findOne({ _id: id }).exec();

    if (!blog) {
      return res.status(404).send({ message: "blog is not found" });
    }

    if (blog) {
      blog.title = title;
      blog.subtitle = subtitle;
      blog.cover = cover;
      blog.content = content;

      await blog.save();

      return res
        .status(200)
        .send({ edit: true, message: `blog ${id} update success` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { createBlog, getMyBlog, deleteBlog, getBlog, editBlog };
