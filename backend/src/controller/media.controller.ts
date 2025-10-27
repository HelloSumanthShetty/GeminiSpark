import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { createMediaSchema, updateMediaSchema } from "../utils/media.validator.js";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// Create a new media entry
export const createMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createMediaSchema.parse(req.body);
    
    const media = await prisma.media.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: error.errors,
      });
      return;
    }
    console.error("Error creating media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create media entry",
    });
  }
};

// Get all media entries with pagination
export const getAllMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [media, totalCount] = await Promise.all([
      prisma.media.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.media.count(),
    ]);

    res.status(200).json({
      success: true,
      data: media,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: skip + media.length < totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch media entries",
    });
  }
};

// Get a single media entry by ID
export const getMediaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });

    if (!media) {
      res.status(404).json({
        success: false,
        message: "Media entry not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch media entry",
    });
  }
};

// Update a media entry
export const updateMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = updateMediaSchema.parse(req.body);

    const media = await prisma.media.update({
      where: { id: parseInt(id) },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: error.errors,
      });
      return;
    }
    console.error("Error updating media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update media entry",
    });
  }
};

// Delete a media entry
export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    await prisma.media.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: "Media entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete media entry",
    });
  }
};
