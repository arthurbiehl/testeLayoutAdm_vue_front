<template>
  <NuxtLayout name="admin" page="Grupos" description="Gerencie seus Grupos">
    <div class="flex min-h-screen w-full flex-col">
      <main class="flex flex-1 flex-col items-start gap-4">
        <GeneralTabs />
        <GroupForm />
        <div class="flex flex-col items-center w-full mt-5">
          <GroupCard v-for="(group, index) in groups" :group :index />
        </div>
      </main>
    </div>
  </NuxtLayout>

  <DeleteModal />

</template>
<script setup lang="ts">
import { useGroup } from '~/store/group.store';
import { useDelete } from '~/store/delete.store';

definePageMeta({
  middleware: ['auth', 'group'],
});


useHead({
  title: "Grupos - NK"
});

const deleteStore = useDelete();
const { setDelete } = deleteStore;

const { deleted } = storeToRefs(deleteStore);

watch(deleted, (newVal: boolean) => {
  if (newVal) {
    store.getGroups();
    deleteStore.deleted = false;
  }
});

const store = useGroup();
const { groups }: any = storeToRefs(store);
const { getGroup } = store;

onMounted(async () => {
  await store.getGroups();
});

</script>