import PdfLessonController from "../controller/PdfLesson.controller";
import { Router } from 'express'
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import validateAdmin from '../middlewares/validateAdmin';
import validateLessonAccess from '../middlewares/validateLessonAccess';

const pdfLessonRouter = Router()
const pdfLessonController = new PdfLessonController()

pdfLessonRouter.post('/pdfs',  validateToken, validateAdmin, (req: Request, res: Response) => pdfLessonController.insertPdf(req, res))
pdfLessonRouter.get('/pdfs/:lessonId',  validateToken, validateLessonAccess, (req: Request, res: Response) => pdfLessonController.getPdfByLessonId(req, res))
pdfLessonRouter.delete('/pdfs/:path',  validateToken, validateAdmin, (req: Request, res: Response) => pdfLessonController.deletePdfByPath(req, res))
pdfLessonRouter.put('/pdfs/:path',  validateToken, validateAdmin, (req: Request, res: Response) => pdfLessonController.updatePdfByPath(req, res))

export default pdfLessonRouter;