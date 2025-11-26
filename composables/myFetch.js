import { nextTick } from 'vue';

import { Toaster, toast } from 'vue-sonner'

export async function myFetch(request, opts = {}, headers = {}) {
  const config = useRuntimeConfig();
  const token = useCookie("token")
  
  const options = {
    baseURL: config.public.baseURL || "http://127.0.0.1:4000",
    headers: {
	    Authorization: `Bearer ${token.value}`,
      ...headers
    },
    ...(opts || {}),
  };

  let data, error

  try {
    data = await $fetch(request, options)
  }
  catch (e) {
    error = e
  }
  
  if(error) {
    const status = error?.response.status;
    const errorMessage = error?.response._data.message;
    if(status === 401 || status === 403) {

      toast.warning('Sua sessão expirou..')
    } else {

      toast.error(errorMessage)
    }
  } else {
    if(data?.message) {

      toast.success(data.message)
    }
    return data
  }

}

export async function onFetch(request, opts = {}, headers = {}) {
  
  await nextTick();
  
  return myFetch(request, opts, headers)
  
}