import mongoose from "mongoose";
import PostMessage from "../modal/postSchema.js";
export const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (req, res) => {
  const { _id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send("No Post matched");
  console.log("reached");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  console.log("Updated");
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("No Post matched");

  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("No Post matched");
  console.log("LIKE");

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );
  console.log("LIKE");
  res.json(updatedPost);
};
