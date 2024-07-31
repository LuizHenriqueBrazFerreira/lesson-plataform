import { Select, Option, Checkbox } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { Courses } from '../../types/courseType';
import * as requests from '../../services/requests';
import CoursesBackground from '../../components/CoursesBackground';
import OrangeButton from '../../components/OrangeButton';
import ReportTable from '../../components/ReportTable';
import headers from '../../utils/reportHelpers';

function Reports() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [allCourses, setAllCourses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== 'ADMIN') return navigate('/login');
    requests.setToken(token);
    async function fetchData() {
      try {
        const coursesData = await requests.requestData('/courses');
        setCourses(coursesData);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [navigate, role, token]);

  const handleChooseCourse = (value: string) => {
    setAllCourses(false);
    setCourseTitle(value);
  };

  const handleAllCourses = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAllCourses(checked);

    if (checked) {
      setCourseTitle('');
    }
  };

  const generateReportForAllCourses = async () => {
    try {
      const data = await requests.requestData('/report');

      setSubscribedUsers(data);
      setLoading(false);

      if (data.length === 0) {
        setMessage('Não há alunos inscritos em nenhum curso');
      }
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const generateReportForCourse = async () => {
    try {
      const data = await requests.requestData(`/report/${courseTitle}`);

      setSubscribedUsers(data);
      setLoading(false);

      if (data.length === 0) {
        setMessage('Não há alunos inscritos neste curso');
      }
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    if (allCourses) {
      await generateReportForAllCourses();
    }

    if (courseTitle) {
      await generateReportForCourse();
    }
  };

  const formatData = () => {
    return subscribedUsers.flatMap((report: any) => report.users.map((user: any) => ({
      course: report.course,
      name: user.name,
      email: user.email,
      country: user.country,
      organization: user.organization,
    })));
  };

  return (
    <CoursesBackground>
      <h1
        className="text-xl md:text-4xl
           text-btn-orange font-bold"
      >
        Gerar Relatórios
      </h1>
      <div className="flex gap-5 mt-10">
        <div className="w-1/2">
          <Select
            size="lg"
            label="Selecione um curso"
            onChange={ (value) => handleChooseCourse(value as string) }
            value={ courseTitle }
          >
            {courses.map((course) => (
              <Option key={ course.id } value={ course.title }>
                {course.title}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <p className="text-lg font-bold">
            ou
          </p>
          <Checkbox
            crossOrigin={ undefined }
            label="Todos os cursos"
            id="allCourses"
            checked={ allCourses }
            onChange={ handleAllCourses }
          />
        </div>
      </div>
      {subscribedUsers.length > 0 && (
        <ReportTable reports={ subscribedUsers } />
      )}
      {message && (
        <p className="text-red-500 text-center text-lg font-bold mt-10">
          {message}
        </p>
      )}
      <div className="flex gap-4 self-center">
        <OrangeButton
          isLoading={ loading }
          onClick={ handleGenerateReport }
        >
          Gerar
        </OrangeButton>
        {subscribedUsers.length > 0 && (
          <CSVLink
            data={ formatData() }
            headers={ headers }
            filename="alunos_inscritos.csv"
          >
            <OrangeButton>
              Baixar
            </OrangeButton>
          </CSVLink>
        )}
      </div>
    </CoursesBackground>
  );
}

export default Reports;
