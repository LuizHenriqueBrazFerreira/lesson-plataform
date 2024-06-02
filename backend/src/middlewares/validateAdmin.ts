import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapHttp';


const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;

  if (role !== 'ADMIN') {
    const data = { message: 'Você não tem permissão para acessar esta rota.' };
    return res.status(mapStatusHTTP('FORBIDDEN')).json(data);
  }

  next();
}

export default checkAdminRole;