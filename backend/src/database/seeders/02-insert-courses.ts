import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    // Inserir cursos
    await queryInterface.bulkInsert('Courses', [
      { title: 'Curso 1' },
      { title: 'Curso 2' },
      { title: 'Curso 3' },
    ]);

    // Inserir módulos
    await queryInterface.bulkInsert('Modules', [
      { title: 'Módulo 1', course_id: 1 },
      { title: 'Módulo 2', course_id: 1 },
      { title: 'Módulo 1', course_id: 2 },
      { title: 'Módulo 2', course_id: 2 },
      { title: 'Módulo 1', course_id: 3 },
      { title: 'Módulo 2', course_id: 3 },
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
  },

  down: async (queryInterface: QueryInterface) => {
    // Deletar todos os dados
    await queryInterface.bulkDelete('Lessons', {});
    await queryInterface.bulkDelete('Modules', {});
    await queryInterface.bulkDelete('Courses', {});
  },
};