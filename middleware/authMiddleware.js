const jwt = require('jsonwebtoken');



// const authMiddleware = (req, res, next) => {
//     let  token = req.header('Authorization');
//     console.log(token)
//     if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
      
//     token = token.split(' ')[1];
//     console.log(token)  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.userId = decoded.userId;  
//       console.log(req.userId)// Add userId to request object
//       next();
//     } catch (err) {
//       res.status(401).json({ msg: 'Token is not valid' });
//     }
//   };


const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Retrieve the Authorization header
    console.log(authHeader);  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the Bearer scheme

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Add userId to request object
        console.log(req.userId);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;


