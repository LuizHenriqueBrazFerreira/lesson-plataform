import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesBackground from '../../components/CoursesBackground';
import { requestData, requestUpdate, setToken } from '../../services/requests';
import { UserCourses } from '../../types/courseType';
import CourseCard from '../../components/CourseCard';

function BookmarkedCourses() {
  const [courses, setCourses] = useState<UserCourses[]>([]);

  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'EduActiva - Cursos Salvos';
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    async function fetchData() {
      try {
        const data = await requestData(`/user-courses/${userId}`);
        setCourses(data.filter((course: UserCourses) => course.bookmarked));
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
        Cursos Salvos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 min-w-fit">
        { courses.length ? (
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
              Você não possui cursos salvos
            </h2>
          )}
      </div>
    </CoursesBackground>
  );
}

export default BookmarkedCourses;
