import path from 'path';

export default function (_req, res, next) {
  try {
    const index = path.join(path.resolve(''), 'views/home.html');
    res.setHeader("Link", `</style.css>; rel="stylesheet"`);
    return res.status(200).sendFile(index);
  } catch (error) {
    next(error);
  }
}
