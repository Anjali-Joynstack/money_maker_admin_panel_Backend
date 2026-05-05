const serverConfig = require("./server.config")

module.exports = {
  "development": {
    "username": serverConfig.DEVELOPMENT_DB.user,
    "password": serverConfig.DEVELOPMENT_DB.pass,
    "database": serverConfig.DEVELOPMENT_DB.name,
    "host": serverConfig.DEVELOPMENT_DB.host,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
