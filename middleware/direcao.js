export default defineNuxtRouteMiddleware((to) => {
   
   const scope = useCookie('scope').value;
   
   if(!scope.includes("direcao")) {
      const router = useRouter()
      router.push('/')
   }
   
});