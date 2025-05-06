export const useTablesFetch = async () => {
  const data = await useAsyncData('tables', () => $fetch('/api/tables'), {
    getCachedData: () => {
      const { data } = useNuxtData('tables');
      return data.value || null;
    }
  });
  return data;
}
