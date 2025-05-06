<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-center items-center gap-4 bg-elevated/50 rounded p-2">
      <div>{{ data.name }}</div>
      <UIcon name="fluent-mdl2:separator" class="size-4" />
      <div>{{ data.tableSize }}</div>
      <UIcon name="fluent-mdl2:separator" class="size-4" />
      <div>{{ data.rowCount }} rows</div>
    </div>
    <ColumnsTable
      :columns="data.columns"
      class="px-8 py-4 bg-elevated/50 rounded"
    />
    <IndexesTable
      :indexes="data.indexes"
      class="px-8 py-4 bg-elevated/50 rounded"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const name = route.params.name as string;

const { data } = await useTableFetch(name);
</script>
