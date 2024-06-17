// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { LessonsType } from '../types/lessons';
// import { requestCreateLesson, deleteLesson,
//   requestUpdateLesson } from '../services/requests';

// type NewLessonProps = {
//   newLesson: boolean,
//   lessonFromDB?: Lessons
// };

// function Lesson({ newLesson = true, lessonFromDB = {} as Lessons }: NewLessonProps) {
//   const initialForm = {
//     title: '',
//     content: 'content',
//     image: 'image',
//     moduleTitle: '',
//     link: 'link',
//   };

//   const navigate = useNavigate();
//   const [isNewLesson, setIsNewLesson] = useState<boolean>(true);
//   const [lessonData, setLessonData] = useState(initialForm as Lessons);
//   const { id } = useParams();

//   useEffect(() => {
//     if (newLesson === false) setIsNewLesson(false);
//     if (Object.values(lessonFromDB).length !== 0) setLessonData(lessonFromDB);
//   }, []);

//   function handleChange({ target }:
//   React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//     const { value, name } = target;

//     const lesson = { ...lessonData, [name]: value };
//     // console.log(value);

//     setLessonData(lesson);
//   }
//   // console.log(lessonFromDB);

//   async function handleClick() {
//     try {
//       if (isNewLesson === true) {
//         const response = await requestCreateLesson('/lessons', lessonData);

//         console.log(response);
//       }
//       console.log(lessonData);

//       const response = await requestUpdateLesson(`/lessons/${id}`, lessonData);
//       console.log(response.data);
//     } catch (error: any) {
//       if (error.isAxiosError) console.error(error.response.data);
//     }

//     setLessonData(initialForm);
//   }

//   return (
//     <form
//       onSubmit={ (e) => { e.preventDefault(); } }
//       className="text-center lg:w-[450px]
//       flex flex-row flex-wrap w-[300px] h-[100px] lg:h-[576px]
//       gap-2 justify-center items-center p-1 rounded-md lg:flex-col
//       "
//     >

//       <label htmlFor="title" className="text-xl  ">Título da aula</label>
//       <input
//         type="text"
//         name="title"
//         id="title"
//         required
//         value={ lessonData.title }
//         className="bg-neutral-200  rounded-md w-1/2 h-10 p-1 my-[4px] text-center"
//         onChange={ (event) => handleChange(event) }
//       />

//       <label htmlFor="content" className="text-xl  ">Conteúdo</label>
//       <textarea
//         name="content"
//         id="content"
//         value={ lessonData.content }
//         className="bg-neutral-200  rounded-md w-1/2 p-1 my-[4px] text-center
//         resize-none lg:h-[100px]"
//         onChange={ (event) => handleChange(event) }
//       />

//       <label htmlFor="moduleTitle" className="text-xl  ">Módulo</label>
//       <input
//         type="text"
//         name="moduleTitle"
//         id="moduleTitle"
//         required
//         value={ lessonData.moduleTitle }
//         className="bg-neutral-200  rounded-md w-1/2 h-10 p-1 my-[4px] text-center"
//         onChange={ (event) => handleChange(event) }
//       />

//       <label htmlFor="image" className="text-xl  ">Imagem</label>
//       <input
//         type="text"
//         name="image"
//         id="image"
//         value={ lessonData.image }
//         className="bg-neutral-200  rounded-md w-1/2 h-10 p-1 my-[4px] text-center"
//         onChange={ (event) => handleChange(event) }
//       />

//       <label htmlFor="link" className="text-xl  ">Link da video aula</label>
//       <input
//         type="text"
//         name="link"
//         id="link"
//         value={ lessonData.link }
//         className="bg-neutral-200  rounded-md w-1/2 h-10 p-1 my-[4px] text-center"
//         onChange={ (event) => handleChange(event) }
//       />

//       <button
//         onClick={ handleClick }
//         className="bg-white border-solid border-2
//           border-btn-orange text-btn-orange w-[125px] h-10 self-center rounded-md"
//       >
//         {isNewLesson ? 'Cadastrar' : 'Alterar'}
//       </button>

//       {newLesson === true ? (<div />)
//         : (
//           <button
//             onClick={ () => { deleteLesson(`/lessons/${id}`); navigate('/admin'); } }
//             className=" bg-white border-solid border-2
//           border-btn-orange text-btn-orange w-[125px] h-10 self-center rounded-md"
//           >
//             Deletar aula
//           </button>)}
//     </form>
//   );
// }

// export default Lesson;
