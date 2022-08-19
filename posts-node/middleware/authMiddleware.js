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
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({status: 0, message: 'A token is required for authentication'});
    }
    console.log(token, TOKEN_SECRET);
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      req.user = decoded;
      req.session.user = decoded;
    } catch (err) {
      return res.status(401).json({status: 0, message: err});
    }
    return next();
  };
  
  module.exports = verifyToken;