import ReportTableHead from './ReportTableHead';
import ReportTableRow from './ReportTableRow';
import { ReportType } from '../types/userTypes';

type ReportTableProps = {
  reports: ReportType[];
};

function ReportTable({ reports }: ReportTableProps) {
  return (
    <table
      className="[&>tbody>*:nth-child(odd)]:bg-neutral-100
    [&>tbody>*:nth-child(even)]: bg-neutral-200 mt-10"
    >
      <ReportTableHead />
      <tbody>
        {reports.map((report) => (
          report.users.map((user, index) => (
            <ReportTableRow
              key={ index }
              subscribedUsers={ user }
              course={ report.course }
            />
          ))
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
