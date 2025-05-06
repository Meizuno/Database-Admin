import { sequelize } from "~/server/database";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name") as string;
  const schema = await sequelize.getQueryInterface().describeTable(name);
  const indexes = await sequelize.getQueryInterface().showIndex(name);
  const foreignKeys = await sequelize
    .getQueryInterface()
    .getForeignKeyReferencesForTable(name);

  const meta = await tableSize(name);

  return {
    name: name,
    columns: parseColumns(schema),
    indexes: indexes,
    foreignKeys: foreignKeys,
    ...meta,
  };
});
