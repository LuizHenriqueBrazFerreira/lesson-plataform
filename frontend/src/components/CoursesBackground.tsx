import { useLocation } from 'react-router-dom';
import HeaderSection from './HeaderSection';

type CoursesBackgroudProps = {
  children: React.ReactNode;
  heading?: string;
  title?: string;
  moreClasses?: string;
};

function CoursesBackground({ children, heading = '', title = '',
  moreClasses = '' }: CoursesBackgroudProps) {
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
        <HeaderSection heading={ heading } title={ title } />
      )}
      <section
        className={ `md:w-[81rem] w-screen bg-white flex 
        flex-col grow px-[2rem] py-[3rem] rounded-2xl ${moreClasses}` }
      >
        {children}
      </section>
    </main>
  );
}

export default CoursesBackground;
