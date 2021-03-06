module.exports = {
    // JWT
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRES_IN: 86400, // 24(h) * 60(m) * 60(s)

    // DATABASE
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,

    FRONTEND_URL: process.env.FRONTEND_URL,

    // CACHE
    TTL: 43200, // 12(h) * 60(m) * 60(s)

}