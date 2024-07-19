import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import { LessonsType, INITIAL_LESSON } from '../../types/lessons';
import { requestPost, setToken } from '../../services/requests';
import { showSuccessMessage } from '../../utils/sweetAlert';
import { handleCreateModule, handleCreateLessons, handleCreatePdf }
  from '../../utils/createCourseHelpers';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import CoursesBackground from '../../components/CoursesBackground';
import TrashButton from '../../components/TrashButton';
import PlusButton from '../../components/PlusButton';
import CreateLesson from '../../components/CreateLesson';

function CreateCourse() {
  const [modules, setModules] = useState(['']);
  const [lessons, setLessons] = useState<LessonsType[]>([INITIAL_LESSON]);
  const [courseTitle, setCourseTitle] = useState('');
  const [forumURL, setForumURL] = useState('');
  const [duration, setDuration] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      return navigate('/login');
    }

    setToken(token);
  }, [navigate]);

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

    const courseData = await requestPost('/courses', {
      title: courseTitle,
      forum: forumURL,
      duration });

    const modulesData = await handleCreateModule(courseTitle, modules);

    const lessonsData = await handleCreateLessons(lessons);

    const pdfData = await handleCreatePdf(lessons);

    if (courseData.title && modulesData.length && lessonsData.length && pdfData.length) {
      showSuccessMessage('Curso criado com sucesso');

      setCourseTitle('');

      setForumURL('');

      setModules(['']);

      setLessons([INITIAL_LESSON]);
    }
  };

  return (
    <CoursesBackground>
      <h1
        className="text-xl md:text-4xl
            text-btn-orange font-bold mb-10"
      >
        Criar Curso
      </h1>
      <form className="flex flex-col gap-4" onSubmit={ handleCreateCourse }>
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          label="Título do curso"
          value={ courseTitle }
          onChange={ (event) => setCourseTitle(event.target.value) }
        />
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
          label="Duração do curso"
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
