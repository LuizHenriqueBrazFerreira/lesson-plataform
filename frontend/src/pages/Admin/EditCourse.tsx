/* eslint-disable max-lines */
import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Option } from '@material-tailwind/react';
import * as helpers from '../../utils/editCourseHelpers';
import * as requests from '../../services/requests';
import { showNoCourseSelectedMessage, showSuccessMessage } from '../../utils/sweetAlert';
import { Courses, EditModule } from '../../types/courseType';
import { LessonsType, INITIAL_LESSON } from '../../types/lessons';
import CreateLesson from '../../components/CreateLesson';
import CoursesBackground from '../../components/CoursesBackground';
import Date from '../../components/Date';
import OrangeButton from '../../components/OrangeButton';
import PlusButton from '../../components/PlusButton';
import TrashButton from '../../components/TrashButton';
import WhiteButton from '../../components/WhiteButton';

export default function EditCourse() {
  const [modules, setModules] = useState<EditModule[]>([]);
  const [modulesBackup, setModulesBackup] = useState<EditModule[]>([]);
  const [lessons, setLessons] = useState<LessonsType[]>([]);
  const [lessonsBackup, setLessonsBackup] = useState<LessonsType[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [forumURL, setForumURL] = useState('');
  const [duration, setDuration] = useState('');
  const [courseId, setCourseId] = useState(0);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [updatedAt, setUpdatedAt] = useState<Date>();
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

  const handleChooseCourse = async (value: string) => {
    try {
      if (token) requests.setToken(token);
      setCourseTitle(value);
      const selectedCourse = courses.find((course) => course.title === value);
      if (!selectedCourse) return;
      setCourseId(selectedCourse.id);
      setForumURL(selectedCourse.forum);
      setDuration(selectedCourse.duration);
      setCreatedAt(selectedCourse.createdAt);
      setUpdatedAt(selectedCourse.updatedAt);
      setModules([]);
      setLessons([]);
      const { modulesData, newModules } = await helpers.requestModules(selectedCourse.id);
      setModules(newModules);
      setModulesBackup(newModules);
      const newLessons = await helpers.requestLessons(modulesData);
      const pdfsData = await helpers.requestPdfs(newLessons);
      const lessonsWithPdfs = newLessons.map((lesson) => {
        const pdfs = pdfsData.filter((pdf) => pdf.lessonId === lesson.id);
        return { ...lesson, pdfs: pdfs ?? [] };
      });
      setLessons(lessonsWithPdfs);
      setLessonsBackup(lessonsWithPdfs);
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  const handleAddModule = () => {
    setModules([...modules, { id: 0, title: '' }]);
  };

  const handleAddLesson = () => {
    setLessons((prevLessons) => [...prevLessons, INITIAL_LESSON]);
  };

  const handleRemoveModule = async (index: number) => {
    try {
      await requests.requestDelete(`/modules/${modules[index].id}`);
      const newModules = [...modules];
      newModules.splice(index, 1);
      setModules(newModules);
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  const handleRemoveLesson = async (index: number) => {
    try {
      await requests.requestDelete(`/lessons/${lessons[index].id}`);
      const newLessons = [...lessons];
      newLessons.splice(index, 1);
      setLessons(newLessons);
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  const handleRemoveCourse = async () => {
    try {
      await requests.requestDelete(`/courses/${courseId}`);
      window.location.reload();
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  const handleModuleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], title: event.target.value };
    if (index < modulesBackup.length) {
      const moduleFromLesson = lessonsBackup.map((lesson, i) => {
        if (lesson.moduleTitle === modulesBackup[index].title) {
          return { ...lessons[i], moduleTitle: event.target.value };
        }
        return lessons[i];
      });
      setLessons(moduleFromLesson);
    }
    setModules(newModules);
  };

  const handleLessonsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const newLessons = [...lessons];
    if (typeof event === 'string') {
      newLessons[index] = { ...newLessons[index], moduleTitle: event };
    } else {
      const { name, value } = event.target;
      newLessons[index] = { ...newLessons[index], [name]: value };
    }
    setLessons(newLessons);
  };

  const handleUpdateCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    if (lessons.length === 0 || modules.length === 0) {
      return showNoCourseSelectedMessage();
    }
    const courseData = await requests.requestUpdate(
      `/courses/${courseId}`,
      { id: courseId, title: courseTitle, forum: forumURL, duration },
    );
    const modulesData = await helpers.handleModuleEdit(courseId, courseTitle, modules);
    const lessonsData = await helpers.handleLessonEdit(lessons);
    const pdfsData = await helpers.handlePdfEdit(lessons);

    if (courseData && modulesData && lessonsData && pdfsData) {
      showSuccessMessage('Curso atualizado com sucesso');
      setTimeout(() => { window.location.reload(); }, 1000);
    }
  };

  return (
    <CoursesBackground>
      <h1 className="text-xl md:text-4xl text-btn-orange font-bold mb-10">
        Editar Curso
      </h1>
      <form className="flex flex-col gap-4" onSubmit={ handleUpdateCourse }>
        <Select
          size="lg"
          label="Selecione o curso"
          onChange={ (value) => handleChooseCourse(value as string) }
          value={ courseTitle }
        >
          {courses.map((course) => (
            <Option key={ course.id } value={ course.title }>
              {course.title}
            </Option>
          ))}
        </Select>
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          label="Título do curso"
          value={ courseTitle }
          onChange={ (event) => setCourseTitle(event.target.value) }
          icon={ <TrashButton
            type="button"
            onClick={ handleRemoveCourse }
          /> }
        />
        {createdAt && <Date date={ createdAt } label="Criado em" />}
        {updatedAt && <Date date={ updatedAt } label="Atualizado em" />}
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          label="Link do fórum"
          value={ forumURL }
          onChange={ (event) => setForumURL(event.target.value) }
        />
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          label="Direcionamentos para o curso"
          value={ duration }
          onChange={ (event) => setDuration(event.target.value) }
        />
        {modules.map((module, index) => (
          <div key={ index }>
            <Input
              crossOrigin={ undefined }
              type="text"
              size="lg"
              label={ `Título do módulo ${index + 1}` }
              value={ module.title }
              onChange={ (event) => handleModuleChange(event, index) }
              icon={ <TrashButton
                type="button"
                onClick={ () => handleRemoveModule(index) }
              /> }
            />
          </div>
        ))}
        <PlusButton onClick={ handleAddModule }>Adicionar Módulo</PlusButton>
        {lessons.map((lesson, index) => (
          <CreateLesson
            key={ index }
            modules={ modules.map((module) => module.title) }
            handleLessonsChange={ handleLessonsChange }
            handleRemoveLesson={ handleRemoveLesson }
            index={ index }
            lesson={ lesson }
            setLessons={ setLessons }
          />
        ))}
        <PlusButton onClick={ handleAddLesson }>Adicionar Aula</PlusButton>
        <div className="flex gap-4 justify-center">
          <OrangeButton type="submit">Salvar</OrangeButton>
          <WhiteButton onClick={ () => navigate('/admin') }>Voltar</WhiteButton>
        </div>
      </form>
    </CoursesBackground>
  );
}
