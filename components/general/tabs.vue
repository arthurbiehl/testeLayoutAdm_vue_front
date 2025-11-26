<template>
    <div class="tabs_header flex items-center justify-start gap-1 bg-muted/90 dark:bg-muted/40 rounded-lg p-1">
        <NuxtLink v-for="route in routes" :to="route.name"
            class="flex items-center justify-center rounded-md px-2 py-1 sm:px-4 text-[13px] sm:text-sm" :class="[
                actualRoute == route.name
                    ? 'bg-black text-white dark:bg-black'
                    : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-muted/50',
            ]" v-show="hasPermission(route.permissions)">
            {{ route.title }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">

const { hasPermission } = usePermission();

interface Route {
    name: string;
    title: string;
    permissions: any[]
    active: boolean;
}

const routes = ref<Route[]>([
    {
        name: "usuarios",
        title: "Usuários",
        active: false,
        permissions: ['v_usuarios', 'direcao']
    },
    {
        name: "grupos",
        title: "Grupos",
        active: false,
        permissions: ['v_grupos', 'direcao']
    }
]);

const actualRoute = useRoute().path.replace('/', '');

</script>