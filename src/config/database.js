const dotenv = require("dotenv")
const operation = dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });

if (operation.error) {
    throw new Error(`Verify that .env file exists in the env folder and if the file format is equal to env/.env.example`);
}

module.exports={
    dialect:'postgres',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    define:{
      timestamp:true,
      underscored:true,
      underscoreAll:true
    }
  }