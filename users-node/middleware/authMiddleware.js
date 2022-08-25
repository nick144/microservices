const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/config");

const protect = (req, res, next) => {
    if (req.user) {
        return next();
    }
    
    const {user} = req.session;

    if (!user) {
        return res.status(401).json({status: 'fail', message: 'unauthorizes'})
    }

    req.user = user

    next();
}

module.exports = protect;


const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["Authorization"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    token = token.split(' ');
    try {
      const decoded = jwt.verify(token[1], TOKEN_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send({status: 0, message: 'Invalid Token'});
    }
    return next();
  };
  
  module.exports = verifyToken;