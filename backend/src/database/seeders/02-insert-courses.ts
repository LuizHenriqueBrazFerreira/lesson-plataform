import { QueryInterface } from 'sequelize';
import UsersSequelize from '../models/Users.model';
import UserCoursesSequelize from '../models/UserCourses.model';
import PdfLessonSequelize from '../models/LessonPdfs.model';
import WatchedLessonSequelize from '../models/WatchedLessons';
import ModulesProgressSequelize from '../models/ModulesProgress';
import { createEmailToken } from '../../utils/jwt';
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

const content = `{
  "time": 1647534033754,
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "Título Exemplo",
        "level": 2
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Este é um parágrafo de exemplo para ilustrar como podemos adicionar conteúdo textual ao nosso editor."
      }
    },
    {
      "type": "image",
      "data": {
        "file": {
          "url": "https://conteudo.imguol.com.br/c/noticias/1c/2022/05/24/imagem-criada-no-imagen-prototipo-do-google-que-cria-imagens-baseadas-em-texto-neste-caso-um-cachorro-corgi-andando-de-bicicleta-na-times-square-usando-oculos-de-sol-e-chapeu-de-praia-1653397634334_v2_900x506.jpg"
        },
        "caption": "Imagem Exemplar",
        "withBorder": false,
        "stretched": false,
        "withBackground": false
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Abaixo, você encontrará um vídeo incorporado diretamente do YouTube, proporcionando uma experiência multimídia rica."
      }
    },
    {
      "type": "embed",
      "data": {
        "service": "youtube",
        "source": "https://www.youtube.com/watch?v=3iQu3E59yqM&ab_channel=PandaIsGood",
        "embed": "https://www.youtube.com/embed/3iQu3E59yqM?si=HOvuNdPtg8AEkF58",
        "width": 560,
        "height": 315,
        "caption": "Vídeo Exemplar do YouTube"
      }
    },
    {
      "type": "header",
      "data": {
        "text": "Conclusão",
        "level": 2
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Este exemplo ilustra como diferentes tipos de conteúdo, como títulos, parágrafos, imagens e vídeos, podem ser combinados para criar uma página rica e interativa."
      }
    }
  ],
  "version": "2.22.2"
}`;

