export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Error status - ${res.status}`);
  }
}

export const baseUrl = 'https://norma.nomoreparties.space/api'
export const wsUrl = 'wss://norma.nomoreparties.space'


export function getStatus (status) {
  switch (status) {
    case 'done':
      return 'Выполнен'
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      return status;
  }
}

export const getDate = (date) => {
  const currentDate = new Date();
  const formattedDate = new Date(date);
  const differenceData = currentDate.getTime() - formattedDate.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  let resDay = '';
  if (differenceData < oneDay)
    resDay = 'Сегодня'
  else if (differenceData < oneDay * 2)
    resDay = 'Вчера'
  else
    resDay = `${Math.trunc(differenceData / oneDay)} дня назад`;

  resDay += `, ${formattedDate.toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).substring(12)}`;
  return resDay;
}