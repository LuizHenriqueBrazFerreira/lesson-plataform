type Children = {
  children: React.ReactNode;
};

function CoursesBackground({ children }: Children) {
  return (
    <div
      className="w-screen min-h-[85vh] font-['Nunito']
    bg-courses-gray flex flex-col justify-center items-center py-[3rem]"
    >
      <main
        className="lg:w-[81rem] bg-white
        flex flex-col grow px-[2rem] py-[3rem] rounded-2xl"
      >
        { children }
      </main>
    </div>
  );
}

export default CoursesBackground;
