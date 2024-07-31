import { SubscribredUsers } from '../types/userTypes';

type ReportTableRowProps = {
  subscribedUsers: SubscribredUsers;
  course: string;
};

function ReportTableRow({ subscribedUsers, course }: ReportTableRowProps) {
  return (
    <tr className="flex w-full border p-3">
      <th className="w-1/5 text-left">{ course }</th>
      <th className="w-2/5">{ subscribedUsers.name }</th>
      <th className="w-1/5">{ subscribedUsers.email }</th>
      <th className="w-[15%]">{ subscribedUsers.country }</th>
      <th className="w-1/5 text-right">{ subscribedUsers.organization }</th>
    </tr>
  );
}

export default ReportTableRow;
