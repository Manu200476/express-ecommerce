const Sequelize = require('sequelize')
const sequelize = require('../util/sequelize')

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: Sequelize.NUMBER
})

module.exports = OrderItem