import 'dotenv/config'; // Forma moderna de llamar a .config()

const config = {
    app: {
        port: process.env.PORT || 4000
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'sarmiento',
        database: process.env.MYSQL_DB || 'FanaticBD'
    }
};

export default config;