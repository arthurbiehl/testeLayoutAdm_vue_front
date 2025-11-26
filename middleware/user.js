export default defineNuxtRouteMiddleware((to) => {
   
   const scope = useCookie('scope').value;
   
   if(!scope.includes("v_usuarios")) {
      const router = useRouter()
      router.push('/')
   }
   
});