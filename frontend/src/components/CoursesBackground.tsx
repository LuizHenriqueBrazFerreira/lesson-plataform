import { useLocation } from 'react-router-dom';

type Children = {
  children: React.ReactNode;
  heading?: string;
  title?: string;
};

function CoursesBackground({ children, heading = '', title = '' }: Children) {
  const { pathname } = useLocation();

  // Verifica se o pathname contém "//lessons"
  const containsLessons = pathname.includes('/lessons');
  // Verifica se o pathname contém "//modulos"
  const containsModules = pathname.includes('/modules');

  return (
    <div
      className="w-screen min-h-[85vh] font-['Nunito']
    bg-courses-gray flex flex-col justify-center items-center py-[3rem] px-4"
    >
      {containsLessons || containsModules ? (
        <section
          className="lg:w-[81rem] bg-white rounded-2xl mb-8
          flex flex-col px-[2rem] py-[1rem] lg:py-[3rem] gap-2 lg:gap-6"
        >
          <h1
            className="text-2xl lg:text-4xl
            text-btn-orange font-bold"
          >
            {heading}
          </h1>
          <h2 className="text-xl lg:text-2xl font-semibold">
            {title}
          </h2>
        </section>
      ) : null}
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
