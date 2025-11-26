import { defineStore } from "pinia";

interface DeleteState {
  modalState: boolean;
  name: string;
  delete_name: string;
  delete_id: string;
  deleted: boolean;
}

export const useDelete = defineStore("delete", {
  state: (): DeleteState => ({
    modalState: false,
    name: "",
    delete_name: "",
    delete_id: "",
    deleted: false,
  }),

  actions: {
    changeModalState(state: boolean) {
      this.modalState = state;
    },
    setDelete(name: string, delete_name: string, delete_id: string) {
      this.name = name;
      this.delete_name = delete_name;
      this.delete_id = delete_id;
      this.modalState = true;
    },
    async deleteItem() {
      const response = await onFetch(`/${this.delete_name}/${this.delete_id}`, {
        method: "DELETE",
      });
      this.modalState = false;
      this.deleted = true;
    },
  },
});
