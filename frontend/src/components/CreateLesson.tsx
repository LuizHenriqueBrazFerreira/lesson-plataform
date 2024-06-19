import { Input, Select, Option, Textarea } from '@material-tailwind/react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { useState } from 'react';
import TrashButton from './TrashButton';
import PlusButton from './PlusButton';
import { LessonPropType, PdfsType } from '../types/lessons';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

type CreateLessonType = {
  handleLessonsChange: (event: any, index: number, delta?: any) => void,
  index: number,
  lesson: LessonPropType,
  modules: string[],
  handleRemoveLesson: (index: number) => void,
  pdfs: PdfsType[],
  handleAddPdf: () => void,
  handleRemovePdf: (i: number) => void,
  handlePdfsChange: (event: any, i: number) => void,
};

function CreateLesson({
  handleLessonsChange,
  index,
  lesson,
  modules,
  pdfs,
  handleRemoveLesson,
  handleAddPdf,
  handleRemovePdf,
  handlePdfsChange,
}: CreateLessonType) {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <div className="flex flex-col gap-4 border p-8">
      <div className="flex gap-2">
        <h2 className="text-2xl font-semibold">
          Aula
          {' '}
          {index + 1}
        </h2>
        <TrashButton
          type="button"
          onClick={ () => handleRemoveLesson(index) }
        />
      </div>
      <Select
        size="lg"
        label="Selecione o módulo"
        name="moduleTitle"
        selected={ () => lesson.moduleTitle }
        value={ lesson.moduleTitle }
        onChange={ (event) => handleLessonsChange(event, index) }
      >
        {modules.map((module, i) => (
          <Option
            key={ i }
            value={ module }
          >
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
      {pdfs.map((pdf, i) => (
        <div key={ i } className="flex flex-col gap-4">
          <Input
            crossOrigin={ undefined }
            size="lg"
            type="text"
            label={ `Título do PDF ${i + 1}` }
            name="title"
            value={ pdf.title }
            onChange={ (event) => handlePdfsChange(event, i) }
            icon={ <TrashButton
              type="button"
              onClick={ () => handleRemovePdf(i) }
            /> }
          />
          <Input
            crossOrigin={ undefined }
            size="lg"
            type="text"
            label={ `Link do PDF ${i + 1}` }
            name="link"
            value={ pdf.path }
            onChange={ (event) => handlePdfsChange(event, i) }
          />
        </div>
      ))}
      <PlusButton onClick={ handleAddPdf }>
        Adicionar PDF
      </PlusButton>
    </div>
  );
}

export default CreateLesson;
