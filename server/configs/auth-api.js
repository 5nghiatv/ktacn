const jwt = require('jsonwebtoken')
//const config = require("config");

module.exports = function (req, res, next) {
  if (
    '/api/testdb -/api/connects -/api/login -/api/register -/users/login -/users/register'.includes(
      req.originalUrl,
    )
  ) {
    //console.log(req.originalUrl)
    //console.log(req.body.email)
    next()
  } else {
    // console.log(req.body.email)
    //get the token from the header if present
    const token = req.headers['x-access-token'] || req.headers['authorization']
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send('Access denied. No token provided.')
    //console.log("token : "+ token);
    try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
      req.user = decoded
      next()
    } catch (ex) {
      //if invalid token
      res.status(400).send('Invalid token.')
    }
  }
}
