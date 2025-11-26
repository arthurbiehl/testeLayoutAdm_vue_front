<template>
  <NuxtLink
    :to="link.url"
    v-if="link && link.url && hasPermission(link.permissions)"
    class="flex items-center font-normal gap-3 rounded-md px-2 py-1.5 text-[12px] relative dark:text-[#cacaca] text-black transition-all"
    :class="{
      'justify-center px-0': collapsed,
      'hover:bg-muted dark:hover:bg-muted/40 dark:hover:text-accent-foreground': !isActive(link.url),
      'dark:bg-muted/40 dark:text-white bg-zinc-950 text-white': isActive(link.url),
    }"
  >
    <Icon v-if="link.icon" :name="link.icon" class="size-[18px]" />
    
    <span v-if="!collapsed">{{ link.name }}</span>

  </NuxtLink>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const { hasPermission } = usePermission();

const props = defineProps<{
  link: {
    name: string;
    url: string;
    icon: string;
    active: string;
    permissions: any[];
  };
  collapsed: boolean;
}>();

const route = useRoute();

const isActive = (url: string) => {
  if (!url) return false;
  if (url === '/') return route.path === '/';
  return route.path.startsWith(url);
};
</script>
