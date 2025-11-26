<template>
    <div class="flex w-full px-4 py-3 rounded-sm justify-start items-start flex-wrap gap-y-2" :class="{
        '': index % 2 !== 0,
        'bg-muted dark:bg-muted/20': index % 2 === 0
    }">


        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <span class="text-xs text-gray-500">Nome</span>
            <h2 class="font-normal sm:text-sm text-xs">{{ user.name }}</h2>
        </div>
        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <span class="text-xs text-gray-500">Email</span>
            <h2 class="font-normal sm:text-sm text-xs">{{ user.email }}</h2>
        </div>
        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <span class="text-xs text-gray-500">Grupo</span>
            <h2 class="font-normal sm:text-sm text-xs">{{ user.Group.name }}</h2>
        </div>

        <div class="flex flex-col flex-[1/2] items-start sm:min-w-[150px] min-w-[120px]">
            <OptionsGeneral>
                <template #options>
                    <DropdownMenuItem class="cursor-pointer hover:bg-muted w-full" @click="getUser(user.id)">Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer hover:bg-muted w-full"
                        @click="setDelete('Usuário', 'users', user.id)">Deletar</DropdownMenuItem>
                </template>
            </OptionsGeneral>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDelete } from '~/store/delete.store';
import { useUser } from '~/store/user.store';


const props = defineProps({
    index: {
        type: Number,
        default: 0, // Valor padrão para evitar undefined
    },
    user: {
        type: Object,
        required: true,
    },
});

const store = useUser();
const { getUser } = store;

const deleteStore = useDelete();
const { setDelete } = deleteStore;


</script>