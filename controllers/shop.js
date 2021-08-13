const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {})
    .catch(e => console.log(e))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findByPk(prodId).then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: product.title,
      path: '/products'
    })
  }).catch(e => console.log(e))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(e => console.log(e))
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products
          })
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchedCart
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart
      cart.getProducts({ where: { id: prodId } })
    })
    .then(product => {
      const newQuantity = 1
      const newProduct = product[0]
      fetchedCart.addProduct(newProduct, {through: {quantity: newQuantity}})
    })
    .catch(e => console.log(e))
  
  res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
