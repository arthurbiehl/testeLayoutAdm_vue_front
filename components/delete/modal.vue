<template>
    <AlertDialog v-model:open="modalState" @close="changeModalState(false)">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Deletar {{ name }}</AlertDialogTitle>
                <AlertDialogDescription>
                    Tem certeza de que deseja deletar este item?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button variant="outline" @click="changeModalState(false)">
                    Cancelar
                </Button>
                <Button variant="destructive" @click="deleteItem">
                    Confirmar
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup lang="ts">
import { useDelete } from '~/store/delete.store';

const store = useDelete();
const { modalState, name } = storeToRefs(store);
const { changeModalState, deleteItem } = store;
</script>