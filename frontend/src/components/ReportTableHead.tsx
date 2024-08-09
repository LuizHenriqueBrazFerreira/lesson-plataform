function ReportTableHead() {
  return (
    <thead className="flex w-full border gap-1 p-2 bg-neutral-200">
      <th className="w-2/5 text-left">Curso</th>
      <th className="w-[35%] text-left">Estudante</th>
      <th className="w-[25%] text-left">Email</th>
      <th className="w-[10%]">País</th>
      <th className="w-[15%]">Inscrição no curso</th>
      <th className="w-[15%]">Inscrição na plataforma</th>
      <th className="w-[10%] text-right">Organização</th>
    </thead>
  );
}

export default ReportTableHead;
