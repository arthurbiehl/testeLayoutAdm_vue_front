<template>
  <NuxtLayout name="admin" page="Usuários" description="Gerencie seus Usuários">
    <div class="flex min-h-screen w-full flex-col">
      <main class="flex flex-1 flex-col items-start gap-4">
        <GeneralTabs />
        <UserForm />
        <div class="flex flex-col items-center w-full mt-5">
          <UserCard  v-for="(user, index) in users" :user="user" :index="index"/>
        </div>
      </main>
    </div>
  </NuxtLayout>
  
  <DeleteModal />

</template>
<script setup lang="ts">
import { useUser } from '~/store/user.store';
import { useDelete } from '~/store/delete.store';

definePageMeta({
  middleware: ['auth', 'user'],
});

useHead({
  title: "Usuários - NK"
});

const deleteStore = useDelete();
const {setDelete} = deleteStore;

const { deleted } = storeToRefs(deleteStore);

watch(deleted, (newVal: boolean) => {
  if (newVal) {
    store.getUsers();
    deleteStore.deleted = false;
  }
});

const store = useUser();
const {users}:any = storeToRefs(store);
const { getUser } = store;	

onMounted(async () => {
  await store.getUsers();
});

</script>