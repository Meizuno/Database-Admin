import { sequelize } from "~/server/database";

export default defineEventHandler(async (_) => {
  const tables = await sequelize.getQueryInterface().showAllTables();
  const tableDetailsList = [];

  for (const table of tables) {
    const schema = await sequelize.getQueryInterface().describeTable(table);
    tableDetailsList.push({
      name: table,
      columns: schema
    });
  }

  return tableDetailsList;
});
