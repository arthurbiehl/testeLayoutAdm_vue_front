import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
      localStorage.setItem('sidebar-isOpen', JSON.stringify(this.isOpen));
    },
    load() {
      const saved = localStorage.getItem('sidebar-isOpen');
      if (saved !== null) {
        try {
          this.isOpen = JSON.parse(saved);
        } catch {
          this.isOpen = true;
        }
      }
    },
  },
});
