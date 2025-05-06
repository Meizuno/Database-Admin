import { sequelize } from "~/server/database";

export default defineEventHandler(async (_) => {
  const tables = await sequelize.getQueryInterface().showAllTables();
  const tableDetailsList = [];

  for (const table of tables) {
    const schema = await sequelize.getQueryInterface().describeTable(table);
    const indexes = await sequelize.getQueryInterface().showIndex(table);
    const foreignKeys = await sequelize
      .getQueryInterface()
      .getForeignKeyReferencesForTable(table);

    const meta = await tableSize(table);

    tableDetailsList.push({
      name: table,
      columns: parseColumns(schema),
      indexes: indexes,
      foreignKeys: foreignKeys,
      ...meta,
    });
  }

  return tableDetailsList;
});
