import { Router } from 'express'
import { Request, Response } from 'express';
import { validateToken } from '../middlewares/validateLogin';
import validateAdmin from '../middlewares/validateAdmin';
import { SearchBarController } from '../controller/SearchBar.controller';

const searchBarRouter = Router()
const searchBarController = new SearchBarController()

searchBarRouter.get('/search', async (req: Request, res: Response) => {
  await searchBarController.requestSearch(req, res)
})

export default searchBarRouter;