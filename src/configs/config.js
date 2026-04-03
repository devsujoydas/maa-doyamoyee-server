require("dotenv").config();

exports.PORT = process.env.PORT
exports.MONGO_URI = process.env.MONGO_URI

exports.FRONTEND_URL = process.env.FRONTEND_URL

exports.EMAIL_USER = process.env.EMAIL_USER 
exports.EMAIL_PASS = process.env.EMAIL_PASS

exports.CLOUD_NAME = process.env.CLOUD_NAME
exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY
exports.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET

exports.JWT_SECRET = process.env.JWT_SECRET 
exports.ACCESS_TOKEN_EXPIRESIN = process.env.ACCESS_TOKEN_EXPIRESIN 
exports.REFRESH_TOKEN_EXPIRESIN = process.env.REFRESH_TOKEN_EXPIRESIN 

