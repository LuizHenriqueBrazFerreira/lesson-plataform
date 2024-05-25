"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_model_1 = __importDefault(require("../models/Users.model"));
const UserCourses_model_1 = __importDefault(require("../models/UserCourses.model"));
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        // Inserir cursos
        yield queryInterface.bulkInsert('Courses', [
            { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento' },
            { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2' },
            { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3' },
            { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4' },
            { title: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5' },
        ]);
        // Inserir módulos
        yield queryInterface.bulkInsert('Modules', [
            { title: 'Módulo 1', course_id: 1 },
            { title: 'Módulo 2', course_id: 1 },
            { title: 'Módulo 1', course_id: 2 },
            { title: 'Módulo 2', course_id: 2 },
            { title: 'Módulo 1', course_id: 3 },
            { title: 'Módulo 2', course_id: 3 },
        ]);
        // Inserir lições
        yield queryInterface.bulkInsert('Lessons', [
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
        const user1 = yield Users_model_1.default.create({
            name: 'Usuário 1',
            email: 'usuario1@email.com',
            password: 'senha1',
            role: 'STUDENT',
        });
        yield UserCourses_model_1.default.bulkCreate([
            { userId: user1.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 100, bookmarked: false },
            { userId: user1.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 2', courseId: 2, progress: 20, bookmarked: false },
        ]);
        const user2 = yield Users_model_1.default.create({
            name: 'Usuário 2',
            email: 'usuario2@email.com',
            password: 'senha2',
            role: 'STUDENT',
        });
        yield UserCourses_model_1.default.bulkCreate([
            { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento', courseId: 1, progress: 100, bookmarked: false },
            { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 3', courseId: 3, progress: 50, bookmarked: false },
            { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 4', courseId: 4, progress: 15, bookmarked: false },
            { userId: user2.id, courseTitle: 'Sistemas Universais das Proteções Sociais no Âmbito do Direito ao Desenvolvimento 5', courseId: 5, progress: 0, bookmarked: false },
        ]);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        // Deletar todos os dados
        yield queryInterface.bulkDelete('Lessons', {});
        yield queryInterface.bulkDelete('Modules', {});
        yield queryInterface.bulkDelete('Courses', {});
    }),
};
