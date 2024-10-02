import { format, toZonedTime } from 'date-fns-tz';

const timeZone = 'America/Sao_Paulo';

const formatDate = (date: Date | string) => {
  if (date === 'Não informado') return date;

  const zonedDate = toZonedTime(date, timeZone);
  const result = format(zonedDate, 'dd/MM/yyyy', { timeZone });
  return result ?? '';
};

const headers = [
  {
    label: 'Curso',
    key: 'course',
  },
  {
    label: 'Nome',
    key: 'name',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'País',
    key: 'country',
  },
  {
    label: 'Inscrição no curso',
    key: 'since',
  },
  {
    label: 'Inscrição na plataforma',
    key: 'subscribedAt',
  },
  {
    label: 'Organização',
    key: 'organization',
  },
];

export default headers;

export { formatDate };
