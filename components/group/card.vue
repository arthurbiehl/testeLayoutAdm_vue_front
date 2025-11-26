<template>
    <div class="flex w-full px-4 py-3 rounded-sm justify-start items-start flex-wrap gap-y-2" :class="{
        '': index % 2 !== 0,
        'bg-muted dark:bg-muted/20': index % 2 === 0
    }">


        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <span class="text-xs text-gray-500">Nome</span>
            <h2 class="font-normal sm:text-sm text-xs">{{ group.name }}</h2>
        </div>
        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <span class="text-xs text-gray-500">Status</span>
            <h2 class="font-normal sm:text-sm text-xs">Ativo</h2>
        </div>
        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <span class="text-xs text-gray-500">Membros</span>
            <h2 class="font-normal sm:text-sm text-xs">{{ group._count.users }}</h2>
        </div>

        <div class="flex flex-col flex-1 items-start sm:min-w-[150px] min-w-[120px]">
            <OptionsGeneral>
                <template #options>
                  <DropdownMenuItem class="cursor-pointer hover:bg-muted w-full" @click="getGroup(group.id)">Editar</DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer hover:bg-muted w-full" @click="setDelete('Grupo', 'group', group.id)">Deletar</DropdownMenuItem>
                </template>
              </OptionsGeneral>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDelete } from '~/store/delete.store';
import { useGroup } from '~/store/group.store';

const props = defineProps({
    index: {
        type: Number,
        default: 0, // Valor padrão para evitar undefined
    },
    group: {
        type: Object,
        required: true,
    },
});

const store = useGroup();
const { getGroup } = store;	


const deleteStore = useDelete();
const { setDelete } = deleteStore;


</script>