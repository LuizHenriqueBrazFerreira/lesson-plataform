import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesBackground from '../../components/CoursesBackground';
import { requestData, requestUpdate, setToken } from '../../services/requests';
import { UserCourses } from '../../types/courseType';
import CourseCard from '../../components/CourseCard';
import { useTranslation } from "react-i18next";

function BookmarkedCourses() {
  const [courses, setCourses] = useState<UserCourses[]>([]);
  const [hasCourses, setHasCourses] = useState(true);
  const { t } = useTranslation();

  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const data = await requestData(`/user-courses/${userId}`);
        setCourses(data);
        setHasCourses(data.some((course: UserCourses) => course.bookmarked));
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data.message);
        }
      }
    }

    fetchData();
  }, []);

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
      <h1
        className="text-xl md:text-4xl
           text-btn-orange font-bold"
      >
        {t("CursosSalvos")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 min-w-fit">
        <br />
        { hasCourses ? (
          courses.map((course, index) => (
            course.bookmarked ? (
              <CourseCard
                key={ index }
                course={ course }
                index={ index }
                handleBookmark={ handleBookmark }
              />
            ) : (null)
          ))
        )
          : (
            <h2
              className="text-xl md:text-4xl font-bold
              col-span-2 row-start-2 text-center"
            >
              {t("VoceNaoPossuiCursosSalvos")}
            </h2>
          )}
      </div>
    </CoursesBackground>
  );
}

export default BookmarkedCourses;
