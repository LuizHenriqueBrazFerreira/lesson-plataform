import { useLocation } from 'react-router-dom';

type Children = {
  children: React.ReactNode;
  heading?: string;
  title?: string;
  moreClasses?: string;
};

function CoursesBackground({ children, heading = '',
  title = '', moreClasses = '' }: Children) {
  const { pathname } = useLocation();

  // Verifica se o pathname contém "/lessons"
  const containsLessons = pathname.includes('/lessons');
  // Verifica se o pathname contém "/modules"
  const containsModules = pathname.includes('/modules');
  // Verifica se o pathname contém "/pdfs"
  const conainsPdfs = pathname.includes('/pdfs');

  return (
    <main
      className="min-h-[85vh] font-['Nunito']
    bg-courses-gray flex flex-col justify-center items-center py-[3rem] px-4"
    >
      {(containsLessons || containsModules) && !conainsPdfs ? (
        <section
          className="md:w-[81rem] w-screen bg-white rounded-2xl mb-8
          flex flex-col px-[2rem] py-[1rem] md:py-[2rem] gap-2 md:gap-6"
        >
          <h1
            className="text-2xl md:text-4xl
            text-btn-orange font-bold"
          >
            {heading}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold">
            {title}
          </h2>
        </section>
      ) : null}
      <section
        className={ `md:w-[81rem] w-screen bg-white
        flex flex-col grow px-[2rem] py-[3rem] rounded-2xl 
        ${moreClasses}` }
      >
        { children }
      </section>
    </main>
  );
}

export default CoursesBackground;
