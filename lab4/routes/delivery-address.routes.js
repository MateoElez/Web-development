const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel');
const { route } = require('./cart.routes');
const authHandler = require('./helpers/auth-handler');
const cartExistence = require('./helpers/cart-existence');



router.get('/', authHandler, function (req, res, next) {

    // if(req.session.cart === undefined) //ako je prazan, ako ne postoji..
    //     req.session.cart = cart.createCart();

    res.render('delivery-address', {
        title: 'Delivery Address',
        linkActive: 'cart',
        cart: req.session.cart,
        user: req.session.user,
        delivery: req.session.delivery,
        err: undefined
    });
    
    //#######################################################
});

router.post('/saveAndReturn', authHandler, function(req,res, next) {
    //(async () => {
        req.session.delivery = req.body;
        console.log(req.session.delivery);
        res.redirect('/cart');
    //})();
});

router.post('/reset', authHandler, function(req,res, next) {
    //(async () => {
        req.session.delivery = undefined;
        res.redirect('/delivery-address');
    //})();
});

router.post('/checkout', authHandler, function(req, res, next) {
    //(async () => {
        res.redirect('/checkout');
    //})();
})

module.exports = router;
