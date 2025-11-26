export function formatFromCentsToValue(value) {
  const newValue = (value / 100).toFixed(2).replace(".", ",");

  return newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

}

export function getDayOfDate(dateString) {
  const date = new Date(dateString);

  const dayNumber = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date);

  return dayNumber;
}

export function brlToFloat(brlString) {

  if (brlString) {
    // Remove tudo que não seja número ou vírgula
    let cleaned = brlString.replace(/[^\d,]/g, '');
    // Substitui vírgula por ponto
    cleaned = cleaned.replace(',', '.');
    // Converte para float
    return parseFloat(cleaned);
  }else {
    return 0;
  }

}


export function getNameOfDay(dateString) {
  const date = new Date(dateString);

  const dayName = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);

  return dayName;
}

export function getNameOfMonth(dateString) {
  const date = new Date(dateString);
  let month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
  month = month.charAt(0).toUpperCase() + month.slice(1, 3);

  return month;
}

export function getTimeFromTimeStamp(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
}

export function formatValue(value) {
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function isImageFile(path) {
  return /\.(jpe?g|png)$/i.test(path)

}