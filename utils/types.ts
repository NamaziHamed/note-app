import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().optional(),
  jsonText: z.any(),
});
