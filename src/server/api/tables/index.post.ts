import { sequelize } from "~/server/database";
import {
  tableSchema,
  type ColumnParam,
  type TableColumn,
} from "~/validation/table";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, tableSchema.parse);
  const { name, columns } = body;

  const tableExists = await sequelize.getQueryInterface().tableExists(name);

  if (tableExists) {
    throw createError({
      statusCode: 400,
      statusMessage: "Table already exists",
    });
  }

  const attributes = parseColumns(columns);

  await sequelize.getQueryInterface().createTable(name, attributes);
  const schema = await sequelize.getQueryInterface().describeTable(name);

  return {
    name: name,
    columns: schema,
  };
});

const parseColumns = (columns?: TableColumn[]) => {
  const result = columns?.reduce<{ [key: string]: ColumnParam }>(
    (acc, { name, params }) => {
      acc[name] = params;
      return acc;
    },
    {}
  );

  return result || {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: "INTEGER",
    },
  };
};
