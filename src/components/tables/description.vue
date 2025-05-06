<template>
  <UTabs
    variant="link"
    :items="items"
    class="gap-4 w-full"
    :ui="{ trigger: 'grow' }"
  >
    <template #columns>
      <ColumnsTable :columns="table.columns" class="px-8 py-4" />
    </template>
    <template #indexes>
      <IndexesTable :indexes="table.indexes" class="px-8 py-4" />
    </template>
</UTabs>
</template>

<script setup lang="ts">
defineProps<{ table: Table }>();

const items = ref([
  {
    label: "Columns",
    slot: "columns",
  },
  {
    label: "Indexes",
    slot: "indexes",
  },
]);
</script>
