const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
//'users' from this file models/User.js - module.exports = User = mongoose.model('users', UserSchema);
const User = mongoose.model('users');
//const keys = require('../config/keys');
const secretKey = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretKey.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(
            options,
            (jwt_payload, done) => {
                //console.log('jwt_payload', jwt_payload);
               /* RES:
                * jwt_payload 
                * { 
                *   id: '5be79bda6eac2e3a0d7fdcc3',
                *   name: 'baymax',
                *   avatar: '*www.gravatar.com/avatar/68e88327558153ac0d014d69b928d27d?s=200&r=pg&d=mm',
                *   iat: 1541915163,
                *   exp: 1541918763 
                * }
                */
            User
                .findById(jwt_payload.id)
                .then(
                    user => {
                        if(user) {
                            return done(null, user);
                        }
                        return done(null, false);
                    }
                )
                .catch(err => console.log('Error User: ', err));

            }
        )
    );
};















