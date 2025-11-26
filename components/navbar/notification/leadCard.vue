<template>

    <div class="flex flex-col w-full items-start relative pt-3">

        <div class="flex h-[50px] w-[2px] absolute left-0"></div>

        <div class="flex justify-start items-center w-full gap-2">
            <div
                class="size-[38px] rounded-xl flex justify-center items-center border border-muted bg-muted/30 text-xs font-bold">
                {{ utils.getInitialChars(item.name) }}
            </div>
            <div class="flex flex-col flex-1 items-start">
                <h3 class="text-xs font-medium">{{ item.name }}</h3>
                <p class="text-xs font-light text-zinc-400">
                    Intervenção solicitada - Leads
                </p>
            </div>
            <a :href="`/leads/${item.id}`">
                <Icon name="ph:arrow-square-out-light"
                    class="cursor-pointer transition duration-500 text-zinc-800 dark:text-zinc-200 text-[25px] p-[4px] rounded-md dark:bg-muted/20 bg-muted/10 border-zinc-300 border dark:border-muted dark:hover:bg-muted hover:border-zinc-500" />
            </a>

        </div>
    </div>

</template>

<script setup lang="ts">

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const utils = useUtils();

</script>