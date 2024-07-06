import { Input, Select, Option } from '@material-tailwind/react';
import { INITIAL_PDF, LessonPropType } from '../types/lessons';
import { requestDelete } from '../services/requests';
import EditorConvertToHTML from './TextEditor';
import TrashButton from './TrashButton';
import PlusButton from './PlusButton';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type CreateLessonType = {
  handleLessonsChange: (event: any, index: number) => void,
  index: number,
  lesson: LessonPropType,
  modules: string[],
  handleRemoveLesson: (index: number) => void,
  setLessons: React.Dispatch<React.SetStateAction<LessonPropType[]>>
};

function CreateLesson({
  handleLessonsChange,
  index,
  lesson,
  modules,
  handleRemoveLesson,
  setLessons,
}: CreateLessonType) {
  const handleAddPdf = (i: number) => {
    setLessons((prevLessons) => {
      return prevLessons.map((lessonList, indexLesson) => {
        if (indexLesson === i) {
          return {
            ...lessonList,
            pdfs: [...lessonList.pdfs, { ...INITIAL_PDF }],
          };
        }
        return lessonList;
      });
    });
  };

  const handlePdfsChange = (event: any, lessonIndex: number, pdfIndex: number) => {
    const { name, value } = event.target;
    setLessons((prevLessons) => {
      return prevLessons.map((lessonList, indexLesson) => {
        if (indexLesson === lessonIndex) {
          return {
            ...lessonList,
            pdfs: lessonList.pdfs.map((pdf, indexPdf) => {
              if (indexPdf === pdfIndex) {
                return {
                  ...pdf,
                  [name]: value,
                };
              }
              return pdf;
            }),
          };
        }
        return lessonList;
      });
    });
  };

  const handleRemovePdf = async (lessonIndex: number, pdfIndex: number) => {
    try {
      let id;
      setLessons((prevLessons) => {
        const newLessons = [...prevLessons];
        id = newLessons[lessonIndex].pdfs[pdfIndex].id;
        newLessons[lessonIndex].pdfs.splice(pdfIndex, 1);
        return newLessons;
      });
      await requestDelete(
        `/pdfs/${id}`,
      );
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 border p-8">
      <div className="flex gap-2">
        <h2 className="text-2xl font-semibold">
          {`Aula ${index + 1}`}
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
      {/* <Textarea
        label="Conteúdo da aula"
        name="content"
        value={ lesson.content }
        onChange={ (event) => handleLessonsChange(event, index) }
      /> */}
      <EditorConvertToHTML />
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
      {lesson.pdfs.length > 0 && lesson.pdfs.map((pdf, i) => (
        <div key={ pdf.id } className="flex flex-col gap-4">
          <Input
            crossOrigin={ undefined }
            size="lg"
            type="text"
            label={ `Título do PDF ${i + 1}` }
            name="title"
            value={ pdf.title }
            onChange={ (event) => handlePdfsChange(event, index, i) }
            icon={ <TrashButton
              type="button"
              onClick={ () => handleRemovePdf(index, i) }
            /> }
          />
          <Input
            crossOrigin={ undefined }
            size="lg"
            type="text"
            label={ `Link do PDF ${i + 1}` }
            name="path"
            value={ pdf.path }
            onChange={ (event) => handlePdfsChange(event, index, i) }
          />
        </div>
      ))}
      <PlusButton onClick={ () => handleAddPdf(index) }>
        Adicionar PDF
      </PlusButton>
    </div>
  );
}

export default CreateLesson;
