import { IPdfLessonModel } from "../interfaces/ILessonPdfs";
import PdfLessonSequelize from "../database/models/LessonPdfs.model";

class PdfLessonModel implements IPdfLessonModel {
  private model = PdfLessonSequelize;

  async insertPdf(lessonId: number, path: string) {
    const pdf = await this.model.create({ lessonId, path });

    return pdf;
  }

  async getPdfByLessonId(lessonId: number) {
    const pdf = await this.model.findByPk(lessonId);

    return pdf;
  }

  async deletePdfByPath(path: string) {
    const pdf = await this.model.destroy({ where: { path } });

    return pdf;
  }

  async updatePdfByPath(path: string) {
    const pdf = await this.model.update({ path }, { where: { path } });

    return pdf;
  }
}

export default PdfLessonModel;