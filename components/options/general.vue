<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="size-7">
        <Icon name="ph:dots-three-vertical-bold"
          class="size-4 cursor-pointer transition-all hover:bg-muted rounded-sm dark:text-white text-black color-white" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40 flex flex-col items-start">
      <Label class="text-[13px] p-2 text-gray-500">Ações</Label>

      <!-- Slot para as opções de dropdown -->
      <slot name="options"></slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>