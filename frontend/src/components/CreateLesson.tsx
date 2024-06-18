import { Input, Select, Option } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import TrashButton from './TrashButton';
import PlusButton from './PlusButton';
import { LessonPropType, PdfsType, INITIAL_PDF } from '../types/lessons';
import 'react-quill/dist/quill.snow.css';

type CreateLessonType = {
  handleLessonsChange: (event: any, index: number, delta?: any) => void,
  index: number,
  lesson: LessonPropType,
  modules: string[],
  handleRemoveLesson: (index: number) => void,
  pdfs: PdfsType[],
  setPdfs: (pdfs: PdfsType[]) => void,
};

function CreateLesson({
  handleLessonsChange,
  index,
  lesson,
  modules,
  pdfs,
  setPdfs,
  handleRemoveLesson,
}: CreateLessonType) {
  const handleAddPdf = () => {
    setPdfs([...pdfs, INITIAL_PDF]);
  };

  const handleRemovePdf = (i: number) => {
    const newPdfs = [...pdfs];
    newPdfs.splice(i, 1);
    setPdfs(newPdfs);
  };

  const handlePdfsChange = (event: any, i: number) => {
    const { name, value } = event.target;
    const newPdfs = [...pdfs];
    newPdfs[i] = { ...newPdfs[i], [name]: value };
    setPdfs(newPdfs);
  };

  const toolbarOptions = [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    ['link', 'image', 'video'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ];

  const options = {
    toolbar: toolbarOptions,
  };

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
      <ReactQuill
        theme="snow"
        placeholder="Conteúdo da aula"
        modules={ options }
        value={ lesson.content }
        onChange={ (event, delta) => handleLessonsChange(event, index, delta) }
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
            value={ pdf.link }
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
