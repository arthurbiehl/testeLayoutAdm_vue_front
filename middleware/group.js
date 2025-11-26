export default defineNuxtRouteMiddleware((to) => {
   
   const scope = useCookie('scope').value;
   
   if(!scope.includes("v_grupos")) {
      const router = useRouter()
      router.push('/')
   }
   
});