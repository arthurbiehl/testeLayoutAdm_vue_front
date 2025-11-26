export const useImageUrl = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseURL.endsWith('/')
    ? config.public.baseURL
    : config.public.baseURL + '/';

  const getImage = (imagePath: string, folder: string) => {
    return `${baseUrl}uploads/${folder}/${imagePath}`;
  };

  return {
    getImage,
  };
};
