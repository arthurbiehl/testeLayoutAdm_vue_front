<template>
  <div class="flex w-full h-[100svh] overflow-hidden bg-gray-50 dark:bg-gray-950">
    <aside
      :class="[
        'h-full hidden md:flex flex-col justify-between gap-2 border-r bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out',
        sidebarStore.isOpen ? 'w-64' : 'w-20'
      ]"
    >
      <div class="flex w-full items-center p-4 justify-between gap-2 border-b border-gray-200 dark:border-gray-800 h-16">
        <div :class="['flex gap-3 items-center overflow-hidden', !sidebarStore.isOpen && 'justify-center w-full']">
          <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <Transition name="fade">
            <h1 v-if="sidebarStore.isOpen" class="font-semibold text-gray-900 dark:text-white text-base whitespace-nowrap">
              Estoque Pro
            </h1>
          </Transition>
        </div>

        <button
          v-if="sidebarStore.isOpen"
          @click="sidebarStore.toggle()"
          class="flex-shrink-0 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
        </div>

      <nav class="flex-1 overflow-y-auto p-3 space-y-1">
        
        <div v-if="sidebarStore.isOpen" class="px-3 mb-2">
          <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Menu Principal</p>
        </div>

        <template v-for="link in links_dashboard" :key="link.url">
          <div v-if="link.children">
            <button
              @click="toggleSession(link.name)"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
                !sidebarStore.isOpen && 'justify-center'
              ]"
            >
              <Icon :name="link.icon" class="w-5 h-5 flex-shrink-0" />
              <Transition name="fade">
                <span v-if="sidebarStore.isOpen" class="flex-1 text-left text-sm whitespace-nowrap">{{ link.name }}</span>
              </Transition>
              <Transition name="fade">
                <svg
                  v-if="sidebarStore.isOpen"
                  :class="['w-4 h-4 transition-transform flex-shrink-0', activeSession === link.name && 'rotate-180']"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Transition>
              <span v-if="!sidebarStore.isOpen" class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {{ link.name }}
              </span>
            </button>

            <Transition name="slide">
              <div v-if="activeSession === link.name && sidebarStore.isOpen" class="ml-11 mt-1 space-y-1">
                <a
                  v-for="childLink in link.children"
                  :key="childLink.url"
                  :href="childLink.url"
                  :class="[
                    'block px-3 py-2 text-sm transition-colors',
                    currentRoute.path === childLink.url
                      ? 'text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                    'rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800'
                  ]"
                >
                  {{ childLink.name }}
                </a>
              </div>
            </Transition>
          </div>

          <a
            v-else
            :href="link.url"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
              // Estilo Ativo
              currentRoute.path === link.url
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
              !sidebarStore.isOpen && 'justify-center'
            ]"
          >
            <Icon :name="link.icon" class="w-5 h-5 flex-shrink-0" />
            <Transition name="fade">
              <span v-if="sidebarStore.isOpen" class="text-sm whitespace-nowrap">{{ link.name }}</span>
            </Transition>
            <span v-if="!sidebarStore.isOpen" class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {{ link.name }}
            </span>
          </a>
        </template>
        
        </nav>

      <div class="border-t border-gray-200 dark:border-gray-800 p-3">


        <button
          v-if="!sidebarStore.isOpen"
          @click="sidebarStore.toggle()"
          class="w-full mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex justify-center"
        >
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ page }}</h2>
          <div class="hidden md:flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ description || 'Visão Geral' }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <NavbarSettings />

        </div>
      </header>

      <div class="flex-1 flex flex-col overflow-auto">
        <main class="sm:p-5 p-2 flex-1 w-full overflow-y-auto">
          <slot></slot>
        </main>
      </div>
    </div>
    <Toaster position="bottom-center" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { Toaster } from "vue-sonner";
  import { useSidebarStore } from '~/store/sideBar.store';
  import { useColorMode } from '#imports' // Se estiver usando Nuxt 3

  // Tipos
  interface BaseLink {
    name: string;
    url: string;
    icon: string;
    active: string;
    permissions: string[];
  }

  // Novo tipo para links que podem ter sub-links (abas)
  interface SessionLink extends BaseLink {
    children?: BaseLink[]; // Lista de sub-links/abas
  }

  const sidebarStore = useSidebarStore();
  const currentRoute = useRoute();

  const colorMode = useColorMode();
  // Não usado no template, mas mantido no script.
  // const img = computed(() =>
  //   colorMode.value === 'dark' ? '/logo_dark.svg' : '/logo_dark.svg'
  // );

  const props = defineProps({
    page: String,
    description: String,
  });
  
  // Função para alternar o tema (dark/light)
  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  }

