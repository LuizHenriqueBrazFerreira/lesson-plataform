import { Request, Response, NextFunction } from 'express';

function validateUserOwnership(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;
  const id = req.user?.id;

  if (Number(userId) !== id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}

export default validateUserOwnership;