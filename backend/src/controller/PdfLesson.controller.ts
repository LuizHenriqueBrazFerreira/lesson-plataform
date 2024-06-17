import PdfLessonService from "../services/PdfLesson.service";
import { Request, Response } from "express";
import mapStatusHttp from "../utils/mapHttp";
import { IPdfLessonController } from '../interfaces/ILessonPdfs';

class PdfLessonController implements IPdfLessonController {
  private service = new PdfLessonService();

  async insertPdf(req: Request, res: Response) {
    const { lessonId, path } = req.body;

    const { status, data } = await this.service.insertPdf(lessonId, path);

    return res.status(mapStatusHttp(status)).json(data);
  }

  async getPdfByLessonId(req: Request, res: Response) {
    const { lessonId } = req.params;

    const { status, data } = await this.service.getPdfByLessonId(Number(lessonId));

    return res.status(mapStatusHttp(status)).json(data);
  }

  async deletePdfByPath(req: Request, res: Response) {
    const { path } = req.params;

    const { status, data } = await this.service.deletePdfByPath(path);

    return res.status(mapStatusHttp(status)).json(data);
  }

  async updatePdfByPath(req: Request, res: Response) {
    const { path } = req.params;

    const { status, data } = await this.service.updatePdfByPath(path);

    return res.status(mapStatusHttp(status)).json(data);
  }
}

export default PdfLessonController;