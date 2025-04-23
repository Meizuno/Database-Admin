import { Sequelize } from 'sequelize';

const config = useRuntimeConfig()
const sequelize = new Sequelize(config.dbUrl, { logging: config.logging ? console.log : false })

export { sequelize }
