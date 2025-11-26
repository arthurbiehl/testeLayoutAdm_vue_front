<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button size="icon" variant="outline" class="md:hidden">
        <icon name="ph:text-align-left" class="size-6" />
        <span class="sr-only">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="w-[100svw] bg-white dark:bg-black/80">

      <SheetHeader v-show="false">
        <SheetTitle>Mobile Menu</SheetTitle>
        <SheetDescription>
          Title Description
        </SheetDescription>
      </SheetHeader>
      <div class="h-full flex flex-col justify-between gap-2 overflow-hidden">
        <div class="flex w-full items-center border-b p-2">
          <Button
            class="flex justify-start shadow-none gap-3 p-2 px-5 cursor-pointer rounded-md bg-transparent hover:bg-muted w-full">
            <client-only>
              <img v-if="mode" :src="mode === 'dark' ? '/logo_dark.svg' : '/logo_dark.svg'" class="size-[20px]" alt="" />
            </client-only>
            <span class="dark:text-white text-black">PVD</span>
          </Button>
        </div>
        <div class="flex-1 overflow-auto">
          <nav class="grid items-start px-2 gap-1 text-sm font-normal">
            <span class="text-[12px] px-1 py-1 text-gray-500 font-bold">Routes</span>
            <NavbarSidebarItem v-for="link in links" :key="link.name" :link="link" :collapsed="false" />
          </nav>
        </div>
        <div class="border-t flex w-full items-center p-2">
          <NavbarSettings />
        </div>
      </div>    </SheetContent>  </Sheet>
</template>

<script setup lang="ts">

const colorMode = useColorMode();
const mode = colorMode.value;


const links = ref([
  {
    name: 'Início',
    url: '/',
    icon: 'ph:squares-four',
    active: 'index',
    permissions: []
  },
  {
    name: 'Usuários',
    url: '/usuarios',
    icon: 'ph:user',
    active: 'usuarios',
    permissions: ['v_usuarios', 'direcao']
  },
  {
    name: 'Grupos',
    url: '/grupos',
    icon: 'ph:users',
    active: 'grupos',
    permissions: ['v_grupos', 'direcao']
  },
  {
    name: 'Clientes',
    url: '/clientes',
    icon: 'material-symbols:deployed-code-account-outline',
    active: 'clientes',
    permissions: ['v_clientes', 'direcao']
  },
  {
    name: 'Fornecedores',
    url: '/fornecedores',
    icon: 'material-symbols:settings-account-box-outline-rounded',
    active: 'fornecedores',
    permissions: ['v_fornecedores', 'direcao']
  },
  {
    name: 'Categorias',
    url: '/categorias',
    icon: 'material-symbols:bookmark-outline-rounded',
    active: 'categorias',
    permissions: ['v_categoria', 'direcao']
  },
  {
    name: 'Produtos',
    url: '/produtos',
    icon: 'material-symbols:shopping-cart-outline-rounded',
    active: 'produtos',
    permissions: ['v_produtos', 'direcao']
  },
  {
    name: 'Vendas',
    url: '/vendas',
    icon: 'material-symbols:store-outline-rounded',
    active: 'vendas',
    permissions: ['v_venda', 'direcao']
  },

  // {
  //   name: 'Gerencial',
  //   url: '/relatorios',
  //   icon: 'material-symbols:full-stacked-bar-chart',
  //   active: 'relatorios',
  //   permissions: ['v_relatorios', 'direcao']
  // },

]);

</script>

<style scoped>

button[type="button"].absolute.right-4.top-4 {
  display: none; /* Oculta o botão */
}

</style>