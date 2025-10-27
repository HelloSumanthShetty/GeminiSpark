import { z } from "zod";

export const createMediaSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  type: z.enum(["Movie", "TV Show"], {
    errorMap: () => ({ message: "Type must be either 'Movie' or 'TV Show'" }),
  }),
  director: z.string().min(1, "Director is required").max(255, "Director name is too long"),
  budget: z.string().min(1, "Budget is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  yearTime: z.string().min(1, "Year/Time is required"),
});

export const updateMediaSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long").optional(),
  type: z.enum(["Movie", "TV Show"], {
    errorMap: () => ({ message: "Type must be either 'Movie' or 'TV Show'" }),
  }).optional(),
  director: z.string().min(1, "Director is required").max(255, "Director name is too long").optional(),
  budget: z.string().min(1, "Budget is required").optional(),
  location: z.string().min(1, "Location is required").optional(),
  duration: z.string().min(1, "Duration is required").optional(),
  yearTime: z.string().min(1, "Year/Time is required").optional(),
});

export type CreateMediaInput = z.infer<typeof createMediaSchema>;
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;
