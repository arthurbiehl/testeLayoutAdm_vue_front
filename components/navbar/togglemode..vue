<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger class="cursor-pointer hover:bg-muted p-2 flex items-center justify-between">
        <div class="flex items-center space-x-2">
            <Icon name="ph:paint-brush-broad" class="size-4" />
            <span>Mudar Tema</span>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">({{ colorMode.preference }})</span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent class="w-32">
        <DropdownMenuItem 
            class="space-x-2 cursor-pointer" 
            :class="colorMode.preference == 'light' ? 'bg-muted/70 text-blue-600 dark:text-blue-400' : ''"
            @click="toggleTheme('light')"
        >
          <Icon name="ph:cloud-sun" class="size-4" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
            class="space-x-2 cursor-pointer" 
            :class="colorMode.preference == 'dark' ? 'bg-muted/70 text-blue-600 dark:text-blue-400' : ''"
            @click="toggleTheme('dark')"
        >
          <Icon name="ph:moon-stars" class="size-4" />
          <span>Escuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
            class="space-x-2 cursor-pointer" 
            :class="colorMode.preference == 'system' ? 'bg-muted/70 text-blue-600 dark:text-blue-400' : ''"
            @click="toggleTheme('system')"
        >
          <Icon name="ph:gear" class="size-4" />
          <span>Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>

<script setup lang="ts">
  import { useColorMode } from '#imports'; // Importação Nuxt

  // Assumindo que você está usando componentes Shadcn-Vue/Radix
  import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuItem,
  } from '@/components/ui/dropdown-menu'; // Ajuste o caminho conforme necessário

  const colorMode = useColorMode();

  const toggleTheme = (theme: 'light' | 'dark' | 'system') => {
    colorMode.preference = theme;
  };
</script>