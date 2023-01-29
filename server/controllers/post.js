import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.js";

dotenv.config();

/* configuring cloudinary */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export let getPost = async (req, res) => {
  try {
    let posts = await Post.find({});
    res.status(200).json({ succes: true, data: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export let createPost = async (req, res) => {
  try {
    let { name, prompt, photo } = req.body;
    let photoUrl = await cloudinary.uploader.upload(photo);
    let newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(200).json(newPost);
  } catch (error) {
    {
      res.status(404).json({ message: error.message });
    }
  }
};
