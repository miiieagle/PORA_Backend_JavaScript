require("dotenv").config();



const PORT = process.env.PORT || 4000
const VERSION = process.env.VERSION
const PASSMAILER = process.env.PASSMAILER
const USER = process.env.USER
const SERVICE = process.env.SERVICE
const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI



module.exports = {
    PORT,
    VERSION,
    PASSMAILER,
    USER,
    SERVICE,
    JWT_SECRET,
    MONGODB_URI 
}