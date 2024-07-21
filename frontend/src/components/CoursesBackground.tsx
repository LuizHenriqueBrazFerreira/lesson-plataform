import { useLocation } from 'react-router-dom';
import HeaderSection from './HeaderSection';

type CoursesBackgroudProps = {
  children: React.ReactNode;
  heading?: string;
  title?: string;
  moreClasses?: string;
  loading?: boolean;
  duration?: string;
};

function CoursesBackground({ children, heading = '', title = '',
  moreClasses = '', loading = false, duration = '' }: CoursesBackgroudProps) {
  const { pathname } = useLocation();

  const shouldDisplayHeader = pathname.includes('/lessons')
    || pathname.includes('/modules');
  const shouldHideHeader = pathname.includes('/pdfs');

  return (
    <main
      className="min-h-[85vh] font-['Nunito']
      bg-courses-gray flex flex-col justify-center items-center py-[3rem] px-4"
    >
      {shouldDisplayHeader && !shouldHideHeader && (
        <HeaderSection heading={ heading } title={ title } loading={ loading } />
      )}
      { duration && (
        <div
          className="md:w-[81rem] min-h-14 w-screen rounded-2xl mb-8 bg-white flex
          justify-center items-center text-xl flex-wrap p-4"
        >
          <p>{duration}</p>
        </div>
      )}
      <section
        className={ `md:w-[81rem] w-screen bg-white flex 
        flex-col grow md:px-12 p-5 py-12 rounded-2xl ${moreClasses}` }
      >
        {children}
      </section>
    </main>
  );
}

export default CoursesBackground;
