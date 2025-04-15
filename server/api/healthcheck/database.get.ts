import { sequelize } from "~/server/database"

export default defineEventHandler(async (_) => {
  const config = useRuntimeConfig()
  try {
    await sequelize.authenticate();
    return {
      status: 'ok',
      dbType: config.dbType
    }
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: (error as Error).message });
  }
})
