<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue';

const props = defineProps({
    notifications: {
        type: Array<any>,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button size="icon" variant="outline" class="relative flex justify-center items-center w-0 h-0 p-[17px]">
                <Icon name="ph:bell-ringing-light"
                    class="cursor-pointer transition duration-500 text-zinc-800 dark:text-zinc-200 text-[35px !important]" />
            </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>
</template>