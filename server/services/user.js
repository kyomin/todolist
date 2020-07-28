const bcrypt = require('bcrypt');
const saltRounds = 10;

const { User } = require('../models');

//=================================
//             User
//=================================

const encryptPassword = (password) => {
    return new Promise((res, rej) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) rej(err);
    
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) rej(err);
                
                res(hash);
            });
        });
    })
}

const registerUser = (req) => {
    return new Promise((res, rej) => {
        encryptPassword(req.body.password)
        .then((encryptedPassword) => {
            req.body.password = encryptedPassword;
            User.create(req.body)
            .then(() => {
                return res({ success: true });
            })
            .catch((err) => {
                return rej({ success: false, err });
            });
        })
        .catch((err) => {
            return rej({ success: false, err });
        });
    });
}

module.exports = {
    registerUser,
    findOneByEmail
};