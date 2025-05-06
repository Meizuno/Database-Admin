import type { ColumnsDescription } from "sequelize";

export const parseColumns = (columns: ColumnsDescription) => {
  return Object.keys(columns).map((key) => {
    const field = columns[key as keyof typeof columns];
    return {
      name: key,
      ...field,
    };
  });
};
