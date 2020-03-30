const { paths, authorization } = require('ftauth');

module.exports = (req, res, next) => {

  if (!req.userId){
    return next();
  }

  const pathExist = paths.checkPath(req.originalUrl, req.method);
  if (authorization.getCurrentRole().toLowerCase() === 'user' && pathExist.roles.includes('Profile')){
    if (req.query.id == req.userId){
      return next();
    }else{
      return res.status(403).json({ status: 403, message: 'Unauthorized' });
    }
  }
  return next();
};