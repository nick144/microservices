const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/config");

// const protect = (req, res, next) => {
//     if (req.user) {
//         return next();
//     }
//     console.log(req.session);
//     const user = req.session.user;

//     if (!user) {
//         return res.status(401).json({status: 'fail', message: 'unauthorizes'})
//     }

//     req.user = user

//     next();
// }

// module.exports = protect;


const verifyToken = (req, res, next) => {
    let token =
      req.body.token || req.query.token || req.headers["authorization"];
  
    if (!token) {
      return res.status(403).json({status: 0, message: 'A token is required for authentication'});
    }
    token = token.split(' ');
      
    try {
      const decoded = jwt.verify(token[1], TOKEN_SECRET);
      req.user = decoded;
      req.session.user = decoded;
    } catch (err) {
      return res.status(401).json({status: 0, message: err});
    }
    return next();
  };
  
  module.exports = verifyToken;