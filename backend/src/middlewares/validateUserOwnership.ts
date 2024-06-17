import { Request, Response, NextFunction } from 'express';

function validateUserOwnership(req: Request, res: Response, next: NextFunction) {
  const userId = req.body.userId ?? req.params.userId;
  const id = req.user?.id;
  const role = req.user?.role;

  if (Number(userId) !== id && role !== 'ADMIN') {
    return res.status(401).json({ message: 'Acesso ao curso não autorizado', teste: userId ?? "ausente", id});
  }

  next();
}

export default validateUserOwnership;