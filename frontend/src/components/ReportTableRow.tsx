import { SubscribredUsers } from '../types/userTypes';
import { formatDate } from '../utils/reportHelpers';

type ReportTableRowProps = {
  subscribedUsers: SubscribredUsers;
  course: string;
};

function ReportTableRow({ subscribedUsers, course }: ReportTableRowProps) {
  return (
    <tr className="flex w-full border p-2 gap-4">
      <th className="w-2/5 text-left">{ course }</th>
      <th className="w-[35%] text-left">{ subscribedUsers.name }</th>
      <th className="w-[25%] text-left">{ subscribedUsers.email }</th>
      <th className="w-[10%]">{ subscribedUsers.country }</th>
      <th className="w-[15%]">{ formatDate(subscribedUsers.since) }</th>
      <th className="w-[15%]">
        { formatDate(subscribedUsers.subscribedAt) }
      </th>
      <th className="w-[10%] text-right">{ subscribedUsers.organization }</th>
    </tr>
  );
}

export default ReportTableRow;
