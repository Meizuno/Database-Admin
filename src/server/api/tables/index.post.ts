import { sequelize } from "~/server/database";
import {
  tableSchema,
  type ColumnParam,
  type TableColumn,
} from "~/validation/table";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, tableSchema.parse);
  const { name, columns, indexes } = body;

  const tableExists = await sequelize.getQueryInterface().tableExists(name);

  if (tableExists) {
    throw createError({
      statusCode: 400,
      statusMessage: "Table already exists",
    });
  }

  const attributes = parseAttributes(columns);

  await sequelize.getQueryInterface().createTable(name, attributes);
  if (indexes) {
    indexes.forEach(async (index) => {
      await sequelize.getQueryInterface().addIndex(name, index.fields, {
        name: index.name
      });
    });
  }

  const schema = await sequelize.getQueryInterface().describeTable(name);
  const foreignKeys = await sequelize
    .getQueryInterface()
    .getForeignKeyReferencesForTable(name);

  const meta = await tableSize(name);

  return {
    name: name,
    columns: parseColumns(schema),
    indexes: indexes || [],
    foreignKeys: foreignKeys,
    ...meta,
  };
});

const parseAttributes = (columns: TableColumn[]) => {
  const result = columns?.reduce<{ [key: string]: ColumnParam }>(
    (acc, { name, params, foreignKey }) => {
      acc[name] = params;
      if (foreignKey) {
        acc[name].type = "INTEGER";
        acc[name].references = {
          model: foreignKey.tableName,
          key: foreignKey.columnName,
        };
        acc[name].onDelete = "CASCADE";
        acc[name].onUpdate = "CASCADE";
      }
      return acc;
    },
    {}
  );

  return result;
};
