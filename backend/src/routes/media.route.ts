import express from "express";
import {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from "../controller/media.controller.js";

const router = express.Router();

// Create a new media entry
router.post("/", createMedia);

// Get all media entries with pagination
router.get("/", getAllMedia);

// Get a single media entry by ID
router.get("/:id", getMediaById);

// Update a media entry
router.put("/:id", updateMedia);

// Delete a media entry
router.delete("/:id", deleteMedia);

export default router;
