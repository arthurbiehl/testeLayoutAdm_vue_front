import { defineStore } from "pinia";

interface Group {
  name: string;
  permissions: number[]; // Array de IDs de permissões
}

interface State {
  formState: boolean;
  permissions: Array<{ id: number; name: string }>; // Array de permissões
  group: Group;
  groups: Group[];
  isUpdate: boolean;
  groupId: any;
}

export const useGroup = defineStore("group", {
  state(): State {
    return {
      formState: false,
      permissions: [],
      group: {
        name: "",
        permissions: [],
      },
      groups: [],
      isUpdate: false,
      groupId: ''
    };
  },

  actions: {
    changeFormState(state: boolean) {
      this.formState = state;
      if(!state) {
        this.group = { name: "", permissions: [] };
        this.isUpdate = false;
      }
    },

    async getPermissions() {
      this.permissions = [];
      const response = await onFetch(`/permission`, {
        method: "GET",
      });
      this.permissions = response;
    },

    async getGroups() {
      this.groups = [];
      const response = await onFetch(`/group`, {
        method: "GET",
      });
      this.groups = response;
    },

    async getGroup(id: number) {
      this.group = { name: "", permissions: [] };
      this.groupId = '';
      const response = await onFetch(`/group/${id}`, {
        method: "GET",
      });
      this.group = response;
      this.group.permissions = response.permissions.map((permission: any) => permission.permissionId)
      this.isUpdate = true;
      this.groupId = id;
      this.changeFormState(true);
    },

    async storeGroup() {
      const response = await onFetch(`/group`, {
        method: "POST",
        body: this.group,
      });
      this.getGroups();
    },

    async updateGroup() {
      const response = await onFetch(`/group/${this.groupId}`, {
        method: "PUT",
        body: this.group,
      });
      this.getGroups();
    },
  },
});