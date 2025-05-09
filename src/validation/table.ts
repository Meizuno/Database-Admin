import { z } from "zod";

export const columnTypeSchema = z.enum([
  "INTEGER",
  "FLOAT",
  "TEXT",
  "BOOLEAN",
  "DATE",
  "TIMESTAMP",
]);

export const foreignKeyActionSchema = z.enum([
  "CASCADE",
  "SET NULL",
  "SET DEFAULT",
  "NO ACTION",
  "RESTRICT",
]);

export const columnParamSchema = z.object({
  allowNull: z.boolean().optional().default(false),
  primaryKey: z.boolean().optional().default(false),
  autoIncrement: z.boolean().optional().default(false),
  defaultValue: z.string().optional(),
  unique: z.boolean().optional().default(false),
  type: columnTypeSchema
    .default("INTEGER")
    .or(z.string().regex(/^CHAR\([0-9]*\)$/)),

  references: z
    .object({
      model: z.string(),
      key: z.string(),
    })
    .optional()
    .readonly(),
  onDelete: z.string().optional().readonly(),
  onUpdate: z.string().optional().readonly(),
});

export const tableForeignKeySchema = z.object({
  tableName: z.string(),
  columnName: z.string(),
  onDelete: foreignKeyActionSchema.default("CASCADE"),
  onUpdate: foreignKeyActionSchema.default("CASCADE"),
});

export const tableIndexSchema = z.object({
  name: z.string(),
  fields: z.array(z.string()),
});

export const tableColumnSchema = z.object({
  name: z.string().default("id"),
  params: columnParamSchema.optional().default(() =>
    columnParamSchema.parse({
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: "INTEGER",
    })
  ),
  foreignKey: tableForeignKeySchema.optional(),
});

export const tableSchema = z.object({
  name: z.string().min(1),
  columns: z
    .array(tableColumnSchema)
    .optional()
    .default(() => [tableColumnSchema.parse({})]),
  indexes: z.array(tableIndexSchema).optional(),
  foreignKeys: z.array(z.string()).optional().readonly(),
});

export type ColumnType = z.infer<typeof columnTypeSchema>;
export type ForeignKeyAction = z.infer<typeof foreignKeyActionSchema>;
export type TableForeignKey = z.infer<typeof tableForeignKeySchema>;
export type ColumnParam = z.infer<typeof columnParamSchema>;
export type TableColumn = z.infer<typeof tableColumnSchema>;
export type TableIndex = z.infer<typeof tableIndexSchema>;
export type Table = z.infer<typeof tableSchema>;
