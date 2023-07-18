// const errorhandler=(err,req,res,next)=>{
//       const statusCode=res.statusCode ? res.statusCode:500;
//       //converting the error from html error to 
//       //json
//       res.json({
//         title:"Not found",
//         message:err.message,
//         stackTrace:err.stack
//       });
// }

// module.exports = errorhandler;
const {constants} =require("../constants")
const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
      case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack
      });
      break;
      case constants.UNAUTHORIZED:
        res.json({
          title: "unauthorizef",
          message: err.message,
          stackTrace: err.stack
        });
        break;

      case constants.FORBIDDEN:
          res.json({
            title: "forbidden",
            message: err.message,
            stackTrace: err.stack
          });
       break;
       case constants.VALIDATION_ERROR:
      res.json({
        title: "validation error",
        message: err.message,
        stackTrace: err.stack
      });
      break; 
      case constants.SERVER_ERROR:
        res.json({
          title: "server error",
          message: err.message,
          stackTrace: err.stack
        });
        break; 
  
    default:
      console.log("no error");
      break;
  }


    // Convert the error to JSON
    
  }
  
  module.exports = errorhandler;
  