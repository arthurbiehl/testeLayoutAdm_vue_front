import { useCookie } from 'nuxt/app';

export function usePermission() {
  const scope = useCookie("scope").value;

  // Função que verifica se o usuário possui alguma das permissões passadas
  function hasPermission(roles: string[] = []): boolean {
    // Se não houver roles passadas, permite todas as permissões
    if (roles.length === 0) {
      return true;
    }

    // Verifica se alguma das roles passadas está no scope
    return roles.some(role => scope?.includes(role));
  }

  return { hasPermission };
}