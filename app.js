const path = require('path')
const express = require('express')
const errorController = require('./controllers/error')
const sequelize = require('./util/sequelize')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/car-item')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize
    .sync()
    .then(res => User.findByPk(1))
    .then(user => {
        if (!user) {
            return User.create({'name': 'Manuel', 'email': 'uocfi@jncfo.com'})
        }
        return user
    })
    .then(user => user.createCart())
    .then((res) => {
        app.listen(3306)
    })
    .catch(e => {
        console.log(e)   
    })
