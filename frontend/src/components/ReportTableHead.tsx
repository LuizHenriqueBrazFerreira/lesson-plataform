function ReportTableHead() {
  return (
    <thead>
      <tr className="flex w-full border p-3 bg-neutral-300">
        <th className="w-1/5 text-left">Curso</th>
        <th className="w-2/5">Estudante</th>
        <th className="w-1/5">Email</th>
        <th className="w-[15%]">País</th>
        <th className="w-1/5 text-right">Organização</th>
      </tr>
    </thead>
  );
}

export default ReportTableHead;
