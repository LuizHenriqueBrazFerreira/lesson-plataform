import { IPdfLessonModel } from "../interfaces/ILessonPdfs";
import PdfLessonSequelize from "../database/models/LessonPdfs.model";
import { where } from 'sequelize';

class PdfLessonModel implements IPdfLessonModel {
  private model = PdfLessonSequelize;

  async insertPdf(lessonId: number, path: string, title: string) {
    const pdf = await this.model.create({ lessonId, path, title });

    return pdf;
  }

  async getPdfsByLessonId(lessonId: number) {
    const pdf = await this.model.findAll({ where: { lessonId } });

    if (!pdf.length) return [];
    
    return pdf;
  }

  async deletePdfByPath(id: number) {
    const pdf = await this.model.destroy({ where: { id } });

    return pdf;
  }

  async updatePdfByPath(id: number, path: string, title: string) {
    const pdf = await this.model.update({ path, title }, { where: { id } });

    return pdf;
  }
}

export default PdfLessonModel;