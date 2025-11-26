import { defineStore } from "pinia";

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  groupId: any;
}

interface Group {
  id: number;
  name: string;
}

interface State {
  formState: boolean;
  users: User[];
  user: User;
  groups: Group[];
  isUpdate: boolean;
  userId: any;
}

export const useUser = defineStore("user", {
  state(): State {
    return {
      formState: false,
      users: [],
      user: {
        name: "",
        email: "",
        groupId: '',
      },
      groups: [],
      isUpdate: false,
      userId: '',
    };
  },

  actions: {
    changeFormState(state: boolean) {
      this.formState = state;
      if (!state) {
        this.user = { name: "", email: "", groupId: ''};
        this.isUpdate = false;
      }
    },

    async getUsers() {
      this.users = [];
      const response = await onFetch(`/users`, { method: "GET" });
      this.users = response;
    },

    async getUser(id: number) {
      this.user = { name: "", email: "", groupId: ''};
      this.userId = '';
      const response = await onFetch(`/users/${id}`, { method: "GET" });
      this.user = response;
      this.user.groupId = response.groupId.toString();
      this.isUpdate = true;
      this.userId = id;
      this.changeFormState(true);
    },

    async getGroups() {
      this.groups = [];
      const response = await onFetch(`/group`, { method: "GET" });
      this.groups = response;
    },

    async storeUser() {
      const response = await onFetch(`/users`, {
        method: "POST",
        body: this.user,
      });
      this.getUsers();
    },

    async updateUser() {
      const response = await onFetch(`/users/${this.userId}`, {
        method: "PUT",
        body: this.user,
      });
      this.getUsers();
    },
  },
});