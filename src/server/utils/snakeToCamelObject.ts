const snakeToCamel = (str: string) => {
  return str.replace(/([-_][a-z])/g, (group) =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
};

export const snakeToCamelObject = <T>(obj: Record<string, T>): Record<string, T> => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[snakeToCamel(key)] = obj[key];
    return acc;
  }, {} as Record<string, T>);
};
