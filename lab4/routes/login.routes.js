const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')


router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu

    res.render('login', {
        linkActive: 'login',
        title: 'Login',
        err : req.session.err,
        user: req.session.user
    })

    //#######################################################

});

router.post('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika
    (async () => {

        let user = await User.fetchByUsername(req.body.user);

        if (user.id === undefined || user.id === null || !user.checkPassword(req.body.password)){
            res.render('login', {
                linkActive: 'login',
                title: 'Log in',
                err: 'User does not exist or invalid password.',
                user: req.session.user
            });
            return;
        }

        //sta je u useru..
        console.log(user);

        // povezivanje korisnika
        req.session.user = user;
        //redirectaj na osnovnu (valjda home) stranicu
        res.redirect('/');
    })();

    //#######################################################

});


module.exports = router;