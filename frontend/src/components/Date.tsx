import { Input } from '@material-tailwind/react';
import { format, toZonedTime } from 'date-fns-tz';

type DateProps = {
  date: Date;
  label: string;
};

function Date({ date, label }: DateProps) {
  const zonedDate = toZonedTime(date, 'America/Sao_Paulo');

  const formattedDate = format(
    zonedDate,
    "yyyy-MM-dd'T'HH:mm",
    { timeZone: 'America/Sao_Paulo' },
  );

  return (
    <Input
      crossOrigin={ undefined }
      type="datetime-local"
      value={ formattedDate }
      label={ label }
      readOnly
    />
  );
}

export default Date;
