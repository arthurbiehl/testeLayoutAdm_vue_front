<template>
<div class="flex-1 flex items-center justify-center p-8 lg:p-16">
      <div class="w-full max-w-md space-y-8">
        <!-- Mobile Logo -->
        <div class="flex lg:hidden items-center justify-center space-x-3 mb-8">
          <div class="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <span class="text-2xl font-bold text-white">E</span>
          </div>
          <span class="text-slate-900 text-2xl font-semibold">Estoque</span>
        </div>

        <!-- Header -->
        <div class="w-full flex justify-center justify-center">
          <h1 class="text-4xl font-bold text-slate-900 tracking-tight">
            Bem-vindo de volta
          </h1>
        </div>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-zinc-50 px-3 text-slate-500 font-semibold tracking-wider">
              Entre com sua conta para continuar
            </span>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit="onSubmit" class="space-y-5" autocomplete="off">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nome@email.com"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
              :disabled="isLoading"
              v-model="user.email"
              class="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-0 placeholder-slate-400 text-slate-900 transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div class="space-y-2">
            <input
              id="input_password"
              type="password"
              placeholder="Digite sua senha"
              name="hidden"
              autocomplete="new-password"
              v-model="user.password"
              :disabled="isLoading"
              class="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-0 text-slate-900 transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            class="w-full h-12 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Entrar</span>
            <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth.store';
import { reactive, ref } from 'vue'; // Importar reactive e ref se não estiverem globalmente disponíveis

// Manutenção da lógica de autenticação
const store = useAuth();
const { authenticateUser } = store;

const user = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const isLoading = ref(false)

async function onSubmit(event: Event) {
    event.preventDefault()
    isLoading.value = true
    await authenticateUser(user);
    isLoading.value = false
}
</script>