const links_dashboard = ref<SessionLink[]>([
  // Principal
  {
    name: 'Principal',
    url: '#',
    icon: 'ph:house-line-bold',
    active: 'principal',
    permissions: [],
    children: [
      { name: 'Início', url: '/', icon: 'ph:squares-four', active: 'index', permissions: [] },
    ]
  },

  // Gestão de Pessoas
  {
    name: 'Gestão de Pessoas',
    url: '#',
    icon: 'ph:users-three-bold',
    active: 'gestao-pessoas',
    permissions: [],
    children: [
      { name: 'Usuários', url: '/usuarios', icon: 'ph:user', active: 'usuarios', permissions: ['v_usuarios', 'direcao'] },
      { name: 'Grupos', url: '/grupos', icon: 'ph:users', active: 'grupos', permissions: ['v_grupos', 'direcao'] },
    ]
  },

  // Comercial e Produtos
  {
    name: 'Comercial e Produtos',
    url: '#',
    icon: 'ph:shopping-bag-bold',
    active: 'comercial-produtos',
    permissions: [],
    children: [
      { name: 'Clientes', url: '/clientes', icon: 'material-symbols:deployed-code-account-outline', active: 'clientes', permissions: ['v_clientes', 'direcao'] },
      { name: 'Fornecedores', url: '/fornecedores', icon: 'material-symbols:settings-account-box-outline-rounded', active: 'fornecedores', permissions: ['v_fornecedores', 'direcao'] },
      { name: 'Categorias', url: '/categorias', icon: 'material-symbols:bookmark-outline-rounded', active: 'categorias', permissions: ['v_categoria', 'direcao'] },
      { name: 'Produtos', url: '/produtos', icon: 'material-symbols:shopping-cart-outline-rounded', active: 'produtos', permissions: ['v_produtos', 'direcao'] },
      { name: 'Vendas', url: '/vendas', icon: 'material-symbols:store-outline-rounded', active: 'vendas', permissions: ['v_venda', 'direcao'] },
    ]
  },

  // Financeiro
  {
    name: 'Financeiro',
    url: '#',
    icon: 'ph:wallet-bold',
    active: 'financeiro',
    permissions: [],
    children: [
      { name: 'Contas a Pagar', url: '/contas-pagar', icon: 'material-symbols:wallet-sharp', active: 'contas-pagar', permissions: ['v_contasPagar', 'direcao'] },
      { name: 'Contas a Receber', url: '/contas-receber', icon: 'material-symbols:wallet-sharp', active: 'contas-receber', permissions: ['v_contasReceber', 'direcao'] },
    ]
  },
]);


  // Estado para controlar qual sessão está aberta
  const activeSession = ref<string | null>(null);

  // Função para abrir/fechar a sessão
  const toggleSession = (name: string) => {
    // Se a sessão atual já estiver aberta, feche-a
    if (activeSession.value === name) {
      activeSession.value = null;
    } else {
      // Caso contrário, abra a nova sessão
      activeSession.value = name;
    }
  };

  onMounted(() => {
    sidebarStore.load();
    // Opcional: Abrir automaticamente a sessão se a rota atual for um filho dela
    const currentLink = links_dashboard.value.find(link =>
        link.children && link.children.some(child => currentRoute.path === child.url)
    );
    if (currentLink) {
        activeSession.value = currentLink.name;
    }
  });
</script>

<style scoped>
/* Adicione as transições do layout de referência para um efeito suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>