import { QueryInterface } from 'sequelize';
import UsersSequelize from '../models/Users.model';
import UserCoursesSequelize from '../models/UserCourses.model';
import PdfLessonSequelize from '../models/LessonPdfs.model';
import WatchedLessonSequelize from '../models/WatchedLessons';
import ModulesProgressSequelize from '../models/ModulesProgress';
import { createEmailToken } from '../../utils/jwt';
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

export default {
  up: async (queryInterface: QueryInterface) => {
    // Inserir cursos
    await queryInterface.bulkInsert('Courses', [
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5' },
    ]);

    // Inserir módulos
    await queryInterface.bulkInsert('Modules', [
      { title: 'Módulo A', course_id: 1 },
      { title: 'Módulo B', course_id: 1 },
      { title: 'Módulo C', course_id: 1 },
      { title: 'Módulo D', course_id: 2 },
      { title: 'Módulo E', course_id: 2 },
      { title: 'Módulo F', course_id: 2 },
      { title: 'Módulo G', course_id: 3 },
      { title: 'Módulo H', course_id: 3 },
      { title: 'Módulo I', course_id: 3 },
      { title: 'Módulo J', course_id: 4 },
      { title: 'Módulo K', course_id: 4 },
      { title: 'Módulo L', course_id: 4 },
      { title: 'Módulo M', course_id: 5 },
      { title: 'Módulo N', course_id: 5 },
      { title: 'Módulo O', course_id: 5 },
    ]);
    
    // Inserir lições
await queryInterface.bulkInsert('Lessons', [
  { title: 'Lição 1', module_id: 1, content: 'Conteúdo da lição 1', image: 'https://static.todamateria.com.br/upload/pl/an/plano-de-aula-og.jpg', link: 'https://www.youtube.com/embed/3iQu3E59yqM?si=jGd4wzZGOy8-Xbk0' },
  { title: 'Lição 2', module_id: 1, content: 'Conteúdo da lição 2', image: 'https://blog.wittel.com/wp-content/uploads/2017/06/91098-sala-de-aula-virtual-entenda-o-conceito-para-treinamentos.jpg', link: 'https://www.youtube.com/embed/sTlzjFABmoA?si=MRdkRhVFcxQo6944' },
  { title: 'Lição 1', module_id: 2, content: 'Conteúdo da lição 3', image: 'url_da_imagem_3', link: 'https://www.youtube.com/embed/niRLEyu4qpg?si=i8OBpC73SuX2CSR5' },
  { title: 'Lição 2', module_id: 2, content: 'Conteúdo da lição 4', image: 'url_da_imagem_4', link: 'url_do_link_4' },
  { title: 'Lição 1', module_id: 3, content: 'Conteúdo da lição 5', image: 'url_da_imagem_5', link: 'url_do_link_5' },
  { title: 'Lição 2', module_id: 3, content: 'Conteúdo da lição 6', image: 'url_da_imagem_6', link: 'url_do_link_6' },
  { title: 'Lição 1', module_id: 4, content: 'Conteúdo da lição 7', image: 'url_da_imagem_7', link: 'url_do_link_7' },
  { title: 'Lição 2', module_id: 4, content: 'Conteúdo da lição 8', image: 'url_da_imagem_8', link: 'url_do_link_8' },
  { title: 'Lição 1', module_id: 5, content: 'Conteúdo da lição 9', image: 'url_da_imagem_9', link: 'url_do_link_9' },
  { title: 'Lição 2', module_id: 5, content: 'Conteúdo da lição 10', image: 'url_da_imagem_10', link: 'url_do_link_10' },
  { title: 'Lição 1', module_id: 6, content: 'Conteúdo da lição 11', image: 'url_da_imagem_11', link: 'url_do_link_11' },
  { title: 'Lição 2', module_id: 6, content: 'Conteúdo da lição 12', image: 'url_da_imagem_12', link: 'url_do_link_12' },
]);
// Inserir usuários com cursos
const user1 = await UsersSequelize.create({
  name: 'Usuário 1',
  email: 'usuario1@email.com',
  password: bcrypt.hashSync('senha1', SALT_ROUNDS),
  country: 'Brasil',
  organization: '',
  role: 'STUDENT',
  confirmEmailToken: createEmailToken({ email: 'usuario1@email.com' })
});

await UserCoursesSequelize.bulkCreate([
  { userId: user1.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 100, bookmarked: false },
  { userId: user1.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2', courseId: 2, progress: 20, bookmarked: false },
]);

const user2 = await UsersSequelize.create({
  name: 'Usuário 2',
  email: 'usuario2@email.com',
  password: bcrypt.hashSync('senha2', SALT_ROUNDS),
  country: 'Brasil',
  organization: '',
  role: 'STUDENT',
  confirmEmailToken: createEmailToken({ email: 'usuario2@email.com' })
});

await UserCoursesSequelize.bulkCreate([
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 100, bookmarked: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3', courseId: 3, progress: 50, bookmarked: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4', courseId: 4, progress: 15, bookmarked: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5', courseId: 5, progress: 0, bookmarked: false },
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
  { lessonId: 1, userId: user1.id, moduleId: 1 ,watched: true },
  { lessonId: 2, userId: user1.id, moduleId: 1 ,watched: false },
  { lessonId: 1, userId: user2.id, moduleId: 1 ,watched: true },
  { lessonId: 2, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 3, userId: user2.id, moduleId: 1 ,watched: true },
  { lessonId: 4, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 5, userId: user2.id, moduleId: 1 ,watched: true },
  { lessonId: 6, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 7, userId: user2.id, moduleId: 1 ,watched: true },
  { lessonId: 8, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 9, userId: user2.id, moduleId: 1 ,watched: true },
  { lessonId: 10, userId: user2.id, moduleId: 1 ,watched: false },
  { lessonId: 11, userId: user2.id, moduleId: 1 ,watched: true },
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

