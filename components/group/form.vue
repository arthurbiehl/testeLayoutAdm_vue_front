<template>
  <Sheet v-model:open="formState">
    <SheetTrigger asChild>
      <Button @click="changeFormState(true)" class="gap-2" variant="outline">
        <Icon name="ph:plus-bold" class="size-4 cursor-pointer transition-all hover:bg-muted rounded-sm color-white" />
        Novo Grupo
      </Button>
    </SheetTrigger>
    <SheetContent class="w-[100%] flex flex-col items-start justify-between">
      <SheetHeader>
        <SheetTitle>{{ isUpdate ? 'Editar Grupo' : 'Adicionar Grupo' }}</SheetTitle>
        <SheetDescription>
          {{ isUpdate ? 'Atualize o grupo' : 'Adicione um novo grupo' }}
        </SheetDescription>
      </SheetHeader>

      <div class="flex flex-col items-start gap-4 mt-2 w-full flex-1">
        <div class="flex items-center justify-between gap-3">
          <Label for="name" class="text-right">Nome</Label>
          <Input ref="aasasdasd" id="name" placeholder="Nome do Grupo" v-model="group.name" class="col-span-3" :disabled="isLoading" />
        </div>
        <div class="flex flex-col items-start gap-4">
          <Label for="username" class="text-right">Permissões</Label>
          <div class="flex">
            <ToggleGroup :disabled="isLoading" type="multiple" v-model="stringPermissions" class="flex flex-wrap gap-2 justify-start items-start">
              <ToggleGroupItem
              v-for="permission in permissions"
              :key="permission.id"
              :value="`${permission.id}`"
              class="text-[11px] px-2 py-1 h-auto bg-muted/20 data-[state=on]:bg-zinc-900 data-[state=on]:text-white dark:data-[state=on]:bg-white dark:data-[state=on]:text-black"
            >
              {{ permission.name }}
            </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <SheetFooter class="mt-10 gap-2 w-full">
        <Button :disabled="isLoading" @click="setContent" class="dark:bg-white dark:hover:bg-white/80 sm:w-1/2 w-full">
          Confirmar
        </Button>
        <SheetClose as-child>
          <Button class="sm:w-1/2 w-full" :disabled="isLoading" @click="closeForm()" variant="outline">
            Cancelar
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { useGroup } from '~/store/group.store';
import { z } from 'zod';
import { Toaster, toast } from 'vue-sonner';

const groupSchema = z.object({
  name: z.string().min(1, { message: 'Nome do grupo é obrigatório' })
});

const store = useGroup();
const { formState, isUpdate, group, permissions } = storeToRefs(store);
const { changeFormState, storeGroup, updateGroup } = store;
const isLoading = ref(false);

const stringPermissions = computed({
  get() {
    // Converte de number[] para string[]
    return group.value.permissions.map(String);
  },
  set(newValue: string[]) {
    // Converte de string[] para number[]
    group.value.permissions = newValue.map(Number);
  }
});

function resetForm() {
  group.value.name = '';
  group.value.permissions = [];
}

async function closeForm() {
  store.changeFormState(false);
  resetForm();
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}

async function setContent() {
  
  isLoading.value = true;
  
  const result = groupSchema.safeParse(group.value);

  if (!result.success) {
    // Exibe alert() com os erros
    const errors = result.error.errors.map((err) => err.message).join('\n');
    toast.error(errors);
    isLoading.value = false;
    return;
  }
  
  group.value.permissions = group.value.permissions.map(Number)

  if (isUpdate.value) {
    await store.updateGroup();
  } else {
    await store.storeGroup();
  }
  
  closeForm();
}

onMounted(() => {
  store.getPermissions();
});
</script>

<style scoped>
/* Estilos adicionais */
.form_body {
  margin-top: 20px;
}

.form_permissions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>