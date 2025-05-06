<template>
  <div>
    <div
      class="flex justify-end px-4 py-3.5 bg-elevated/50 border border-gray-100 dark:border-gray-800 rounded-t"
    >
      <UInput v-model="name" icon="i-lucide-search" placeholder="Search...">
        <template v-if="name?.length" #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="name = ''"
          />
        </template>
      </UInput>
      <UButton
        :icon="
          isExpanded ? 'codicon:collapse-all' : 'codicon:expand-all'
        "
        size="md"
        color="neutral"
        variant="link"
        @click="triggerExpand"
      >
        {{ isExpanded ? "Collapse All" : "Expand All" }}
      </UButton>
    </div>
    <UTable
      v-model:expanded="expanded"
      v-model:column-filters="nameFilters"
      :sticky="true"
      :data="data"
      :columns="columns"
      :ui="{
        thead: 'bg-elevated/50',
        tr: 'data-[expanded=false]:bg-elevated/50',
      }"
      class="flex-1 border border-gray-100 dark:border-gray-800 rounded-b"
    >
      <template #expanded="{ row }">
        <TablesDescription :table="row.original" />
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
const { data } = await useTablesFetch();

const expanded = ref<{ [key: string]: boolean }>({});
const isExpanded = computed(() => Object.keys(expanded.value).length > 0);
const triggerExpand = () => {
  if (isExpanded.value) {
    expanded.value = [];
  } else {
    expanded.value = data.value.map((_, index) => {
      return { [index]: true };
    });
  }
};

const UButton = resolveComponent("UButton");
const columns = [
  {
    id: "expand",
    cell: ({ row }) =>
      h(UButton, {
        color: "neutral",
        variant: "ghost",
        icon: "i-lucide-chevron-down",
        square: true,
        "aria-label": "Expand",
        ui: {
          leadingIcon: [
            "transition-transform",
            row.getIsExpanded() ? "duration-200 rotate-180" : "",
          ],
        },
        onClick: () => row.toggleExpanded(),
      }),
    meta: {
      class: {
        td: "w-12",
      },
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "tableSize",
    header: "SIZE",
  },
  {
    accessorKey: "rowCount",
    header: "COUNT",
  }
];

const name = ref("");
const nameFilters = computed(() => {
  return [
    {
      id: "name",
      value: name.value,
    },
  ];
});
</script>
