import { Input, Select, Textarea, Option } from '@material-tailwind/react';
// import { ChangeEvent } from 'react';
import TrashButton from './TrashButton';
import { LessonPropType } from '../types/lessons';

type CreateLessonType = {
  handleLessonsChange: (event: any, index: number) => void,
  index: number,
  lesson: LessonPropType,
  modules: string[],
  handleRemoveLesson: (index: number) => void,
};

function CreateLesson({
  handleLessonsChange,
  index,
  lesson,
  modules,
  handleRemoveLesson,
}: CreateLessonType) {
  return (
    <div className="flex flex-col gap-4 mb-5">
      <div className="flex gap-2">
        <h2 className="text-2xl font-semibold">
          Aula
          {' '}
          {index + 1}
        </h2>
        <TrashButton onClick={ () => handleRemoveLesson(index) } />
      </div>
      <Select
        size="lg"
        label="Selecione o módulo"
        name="moduleTitle"
        value={ lesson.moduleTitle }
        onChange={ (event) => handleLessonsChange(event, index) }
      >
        {modules.map((module, i) => (
          <Option key={ i } value={ module }>
            {module}
          </Option>
        ))}
      </Select>
      <Input
        crossOrigin={ undefined }
        size="lg"
        type="text"
        label="Título da aula"
        name="title"
        value={ lesson.title }
        onChange={ (event) => handleLessonsChange(event, index) }
      />
      <Textarea
        label="Conteúdo da aula"
        name="content"
        value={ lesson.content }
        onChange={ (event) => handleLessonsChange(event, index) }
      />
      <Input
        crossOrigin={ undefined }
        size="lg"
        type="text"
        label="Imagem da aula"
        name="image"
        value={ lesson.image }
        onChange={ (event) => handleLessonsChange(event, index) }
      />
      <Input
        crossOrigin={ undefined }
        size="lg"
        type="text"
        label="Link do vídeo da aula"
        name="link"
        value={ lesson.link }
        onChange={ (event) => handleLessonsChange(event, index) }
      />
    </div>
  );
}

export default CreateLesson;
