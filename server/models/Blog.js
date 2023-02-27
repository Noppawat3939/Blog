const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    cover: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);
module.exports = Blog;
