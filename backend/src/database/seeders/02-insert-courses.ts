import { QueryInterface } from 'sequelize';
import UsersSequelize from '../models/Users.model';
import UserCoursesSequelize from '../models/UserCourses.model';
import PdfLessonSequelize from '../models/LessonPdfs.model';
import WatchedLessonSequelize from '../models/WatchedLessons';
import ModulesProgressSequelize from '../models/ModulesProgress';
import { createEmailToken } from '../../utils/jwt';
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

const content = `Em geral, para funções com um valor de entrada pequeno, não costumamos nos importar com a eficiência do algoritmo.

Entretanto, quando nossa função tiver que lidar com valores de entrada muito grandes, por exemplo: mil valores ao mesmo tempo? Ou quem sabe milhões de valores? Nesses casos, a eficiência do que estamos fazendo torna-se importante e nós, pessoas desenvolvedoras, precisamos ser capazes de lidar com esses cenários!

⚠️ Aviso: Embora pareça que estamos falando de quantidades irreais, há uma série de exemplos que comprovam que problemas gerados por entradas de dados grandiosas são bastante comuns.

O famoso Discord, por exemplo, já enfrentou a demanda de ordenar alfabeticamente uma lista de amigos com até 250.000 pessoas. E você sabe o tempo máximo que o algoritmo tinha pra rodar? Menos de um segundo e meio! Um desafio e tanto que pôde ser solucionado com o conhecimento sobre Algoritmos.

De olho na dica 👀: Esse conhecimento é tão importante no mundo da tecnologia, que as famosas Big Techs como: Google, Amazon e Facebook, fazem processos seletivos nos quais a capacidade de fazer esse tipo de análise é obrigatória.

Em suma, quando cresce a escala, esse conhecimento se torna essencial. E com esse conhecimento você vai perceber a existência de certos tipos de problemas que ainda não têm solução, mesmo reunindo toda a capacidade computacional do planeta.

⚠️ Aviso: Parece exagero? Mas acredite, não é. Vamos seguir para o conteúdo e isso ficará mais nítido para você. 🙂`;

export default {
  up: async (queryInterface: QueryInterface) => {
    // Inserir cursos
    await queryInterface.bulkInsert('Courses', [
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', forum: 'www.google.com' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2', forum: 'www.google.com' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3', forum: 'www.google.com' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4', forum: 'www.google.com' },
      { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5', forum: 'www.google.com' },
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
  { title: 'Coloque o título da aula aqui.....', module_id: 1, content: content, image: 'https://static.todamateria.com.br/upload/pl/an/plano-de-aula-og.jpg', link: 'https://www.youtube.com/embed/3iQu3E59yqM?si=jGd4wzZGOy8-Xbk0' },
  { title: 'Coloque o título da aula aqui.....', module_id: 1, content: content, image: '', link: 'https://www.youtube.com/embed/sTlzjFABmoA?si=MRdkRhVFcxQo6944' },
  { title: 'Coloque o título da aula aqui.....', module_id: 2, content: content, image: 'url_da_imagem_3', link: 'https://www.youtube.com/embed/niRLEyu4qpg?si=i8OBpC73SuX2CSR5' },
  { title: 'Coloque o título da aula aqui.....', module_id: 2, content: content, image: 'url_da_imagem_4', link: 'url_do_link_4' },
  { title: 'Coloque o título da aula aqui.....', module_id: 3, content: content, image: 'url_da_imagem_5', link: 'url_do_link_5' },
  { title: 'Coloque o título da aula aqui.....', module_id: 3, content: content, image: 'url_da_imagem_6', link: 'url_do_link_6' },
  { title: 'Coloque o título da aula aqui.....', module_id: 4, content: content, image: 'url_da_imagem_7', link: 'url_do_link_7' },
  { title: 'Coloque o título da aula aqui.....', module_id: 4, content: content, image: 'url_da_imagem_8', link: 'url_do_link_8' },
  { title: 'Coloque o título da aula aqui.....', module_id: 5, content: content, image: 'url_da_imagem_9', link: 'url_do_link_9' },
  { title: 'Coloque o título da aula aqui.....', module_id: 5, content: content, image: 'url_da_imagem_10', link: 'url_do_link_10' },
  { title: 'Coloque o título da aula aqui.....', module_id: 6, content: content, image: 'url_da_imagem_11', link: 'url_do_link_11' },
  { title: 'Coloque o título da aula aqui.....', module_id: 6, content: content, image: 'url_da_imagem_12', link: 'url_do_link_12' },
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
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 0, bookmarked: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3', courseId: 3, progress: 0, bookmarked: false },
  { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4', courseId: 4, progress: 0, bookmarked: false },
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

