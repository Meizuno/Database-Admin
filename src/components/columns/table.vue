<template>
  <UTable :data="columns" :columns="columnsTable" />
</template>

<script setup lang="ts">
defineProps<{ columns: ColumnParam[] }>();

const UBadge = resolveComponent("UBadge");
const columnsTable = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) =>
      h(
        UBadge,
        { class: "uppercase", variant: "outline", color: "success" },
        () => row.getValue("type")
      ),
  },
  {
    accessorKey: "primaryKey",
    header: "PK",
    cell: ({ row }) => {
      const color = row.original.primaryKey ? "success" : "error";
      return h(
        UBadge,
        { class: "uppercase", variant: "outline", color },
        () => row.original.primaryKey.toString()
      );
    },
  },
  {
    accessorKey: "allowNull",
    header: "NULL",
    cell: ({ row }) => {
      const color = row.original.allowNull ? "success" : "error";
      return h(
        UBadge,
        { class: "uppercase", variant: "outline", color },
        () => row.original.allowNull.toString()
      );
    },
  },
  {
    accessorKey: "defaultValue",
    header: "DEFAULT",
  },
  {
    accessorKey: "comment",
    header: "COMMENT",
  },
];
</script>
