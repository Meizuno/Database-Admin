import { sequelize } from "~/server/database";
import { snakeToCamelObject } from "./snakeToCamelObject";

export const tableSize = async (tableName: string) => {
  const [result, _] = await sequelize.query(`
    SELECT
      pg_size_pretty(pg_total_relation_size('"${tableName}"')) AS table_size,
      (SELECT COUNT(*) FROM "${tableName}") AS row_count;
  `);
  
  return snakeToCamelObject(result[0])
}
