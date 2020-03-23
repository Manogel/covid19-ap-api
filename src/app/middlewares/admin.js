export default async (req, res, next) => {
  if (req.userType === 'ADMIN') {
    return next();
  }
  return res.status(401).json({ error: 'Usuário não permitido!' });
};
