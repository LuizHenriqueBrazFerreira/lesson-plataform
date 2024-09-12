import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CoursesBackground from '../../components/CoursesBackground';
import { requestData, requestUpdate, setToken } from '../../services/requests';
import { UserCourses } from '../../types/courseType';
import CourseCard from '../../components/CourseCard';
import LoadingCard from '../../components/LoadingCard';

function StudentCourses() {
  const [courses, setCourses] = useState<UserCourses[]>([]);
  const [hasCourses, setHasCourses] = useState(true);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `EduActiva - ${t("Meus Cursos")}`;
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      setLoading(true);
      try {
        const data = await requestData(`/user-courses/${userId}`);
        setCourses(data);
        setHasCourses(data.length > 0);
        setLoading(false);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [t]);

  const handleBookmark = (id: number, bookmarked: boolean) => {
    setCourses((prevCourses) => prevCourses.map((course) => {
      if (course.courseId === id) {
        requestUpdate('/user-courses', { key: 'bookmarked',
          value: !bookmarked,
          userId,
          courseId: id });
        return { ...course, bookmarked: !bookmarked };
      }
      return course;
    }));
  };

  return (
    <CoursesBackground>
      <h1 className="text-xl md:text-4xl text-btn-orange font-bold">
        {t('Meus Cursos')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        { loading && (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) }
        { hasCourses ? (
          courses.map((course, index) => (
            <CourseCard
              key={ index }
              course={ course }
              index={ index }
              handleBookmark={ handleBookmark }
            />
          ))
        )
          : (
            <h2
              className="text-xl md:text-4xl font-bold
              col-span-2 row-start-2 text-center"
            >
              {t('Você não possui cursos')}
            </h2>
          )}
      </div>
    </CoursesBackground>
  );
}

export default StudentCourses;
