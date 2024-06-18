import { QueryInterface } from 'sequelize';
import UsersSequelize from '../models/Users.model';
import UserCoursesSequelize from '../models/UserCourses.model';
import PdfLessonSequelize from '../models/LessonPdfs.model';
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
  { title: 'Lição 1', module_id: 1, content: 'Conteúdo da lição 1', image: 'url_da_imagem_1', link: 'url_do_link_1' },
  { title: 'Lição 2', module_id: 1, content: 'Conteúdo da lição 2', image: 'url_da_imagem_2', link: 'url_do_link_2' },
  { title: 'Lição 1', module_id: 2, content: 'Conteúdo da lição 3', image: 'url_da_imagem_3', link: 'url_do_link_3' },
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
  { lessonId: 2, path: 'https://drive.google.com/file/d/1cGOaIpsjeAiqisYaolJ-1fEzW9Dos3tV/view?usp=sharing', title: 'Machado de Assis - Memórias Póstumas de Brás Cubas' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/10TLXJ-F4sq_Y5HaCqhzs235TeOHOltIt/view?usp=sharing', title: 'Guerra e paz - Liev Tolstoi' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/1GCK1CjVT4aXqX6_4ZGCASZ4oQs74D8Kn/view?usp=sharing', title: 'Os Sertoes - Euclides Da Cunha' },
  { lessonId: 2, path: 'https://drive.google.com/file/d/1RotwIy5l7S6sRXoJFhwjtpk4WgFv0vd0/view?usp=sharing', title: 'Box - Grandes obras de Dostoiévski' },
  { lessonId: 3, path: 'https://drive.google.com/file/d/1_RsBOYJMHfEd3VefG6R-akOh6nEo_g2c/view?usp=sharing', title: 'A Morte de Ivan Ilitch - Leon Tolstoi' },
  { lessonId: 3, path: 'https://drive.google.com/file/d/1WfqEn2dvoTsjALgwLiOaCWrYjQvNwnvI/view?usp=sharing', title: 'Dom Pedro II - A história não contada' },
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
  },
};

