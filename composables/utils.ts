import { parseISO, format, differenceInYears, toDate } from "date-fns";

export const useUtils = (): any => {
  const getInitialChars = (name: string) => {
    const nameParts: any = name.trim().split(" ");

    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 2).toUpperCase();
    } else {
      const firstInitial = nameParts[0][0].toUpperCase();
      const lastInitial = nameParts[1][0].toUpperCase();
      return firstInitial + lastInitial;
    }
  };

  const formatCPF = (cpf: any) => {
    cpf = cpf.replace(/\D/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };



  const redirectToPage = (path: string) => {
    const router = useRouter();
    router.push(path);
  };

  const formatDateToISO = (date: string): string | null => {
    const [day, month, year] = date.split("/");
    if (day && month && year) {
      // Adiciona o tempo "T00:00:00.000Z" para seguir o formato ISO-8601
      return `${year}-${month}-${day}T00:00:00.000Z`;
    }
    return null; // Retorna null caso a data seja inválida
  };

  const formatPhone = (phone: string): string => {
    const numbers = phone.replace(/\D/g, "");

    const format = "($1) $2-$3";
    const formattedPhone = numbers.replace(/(\d{2})(\d{5})(\d{4})/, format);

    return formattedPhone;
  };

  const removeSpecialCharsFromPhoneNumber = (phone: string): string => {
    const numbers = phone.replace(/\D/g, "");
    return numbers;
  };

  const formatDate = (date: string): string | null => {
    // Substitui o espaço entre a data e a hora para o formato ISO
    const isoDate = date.replace(" ", "T"); // "2001-03-03T00:00:00.000Z"

    const firstDate = parseISO(isoDate);

    // Verifica se a data é válida
    if (isNaN(firstDate.getTime())) {
      console.error("Data inválida:", date); // Log de erro
      return null; // Retorna null caso a data seja inválida
    }

    // Forçar a conversão para a data UTC
    const utcDate = toDate(
      firstDate.getTime() + firstDate.getTimezoneOffset() * 60000
    );

    // Formata a data para o formato "dd/MM/yyyy"
    const formattedDate = format(utcDate, "dd/MM/yyyy");
    return formattedDate;
  };

  const formatCalendar = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }


  const calculateAge = (birthDate: string): number => {
    const dateOfBirth = parseISO(birthDate);
    const today = new Date();

    // Calcula a diferença em anos
    const age = differenceInYears(today, dateOfBirth);

    return age;
  };

  // Adicionando a função formatCreatedAt
  const formatCreatedAt = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };
  
  const buildFileUrl = (filePath: string): string => {
    const config = useRuntimeConfig();
    const r2Endpoint = config.public.R2_ENDPOINT;

    return r2Endpoint + '/' + filePath;
  };

  return {
    getInitialChars,
    redirectToPage,
    formatDateToISO,
    formatPhone,
    formatDate,
    calculateAge,
    removeSpecialCharsFromPhoneNumber,
    formatCreatedAt,
    formatCalendar,
    formatCPF,
    buildFileUrl
  };

};
