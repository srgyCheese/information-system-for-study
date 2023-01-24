const Sequelize = require('sequelize')

let sequelize = {}

switch (process.env.DB_DRIVER) {
    case 'MYSQL':
        sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        })
        break
    case 'SQLITE':
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'sqlite/database.sqlite'
        });
        break
    default:
        throw new Error('DB driver not supported')
}

const fs = require('fs')

const models = {}

fs.readdirSync('./models').forEach(file => {
    if (file == 'sequelize.js') {
        return 
    }

    models[file.substring(0, file.length - 3)] = require('./' + file)(sequelize)
})

module.exports = sequelize