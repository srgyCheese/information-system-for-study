const { Sequelize, Model } = require('sequelize')

let sequelize = {}

switch (process.env.DB_DRIVER) {
    case 'MYSQL':
        sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql',
            define: {
              timestamps: false
            },
            logging: process.env.NODE_ENV === 'production' ? false : console.log
        })
        break
    case 'SQLITE':
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'sqlite/database.sqlite',
            define: {
              timestamps: false
            },
            logging: process.env.NODE_ENV === 'production' ? false : console.log
        });
        break
    default:
        throw new Error('DB driver not supported')
}

const fs = require('fs');

const models = []

fs.readdirSync('./models').forEach(file => {
    if (file == 'sequelize.js') {
        return 
    }

    models.push(require('./' + file)(sequelize))
})

models.map(fn => fn.prototype instanceof Model ? fn : fn())

module.exports = sequelize