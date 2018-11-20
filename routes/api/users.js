const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/keys');
const passport = require('passport');

// Load Input Validation - Server/Backend side
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model || Schema
const User = require('../../models/User');

 /*
 * @route   GET api/users/test
 * @desc    Tests user route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({
    msg: "This is Users Test Routes!!!!"
}));

 /*
 * @route   GET api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

 /*
 * @route   GET api/users/login
 * @desc    Login User / Returning JQT Token
 * @access  Public
 */
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                errors.email = 'User not found.';
                return res.status.apply(404).json(errors);
            }

            // Check password
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //res.json({ msg: 'Password is Matched. Success' });
                        // User Macthed
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }//create JWT payload

                        // Sign Token
                        jwt.sign(
                            payload, 
                            secretKey.secretKey, 
                            { 
                                expiresIn: 3600// an hour
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token 
                                });
                            }
                        );
                    

                    } else {
                        //return res.status(400).json({ password: 'Password not Macthed!' });
                        errors.password = 'Password is not correct';
                        return res.status(400).json(errors);
                    }
                })


        });//User.findOne
});


 /*
 * @route   GET api/users/current
 * @desc    Return current user
 * @access  Private
 */
router.get('/current', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        //res.json({ msg: 'Current User Success!' });

        //if authentiated display 
    
       /* res.json( req.user );
        * RES: 
        * {
        *     "_id": "5be79bda6eac2e3a0d7fdcc3",
        *     "name": "baymax",
        *     "email": "baymax@noemail.com",
        *     "avatar": "*www.gravatar.com/avatar/68e88327558153ac0d014d69b928d27d?s=200&r=pg&d=mm",
        *     "password": "$2a$10$GGKuRTs3qqrJM6.oz0HMX.iRGDXQ5yoCO6PqkrNpwjyDhg0RPEKly",
        *     "date": "2018-11-11T03:02:50.091Z",
        *     "__v": 0
        * }
        */ 
       res.json({
           id: req.user.id,
           name: req.user.name,
           email: req.user.email
       });
       /* RES:
        *  {
        *       "id": "5be79bda6eac2e3a0d7fdcc3",
        *       "name": "baymax",
        *       "email": "baymax@noemail.com"
        *  }
        */
    }
);

module.exports = router;