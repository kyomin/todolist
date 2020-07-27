const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { User } = require('../models');

//=================================
//             User
//=================================

router.post('/register', (req, res) => {
    // 평문의 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return res.json({ success: false, err });

        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err) return res.json({ success: false, err });

            req.body.password = hash;
        
            User.create(req.body)
            .then(() => {
                return res.json({ success: true });
            })
            .catch((err) => {
                return res.json({ success: false, err });
            });
        })
    });
});

module.exports = router;