export default {
  up: async (queryInterface: QueryInterface) => {
    // Inserir cursos
    await queryInterface.bulkInsert('Courses', [
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', forum: 'www.google.com', duration: 'Duração estimada: 2 horas', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2', forum: 'https://linkedin.com.br', duration: 'Duração estimada: 3 horas', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3', forum: 'https://youtube.com/', duration: 'Duração estimada: 1 hora', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4', forum: 'www.google.com', duration: 'Duração estimada: 5 horas', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5', forum: 'www.google.com', duration: 'Duração estimada: 2 horas', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Inserir módulos
    await queryInterface.bulkInsert('Modules', [
      { title: 'Coloque o título do módulo 1 aqui.....', course_id: 1 },
      { title: 'Coloque o título do módulo 2 aqui.....', course_id: 1 },
      { title: 'Coloque o título do módulo 3 aqui.....', course_id: 1 },
      { title: 'Coloque o título do módulo 4 aqui.....', course_id: 2 },
      { title: 'Coloque o título do módulo 5 aqui.....', course_id: 2 },
      { title: 'Coloque o título do módulo 6 aqui.....', course_id: 2 },
      { title: 'Coloque o título do módulo 7 aqui.....', course_id: 3 },
      { title: 'Coloque o título do módulo 8 aqui.....', course_id: 3 },
      { title: 'Coloque o título do módulo 9 aqui.....', course_id: 3 },
      { title: 'Coloque o título do módulo 10 aqui.....', course_id: 4 },
      { title: 'Coloque o título do módulo 11 aqui.....', course_id: 4 },
      { title: 'Coloque o título do módulo 12 aqui.....', course_id: 4 },
      { title: 'Coloque o título do módulo 13 aqui.....', course_id: 5 },
      { title: 'Coloque o título do módulo 14 aqui.....', course_id: 5 },
      { title: 'Coloque o título do módulo 15 aqui.....', course_id: 5 },
    ]);
    
    // Inserir lições
await queryInterface.bulkInsert('Lessons', [
  { title: 'Coloque o título da aula aqui.....', module_id: 1, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 1, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 2, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 2, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 3, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 3, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 4, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 4, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 5, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 5, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 6, content: content },
  { title: 'Coloque o título da aula aqui.....', module_id: 6, content: content },
]);
// Inserir usuários com cursos
const user1 = await UsersSequelize.create({
  name: 'Usuário 1',
  email: 'usuario1@email.com',
  password: bcrypt.hashSync('senha1', SALT_ROUNDS),
  country: 'Brasil',
  organization: '',
  role: 'STUDENT',
  confirmEmailToken: createEmailToken({ email: 'usuario1@email.com' }),
  createdAt: new Date(),
  updatedAt: new Date()
});

await UserCoursesSequelize.bulkCreate([
  { userId: user1.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 0, bookmarked: false, subscribed: false },
  { userId: user1.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2', courseId: 2, progress: 0, bookmarked: false, subscribed: false },
]);

const user2 = await UsersSequelize.create({
  name: 'Usuário 2',
  email: 'usuario2@email.com',
  password: bcrypt.hashSync('senha2', SALT_ROUNDS),
  country: 'Brasil',
  organization: '',
  role: 'STUDENT',
  confirmEmailToken: createEmailToken({ email: 'usuario2@email.com' }),
  createdAt: new Date(),
  updatedAt: new Date()
});

await UserCoursesSequelize.bulkCreate([
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 0, bookmarked: false, subscribed: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3', courseId: 3, progress: 0, bookmarked: false, subscribed: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4', courseId: 4, progress: 0, bookmarked: false, subscribed: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5', courseId: 5, progress: 0, bookmarked: false, subscribed: false },
]);

await PdfLessonSequelize.bulkCreate([
  { lessonId: 1, path: 'https://drive.google.com/file/d/1mbay_lgTisqZATHgBQ1T9OggS6zQlYZE/view?usp=sharing', title: '1984 - George Orwell' },
  { lessonId: 1, path: 'https://drive.google.com/file/d/1eJV94RpUvVR4EwbpujkkLc4HNF4twCTW/view?usp=sharing', title: 'Frederic Bastiat - A Lei' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/1cGOaIpsjeAiqisYaolJ-1fEzW9Dos3tV/view?usp=sharing', title: 'Machado de Assis - Memórias Póstumas de Brás Cubas' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/10TLXJ-F4sq_Y5HaCqhzs235TeOHOltIt/view?usp=sharing', title: 'Guerra e paz - Liev Tolstoi' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/1GCK1CjVT4aXqX6_4ZGCASZ4oQs74D8Kn/view?usp=sharing', title: 'Os Sertoes - Euclides Da Cunha' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/1RotwIy5l7S6sRXoJFhwjtpk4WgFv0vd0/view?usp=sharing', title: 'Box - Grandes obras de Dostoiévski' },
  { lessonId: 3, path: 'https://drive.google.com/file/d/1_RsBOYJMHfEd3VefG6R-akOh6nEo_g2c/view?usp=sharing', title: 'A Morte de Ivan Ilitch - Leon Tolstoi' },
  { lessonId: 3, path: 'https://drive.google.com/file/d/1WfqEn2dvoTsjALgwLiOaCWrYjQvNwnvI/view?usp=sharing', title: 'Dom Pedro II - A história não contada' },
]);

await WatchedLessonSequelize.bulkCreate([
  { lessonId: 1, userId: user1.id, moduleId: 1 ,watched: false },
  { lessonId: 2, userId: user1.id, moduleId: 1 ,watched: false },
  { lessonId: 1, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 2, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 3, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 4, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 5, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 6, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 7, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 8, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 9, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 10, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 11, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 12, userId: user2.id, moduleId: 1 ,watched: false },
]);

await ModulesProgressSequelize.bulkCreate([
  { userId: user1.id, courseId: 1 , moduleId: 1, progress: 0 },
  { userId: user1.id, courseId: 1 , moduleId: 2, progress: 0 },
  { userId: user1.id, courseId: 1 , moduleId: 3, progress: 0 },
  { userId: user2.id, courseId: 1 , moduleId: 1, progress: 0 },
  { userId: user2.id, courseId: 1 , moduleId: 2, progress: 0 },
  { userId: user2.id, courseId: 1 , moduleId: 3, progress: 0 },
  { userId: user1.id, courseId: 2 , moduleId: 4, progress: 0 },
  { userId: user1.id, courseId: 2 , moduleId: 5, progress: 0 },
  { userId: user1.id, courseId: 2 , moduleId: 6, progress: 0 },
]);
  },
  down: async (queryInterface: QueryInterface) => {
    // Deletar todos os dados
    await queryInterface.bulkDelete('Lessons', {});
    await queryInterface.bulkDelete('Modules', {});
    await queryInterface.bulkDelete('Courses', {});
    await queryInterface.bulkDelete('UserCourses', {});
    await queryInterface.bulkDelete('Users', {});
    await queryInterface.bulkDelete('LessonPdfs', {});
    await queryInterface.bulkDelete('WatchedLessons', {});
    await queryInterface.bulkDelete('ModulesProgress', {});
  },
};

