import { format } from "date-fns";

interface Props {
  value: any;
  formatDate: string;
}

const DateFormatted = ({ value, formatDate }: Props) => {
  const formattedDate = format(new Date(value as string), formatDate);
  return <>{formattedDate}</>;
};

export default DateFormatted;
