import { Sequelize } from "sequelize";

const config = useRuntimeConfig();

export const sequelize = new Sequelize(config.dbUrl, {
  logging: config.dbLogging ? console.log : false,
});
