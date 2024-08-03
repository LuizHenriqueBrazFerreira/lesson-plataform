import { SubscribredUsers } from '../types/userTypes';
import { formatDate } from '../utils/reportHelpers';

type ReportTableRowProps = {
  subscribedUsers: SubscribredUsers;
  course: string;
};

function ReportTableRow({ subscribedUsers, course }: ReportTableRowProps) {
  return (
    <tr className="flex w-full border p-3 gap-4">
      <th className="w-2/5 text-left">{ course }</th>
      <th className="w-2/5">{ subscribedUsers.name }</th>
      <th className="w-1/5 text-center">{ subscribedUsers.email }</th>
      <th className="w-[15%] text-center">{ subscribedUsers.country }</th>
      <th className="w-1/5 text-center">{ formatDate(subscribedUsers.since) }</th>
      <th className="w-1/5 text-center">{ formatDate(subscribedUsers.subscribedAt) }</th>
      <th className="w-1/5 text-right">{ subscribedUsers.organization }</th>
    </tr>
  );
}

export default ReportTableRow;
