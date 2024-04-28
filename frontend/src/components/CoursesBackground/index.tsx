type Children = {
  children: React.ReactNode;
};

function CoursesBackground({ children }: Children) {
  return (
    <div
      className="w-screen h-[85vh] font-['Nunito']
     bg-courses-gray flex flex-col justify-center items-center"
    >
      <main
        className="w-[81rem] h-[90%] bg-white
      flex flex-col px-[2rem] py-[3rem] rounded-2xl"
      >
        { children }
      </main>
    </div>
  );
}

export default CoursesBackground;
