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
import { requestUpdate, setToken, requestData, requestPost } from '../services/requests';
import { Courses, Module } from '../types/courseType';
import { requestAddLessons, requestUpdateLesson } from '../utils/requestUpdateLesson';

export default function EditCourse() {
  const [modules, setModules] = useState([{ id: 0, title: '' }]);
  const [lessons, setLessons] = useState<LessonPropType[]>([INITIAL_LESSON]);
  const [lessonsDB, setLessonsDB] = useState<LessonPropType[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseId, setCourseId] = useState(0);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  console.log(modules);

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
  }, []);

  const handleChooseCourse = async (value: string) => {
    if (token) setToken(token);

    setCourseTitle(value);

    const selectedCourse = courses.find((course) => course.title === value);
    if (!selectedCourse) return;

    setCourseId(selectedCourse.id);
    setModules([]);
    setLessons([]);

    const modulesData = await requestData(`/modules/${selectedCourse.id}`);

    const newModules = modulesData.map((module: Module) => ({ id: module.id,
      title: module.title }));
    setModules(newModules);

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
    setLessonsDB(newLessons);
  };
  const handleAddModule = () => {
    setModules([...modules, { id: modules.length++,
      title: 'Digite o título do módulo' }]);
  };

  const handleAddLesson = () => {
    setLessons([...lessons, INITIAL_LESSON]);
  };

  const handleRemoveModule = (index: number) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleRemoveLesson = (index: number) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    setLessons(newLessons);
  };

  const handleModuleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newModules = [...modules];
    newModules[index].title = event.target.value;
    setModules(newModules);
  };

  const handleLessonsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
  ) => {
    const newLessons = [...lessons];

    if (typeof event === 'string') {
      newLessons[index] = {
        ...newLessons[index],
        moduleTitle: event,
      };
      setLessons(newLessons);
      return;
    }

    const { name, value } = event.target;

    newLessons[index] = {
      ...newLessons[index],
      [name]: value,
    };
    setLessons(newLessons);
  };

  const handleUpdateCourse = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) { return navigate('/login'); }

    setToken(token);
    let courseData = false;
    let moduleData = false;
    let lessonData = false;

    await requestUpdate(`/courses/${courseId}`, { title: courseTitle });
    console.log(modules);

    await Promise.all(modules.map(async (module) => {
      await requestUpdate(`/modules/${module.id}`, { courseTitle, title: module.title });
    }));
    const updatedLessons = await requestUpdateLesson(lessonsDB, lessons, modules);
    const addedLessons = await requestAddLessons(lessonsDB, lessons, modules);
    lessonData = updatedLessons && addedLessons;

    courseData = true;
    moduleData = true;

    // Função que faz o Promise.all rodar para atualizar o banco de dados e/ou adicionar dados

    if (courseData && moduleData && lessonData) {
      setMessage('Curso alterado com sucesso!');
      setCourseTitle('Selecione o curso');
      setModules([{ id: 0, title: 'Digite o título do módulo' }]);
      setLessons([INITIAL_LESSON]);
      setTimeout(() => {
        setMessage('');
      }, 3000);
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
        {message && (
          <p className="text-center text-green-500 font-bold">
            {message}
          </p>
        )}
        <PlusButton onClick={ handleAddLesson }>
          Adicionar Aula
        </PlusButton>
        <div className="flex gap-4 justify-center">
          <OrangeButton type="submit">
            Criar
          </OrangeButton>
          <WhiteButton onClick={ () => navigate('/admin') }>
            Voltar
          </WhiteButton>
        </div>
      </form>
    </CoursesBackground>
  );
}
