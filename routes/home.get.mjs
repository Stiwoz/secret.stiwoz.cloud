import path from 'path';

export default function (_req, res, next) {
  try {
    const index = path.join(path.resolve(''), 'views/home.html');
    return res.status(200).sendFile(index);
  } catch (error) {
    next(error);
  }
}
