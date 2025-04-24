import { sequelize } from "~/server/database";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name') as string;
  const schema = await sequelize.getQueryInterface().describeTable(name);

  return {
    name: name,
    columns: schema
  };
});
