export const useTablesFetch = async () => {
  const data = await useAsyncData('tables', () => $fetch('/api/tables'), {
    getCachedData: () => {
      const { data } = useNuxtData('tables');
      return data.value || null;
    }
  });
  return data;
}

export const useTableFetch = async (tableName: string) => {
  const data = await useAsyncData(
    `table-${tableName}`,
    () => $fetch(`/api/tables/${tableName}`),
    {
      getCachedData: () => {
        const { data } = useNuxtData(`table-${tableName}`);
        return data.value || null;
      },
    }
  );
  return data;
};
