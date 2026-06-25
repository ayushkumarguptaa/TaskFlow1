// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     const token =
//       req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized"
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();
//   } catch (error) {
//     res.status(401).json({
//       message: "Invalid Token"
//     });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log(req.cookies);

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};