import { z } from "zod";

export const columnParamSchema = z.object({
  allowNull: z.boolean().optional().default(false),
  primaryKey: z.boolean().optional().default(false),
  type: z
    .enum(["INTEGER", "FLOAT", "CHAR", "TEXT", "BOOLEAN", "DATE", "TIMESTAMP"])
    .default("INTEGER"),
});

export const tableColumnSchema = z.object({
  name: z.string(),
  params: columnParamSchema
    .optional()
    .default(() => columnParamSchema.parse({})),
});

export const tableSchema = z.object({
  name: z.string().min(1),
  columns: z.array(tableColumnSchema).optional(),
});

export type ColumnParam = z.infer<typeof columnParamSchema>;
export type TableColumn = z.infer<typeof tableColumnSchema>;
export type Table = z.infer<typeof tableSchema>;
