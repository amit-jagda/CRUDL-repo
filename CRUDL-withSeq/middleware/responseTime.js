function responseTime(req, res, next) {
  enteredTime = Date.now();
  console.log(`${req.method} : ${req.url}`);
  //call the next funciton
  next();
  // executed after get/post
  exitingTime = Date.now();
  console.log(`request took: ${exitingTime - enteredTime} miliseconds `);
}

module.exports = responseTime;
