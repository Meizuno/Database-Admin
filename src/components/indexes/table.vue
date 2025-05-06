<template>
  <UTable :data="indexes" :columns="indexesTable" />
</template>

<script setup lang="ts">
defineProps<{ indexes: TableIndex[] }>();
const UBadge = resolveComponent("UBadge");
const indexesTable = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "primary",
    header: "PRIMARY",
    cell: ({ row }) => {
      const color = row.original.primary ? "success" : "error";
      return h(UBadge, { class: "uppercase", variant: "outline", color }, () =>
        row.original.primary.toString()
      );
    },
  },
  {
    accessorKey: "unique",
    header: "UNIQUE",
    cell: ({ row }) => {
      const color = row.original.unique ? "success" : "error";
      return h(UBadge, { class: "uppercase", variant: "outline", color }, () =>
        row.original.unique.toString()
      );
    },
  },
  {
    accessorKey: "indkey",
    header: "INDKEY",
  },
  {
    accessorKey: "definition",
    header: "DEFINITION",
  },
];
</script>
