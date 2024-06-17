import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Option } from '@material-tailwind/react';
import OrangeButton from '../components/OrangeButton';
import WhiteButton from '../components/WhiteButton';
import CoursesBackground from '../components/CoursesBackground';
import TrashButton from '../components/TrashButton';
import PlusButton from '../components/PlusButton';
import CreateLesson from '../components/CreateLesson';
import { LessonPropType, LessonsType, INITIAL_LESSON } from '../types/lessons';
import {
  setToken,
  requestData,
  requestUpdate,
  requestDelete,
} from '../services/requests';
import { Courses, Module, EditModule } from '../types/courseType';
import {
  handleModuleEdit,
  handleLessonEdit,
  showSuccessMessage,
  showNoCourseSelectedMessage,
} from '../utils/editCourseHelpers';

export default function EditCourse() {
  const [modules, setModules] = useState<EditModule[]>([]);
  const [modulesBackup, setModulesBackup] = useState<EditModule[]>([]);
  const [lessons, setLessons] = useState<LessonPropType[]>([]);
  const [lessonsBackup, setLessonsBackup] = useState<LessonPropType[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseId, setCourseId] = useState(0);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
    setToken(token);
    async function fetchData() {
      try {
        const coursesData = await requestData('/courses');
        setCourses(coursesData);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [navigate, token, courseTitle]);

  const handleChooseCourse = async (value: string) => {
    if (token) setToken(token);
    setCourseTitle(value);

    const selectedCourse = courses.find((course) => course.title === value);
    if (!selectedCourse) return;

    setCourseId(selectedCourse.id);
    setModules([]);
    setLessons([]);

    const modulesData = await requestData(`/modules/${selectedCourse.id}`);
    const newModules = modulesData.map((module: Module) => (
      {
        id: module.id,
        title: module.title,
      }
    ));
    setModules(newModules);
    setModulesBackup(newModules);

    const lessonsPromises = modulesData.map(async (module: Module) => {
      const lessonsData = await requestData(`/lessons/${module.id}`);
      return lessonsData.map((lesson: LessonsType) => ({
        id: lesson.id,
        moduleTitle: module.title,
        title: lesson.title,
        content: lesson.content,
        image: lesson.image,
        link: lesson.link,
      }));
    });
    const newLessons = (await Promise.all(lessonsPromises)).flat();
    setLessons(newLessons);
    setLessonsBackup(newLessons);
  };
  const handleAddModule = () => {
    setModules([...modules, { id: 0, title: '' }]);
  };

  const handleAddLesson = () => {
    setLessons([...lessons, INITIAL_LESSON]);
  };

  // adicionar request para deletar módulo, estava dando erro no sequelize então tentarei depois
  const handleRemoveModule = async (index: number) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  // adicionar request para deletar aula, estava dando erro no sequelize então tentarei depois
  const handleRemoveLesson = (index: number) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    setLessons(newLessons);
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
    event: ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement | HTMLSelectElement> | string,
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

    if (!token) {
      return navigate('/login');
    }
    setToken(token);

    const courseData = await requestUpdate(
      `/courses/${courseId}`,
      { id: courseId, title: courseTitle },
    );

    const modulesData = await handleModuleEdit(courseId, courseTitle, modules);
    const lessonsData = await handleLessonEdit(lessons);

    if (courseData && modulesData && lessonsData) {
      showSuccessMessage('Curso atualizado com sucesso');
      setCourseTitle('');
      setModules([]);
      setLessons([]);
    }
  };

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1 className="text-xl lg:text-4xl text-btn-orange font-bold mb-10">
          Editar Curso
        </h1>
      </div>
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
        <PlusButton onClick={ handleAddModule }>
          Adicionar Módulo
        </PlusButton>
        {lessons.map((lesson, index) => (
          <CreateLesson
            key={ index }
            modules={ modules.map((module) => module.title) }
            handleLessonsChange={ handleLessonsChange }
            handleRemoveLesson={ handleRemoveLesson }
            index={ index }
            lesson={ lesson }
          />
        ))}
        <PlusButton onClick={ handleAddLesson }>
          Adicionar Aula
        </PlusButton>
        <div className="flex gap-4 justify-center">
          <OrangeButton type="submit">
            Salvar
          </OrangeButton>
          <WhiteButton onClick={ () => navigate('/admin') }>
            Voltar
          </WhiteButton>
        </div>
      </form>
    </CoursesBackground>
  );
}
