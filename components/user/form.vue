<template>
  <Sheet v-model:open="formState">
    <SheetTrigger asChild>
      <Button @click="changeFormState(true)" class="gap-2" variant="outline">
        <Icon name="ph:plus-bold" class="size-4 cursor-pointer transition-all hover:bg-muted rounded-sm color-white" />
        Novo Usuário
      </Button>
    </SheetTrigger>
    <SheetContent class="w-[100%] flex flex-col items-start justify-between">
      <SheetHeader>
        <SheetTitle>{{ isUpdate ? 'Editar Usuário' : 'Adicionar Usuário' }}</SheetTitle>
        <SheetDescription>
          {{ isUpdate ? 'Atualize o usuário' : 'Adicione um novo usuário' }}
        </SheetDescription>
      </SheetHeader>

      <div class="flex flex-col items-start gap-4 mt-2 w-full flex-1">
        <!-- Nome -->
        <div class="flex items-center justify-end gap-3 w-full">
          <Label for="name" class="text-right">Nome</Label>
          <Input id="name" placeholder="Nome do Usuário" v-model="user.name" class="col-span-3 w-[80%]" />
        </div>

        <!-- Email -->
        <div class="flex items-center justify-end gap-3 w-full">
          <Label for="email" class="text-right">Email</Label>
          <Input id="email" placeholder="Email do Usuário" v-model="user.email" class="col-span-3 w-[80%]" />
        </div>

        <!-- senha -->
        <div class="flex items-center justify-end gap-3 w-full">
          <Label for="password" class="text-right">Senha</Label>
          <Input id="password" autocomplete="off" placeholder="Senha do Usuário" type="password" v-model="user.password"
            class="col-span-3 w-[80%]" />
        </div>

        <!-- Grupo -->
        <div class="flex items-center justify-end gap-5 w-full">
          <Label for="group" class="text-right">Grupo</Label>
          <Select class="w-full" v-model="user.groupId">
            <SelectTrigger class="w-[270px]">
              <SelectValue placeholder="Selecione um grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grupos</SelectLabel>
                <SelectItem v-for="group in groups" :value="`${group.id}`">
                  {{ group.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>

      <SheetFooter class="mt-10 gap-2 w-full">
        <Button @click="setContent" class="dark:bg-white dark:hover:bg-white/80 sm:w-1/2 w-full">
          Confirmar
        </Button>
        <SheetClose as-child>
          <Button @click="closeForm()" variant="outline" class="sm:w-1/2 w-full">
            Cancelar
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { useUser } from '~/store/user.store';
import { z } from 'zod';
import { Toaster, toast } from 'vue-sonner';

const store = useUser();
const { formState, isUpdate, user, groups } = storeToRefs(store);
const { changeFormState, storeUser, updateUser, getGroups } = store;
const isLoading = ref(false);

// validate

const userSchema = z.object({
  name: z.string().min(5, { message: 'Nome é obrigatório' }),
  email: z.string().min(1, { message: 'Email é obrigatório' }).email({ message: 'Formato de email inválido' }),
  password: z.string().optional().refine((val: string | undefined) => {
    // Se isUpdate for false, a senha é obrigatória
    if (!isUpdate.value && (!val || val.trim() === '')) {
      return false; // Retorna falso se a senha estiver vazia
    }
    return true; // Retorna verdadeiro se a senha estiver preenchida ou se isUpdate for true
  }, {
    message: 'Senha é obrigatória',
  }),
  groupId: z.string().nonempty({ message: 'Grupo é obrigatório' }), // Adicionando a validação para groupId
});

function resetForm() {
  user.value.name = '';
  user.value.email = '';
  user.value.password = '';
  user.value.groupId = '';
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
  const result = userSchema.safeParse(user.value);

  if (!result.success) {
    // Exibe alert() com os erros
    const errors = result.error.errors.map((err) => err.message).join('\n');
    toast.error(errors);
    isLoading.value = false;
    return;
  }

  if (isUpdate.value) {
    await store.updateUser();
  } else {
    await store.storeUser();
  }

  closeForm();
}



onMounted(() => {
  getGroups();
});
</script>