import PdfLessonService from "../services/PdfLesson.service";
import { Request, Response } from "express";
import mapStatusHttp from "../utils/mapHttp";
import { IPdfLessonController } from '../interfaces/ILessonPdfs';

class PdfLessonController implements IPdfLessonController {
  private service = new PdfLessonService();

  async insertPdf(req: Request, res: Response) {
    const { lessonTitle, path, title } = req.body;

    const { status, data } = await this.service.insertPdf(lessonTitle, path, title);

    return res.status(mapStatusHttp(status)).json(data);
  }

  async getPdfsByLessonId(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.service.getPdfsByLessonId(Number(id));

    return res.status(mapStatusHttp(status)).json(data);
  }

  async deletePdfByPath(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.service.deletePdfByPath(Number(id));

    return res.status(mapStatusHttp(status)).json(data);
  }

  async updatePdfByPath(req: Request, res: Response) {
    const { id, path, title } = req.body;

    const { status, data } = await this.service.updatePdfByPath(Number(id), path, title);

    return res.status(mapStatusHttp(status)).json(data);
  }
}

export default PdfLessonController;