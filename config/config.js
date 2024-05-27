const dotenv = require('dotenv');
dotenv.config();

module.exports = {  
    jwtSecret: process.env.JWT_SECRET || '4ffdf524ac7c4bbe16279e12ebdbf4463f5ee82e23c0b08edf59d6a09a54c0a46eb8bf07ca5ee989be01b14163ac1e3ada3f431173cae27a4482b4bf8dfb3f75',
    databaseUrl : process.env.DATABASE_URL,
    port : process.env.PORT || 5000,
    emailUser : process.env.EMAIL_USER,
    emailPassword : process.env.EMAIL_PASSWORD,
    emailFrom : process.env.EMAIL_FROM
    
};