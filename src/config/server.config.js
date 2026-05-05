const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 4000,
    DEVELOPMENT_DB: {
        host: process.env.DEVELOPMENT_HOST,
        user: process.env.DEVELOPMENT_USERNAME,
        pass: process.env.DEVELOPMENT_PASSWORD,
        name: process.env.DEVELOPMENT_DATABASE,
        // port: process.env.DEVELOPMENT_PORT,
    },
    // REDIS: {
    //     host: process.env.REDIS_HOST,
    //     password: process.env.REDIS_PASSWORD,
    //     port: process.env.REDIS_PORT
    // },
    //   ADMIN: {
    //     ADMIN_CLIENT_SECRET: process.env.ADMIN_CLIENT_SECRET,
    //     ADMIN_CLIENT_ID: process.env.ADMIN_CLIENT_ID,
    //     ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY
    //   }
};