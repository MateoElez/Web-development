const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');
//const authHandler = require('./helpers/auth-handler');


// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    //####################### ZADATAK #######################
    // prikaz košarice uz pomoć cart.ejs

    if(req.session.cart === undefined) //ako je prazan, ako ne postoji..
        req.session.cart = cart.createCart();

    res.render('cart', {
        title: 'Cart',
        linkActive: 'cart',
        cart: req.session.cart,
        user: req.session.user,
        err: undefined
    });
    
    //#######################################################
});


router.get('/add/:id', function (req, res, next) {
    //####################### ZADATAK #######################
    //dodavanje jednog artikla u košaricu

    //prvo dohvati id iz zadanog patha..    
    const id = req.params.id;

    (async () => {

        //uvik na pocetku provjeri postoji li opce kosarica stvorena
        if(req.session.cart === undefined)
            req.session.cart = cart.createCart();

        // kod dodavanja dodajemo 1 samo, pa je zadnji argument fje
        // quantity = 1
        await cart.addItemToCart(req.session.cart, id, 1);

        res.status(200).end();
    })();

    //#######################################################


});

router.get('/remove/:id', function (req, res, next) {
    //####################### ZADATAK #######################
    //brisanje jednog artikla iz košarice

    //prvo dohvati id iz zadanog patha..
    const id = req.params.id;

    (async () => {
        
        //isto pri uklanjanju uklanjas samo 1, pa je 
        // quantity = 1
        await cart.removeItemFromCart(req.session.cart, id, 1);

        res.status(200).end();

    })();
    
    //#######################################################


});



module.exports = router;