import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import OrangeButton from '../components/OrangeButton';
import WhiteButton from '../components/WhiteButton';
import CoursesBackground from '../components/CoursesBackground';
import TrashButton from '../components/TrashButton';
import PlusButton from '../components/PlusButton';
import CreateLesson from '../components/CreateLesson';
import { INITIAL_PDF, LessonPropType, PdfsType, INITIAL_LESSON } from '../types/lessons';
import { requestDelete, requestPost, setToken } from '../services/requests';
import { showSuccessMessage } from '../utils/editCourseHelpers';
import { handleCreateModule, handleCreateLessons, handleCreatePdf }
  from '../utils/createCourseHelpers';

function CreateCourse() {
  const [modules, setModules] = useState(['']);
  const [lessons, setLessons] = useState<LessonPropType[]>([INITIAL_LESSON]);
  const [courseTitle, setCourseTitle] = useState('');

  const navigate = useNavigate();

  const handleAddModule = () => {
    setModules([...modules, '']);
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
    newModules[index] = event.target.value;
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

  const handleCreateCourse = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    const courseData = await requestPost('/courses', { title: courseTitle });

    const modulesData = await handleCreateModule(courseTitle, modules);

    const lessonsData = await handleCreateLessons(lessons);

    const pdfData = await handleCreatePdf(lessons);

    if (courseData.title && modulesData.length && lessonsData.length && pdfData.length) {
      showSuccessMessage('Curso criado com sucesso');

      setCourseTitle('');

      setModules(['']);

      setLessons([INITIAL_LESSON]);
    }
  };

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-xl lg:text-4xl
            text-btn-orange font-bold mb-10"
        >
          Criar Curso
        </h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={ handleCreateCourse }>
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
              value={ module }
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
            modules={ modules }
            handleLessonsChange={ handleLessonsChange }
            handleRemoveLesson={ handleRemoveLesson }
            index={ index }
            lesson={ lesson }
            setLessons={ setLessons }
          />
        ))}
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

export default CreateCourse;
