import { z } from "zod";

export const columnParamSchema = z.object({
  allowNull: z.boolean().optional().default(false),
  primaryKey: z.boolean().optional().default(false),
  autoIncrement: z.boolean().optional().default(false),
  defaultValue: z.string().optional(),
  unique: z.boolean().optional().default(false),
  type: z
    .enum(["INTEGER", "FLOAT", "TEXT", "BOOLEAN", "DATE", "TIMESTAMP"])
    .default("INTEGER")
    .or(z.string().regex(/^CHAR\([0-9]*\)$/)),
});

export const tableColumnSchema = z.object({
  name: z.string(),
  params: columnParamSchema
    .optional()
    .default(() => columnParamSchema.parse({})),
});

export const tableIndexSchema = z.object({
  name: z.string(),
  primary: z.boolean().optional().default(false),
  unique: z.boolean().optional().default(false),
  indkey: z.string(),
  definition: z.string(),
});

export const tableSchema = z.object({
  name: z.string().min(1),
  columns: z.array(tableColumnSchema).optional(),
  indexes: z.array(z.string()).optional(),
  foreignKeys: z.array(z.string()).optional(),
});

export type ColumnParam = z.infer<typeof columnParamSchema>;
export type TableColumn = z.infer<typeof tableColumnSchema>;
export type TableIndex = z.infer<typeof tableIndexSchema>;
export type Table = z.infer<typeof tableSchema>;
