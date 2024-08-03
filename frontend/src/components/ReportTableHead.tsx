function ReportTableHead() {
  return (
    <thead>
      <tr className="flex w-full border gap-4 p-3 bg-neutral-200">
        <th className="w-2/5 text-left">Curso</th>
        <th className="w-2/5">Estudante</th>
        <th className="w-72 text-center">Email</th>
        <th className="w-[15%] text-center">País</th>
        <th className="w-1/5 text-center">Inscrição no curso</th>
        <th className="w-1/5 text-center">Inscrição na plataforma</th>
        <th className="w-1/5 text-right">Organização</th>
      </tr>
    </thead>
  );
}

export default ReportTableHead;
