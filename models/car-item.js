const Sequelize = require('sequelize')
const sequelize = require('../util/sequelize')

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: Sequelize.NUMBER
})

module.exports = CartItem