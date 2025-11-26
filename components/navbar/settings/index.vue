<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        :class="[
          'flex items-center justify-between gap-3 cursor-pointer transition shadow-none h-auto bg-transparent hover:bg-zinc-100/10 w-full',
          { 'px-2 py-2': collapsed }, // Ajuste para o estado colapsado (apenas ícone)
        ]"
      >
        <template v-if="collapsed">
          <Icon name="ph:user-circle-thin" class="size-6 text-gray-600 dark:text-gray-300" />
        </template>
        
        <template v-else>
          <Avatar class="size-10"> 
            <AvatarImage :src="userAvatarUrl" alt="Profile" />
            <AvatarFallback>{{ utils.getInitialChars(userName) }}</AvatarFallback>
          </Avatar>

          <div class="text-sm flex-grow text-left truncate">
            <p class="font-semibold dark:text-white text-gray-900 truncate">{{ userName }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ userN }}</p>
          </div>
          
          <Icon name="ph:caret-right" class="text-zinc-500 h-5 w-5" />
        </template>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-64">
      
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ userName }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{{ userN }}</p>
      </div>

      <div class="py-2">
        <DropdownMenuItem as-child class="cursor-pointer">
          <NuxtLink to="/ajuda" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Icon name="ph:question-thin" class="w-4 h-4" />
            Site Darby Biehl
          </NuxtLink>
        </DropdownMenuItem>
        
        <NavbarTogglemode /> 

      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 pt-2">
        <DropdownMenuItem @click="store.userLogout()" class="cursor-pointer">
          <button class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Icon name="ph:sign-out-thin" class="w-4 h-4" />
            Sair
          </button>
        </DropdownMenuItem>
      </div>
      
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth.store';

const utils = useUtils();

// Definição das Props
const props = defineProps<{
  collapsed?: boolean; 
}>();

const store = useAuth();


const userName = useCookie("userName").value || '?';
const userN = useCookie("userN").value || '@gmail.com'; 
const userAvatarUrl = useCookie("userAvatarUrl").value || '/perfil_exemplo.jpg'; 
</script>