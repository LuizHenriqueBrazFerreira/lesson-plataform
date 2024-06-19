import { ILessonsModel } from '../interfaces/ILessons';
import LessonsSequelize from '../database/models/Lessons.model';

class LessonsModel implements ILessonsModel {
  private model = LessonsSequelize;

  async createLesson(moduleId: number, title: string, content: string, image: string, link: string) {
    
    const lesson = await this.model.create({ moduleId, title, content, image, link });

    return lesson;
  }

  async getLessons() {
    const lessons = await this.model.findAll();

    return lessons;
  }

  async getLessonById(id: number) {
    const lesson = await this.model.findByPk(id);

    return lesson;
  }

  async getLessonsByModuleId(moduleId: number) {
    const lesson = await this.model.findAll({ where: { moduleId } });

    return lesson;
  }

  async getLessonsByCourseId(courseId: number) {
    const lesson = await this.model.findAll({
      include: {
        association: 'module',
        where: { courseId },
      },
    });

    return lesson;
  }

  async updateLessonById(id: number, moduleId: number, title: string, content: string, image: string, link: string) {
    const lesson = await this.model.update({ moduleId, title, content, image, link }, { where: { id } });
    
    return lesson;
  }

  async deleteLessonById(id: number) {
    const lesson = await this.model.destroy({ where: { id } });

    return lesson;
  }
}       

export default LessonsModel;