import { sequelize } from "~/server/database";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name') as string;
  await sequelize.getQueryInterface().dropTable(name);
});
