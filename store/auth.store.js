import { Toaster, toast } from "vue-sonner";
const utils = useUtils();

export const useAuth = defineStore("useAuth", {
  state() {
    return {
      token: useCookie("token").value,
    };
  },

  actions: {
    async authenticateUser(user) {
      const config = useRuntimeConfig();

      let data, error;

      try {
        data = await $fetch(config.public.baseURL + "/auth/login", {
          method: "POST",
          body: {
            email: user.email,
            password: user.password,
          },
        });
      } catch (e) {
        error = e;
      }

      if (error) {
        toast.error("Credenciais incorretas");
      } else {
        toast.success("Login efetuado!");
        setTimeout(() => {
          const token = useCookie("token");
          token.value = data.accessToken;

          const scope = useCookie("scope");
          scope.value = data.user.Group.permissions;

          const userName = useCookie("userName");
          userName.value = data.user.name;

          const router = useRouter();
          router.push("/");
        }, 1400);
      }
    },
    userLogout() {
      toast.success("Logout efetuado!");
      setTimeout(() => {
        const token = useCookie("token");
        token.value = null;

        const scope = useCookie("scope");
        scope.value = null;

        const userName = useCookie("userName");
        userName.value = null;

        const router = useRouter();
        router.push("/login");
      }, 1400);
    },
    verifyRole(role) {
      const scope = useCookie("scope").value;
      return scope.includes(role);
    },
  },
});
