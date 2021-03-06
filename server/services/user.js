const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const { User } = require('../models');

//=======================================
//             User Service
//=======================================

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) reject(err);
    
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) reject(err);
                
                resolve(hash);
            });
        });
    });
}

const registerUser = (req) => {
    return new Promise((resolve, reject) => {
        encryptPassword(req.body.password)
        .then((encryptedPassword) => {
            req.body.password = encryptedPassword;
            User.create(req.body)
            .then(() => {
                return resolve({ success: true });
            })
            .catch((err) => {
                return reject({ success: false, message: err.errors[0].message });
            });
        })
        .catch((err) => {
            return reject({ success: false, err });
        });
    });
}

const findOneByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: {email: email} })
        .then((user) => {
            if(!user) {
                reject({
                    loginSuccess: false,
                    message: "해당 이메일의 가입 정보가 없습니다"
                });
            }
            resolve(user.dataValues);
        })
        .catch((err) => {
            reject({
                loginSuccess: false,
                message: err
            });
        });
    });
}

const confirmPassword = (email, plainPassword) => {
    return new Promise((resolve, reject) => {
        findOneByEmail(email)
        .then((user) => {
            bcrypt.compare(plainPassword, user.password, function(err, result) {
                if(err) {
                    reject({
                        loginSuccess: false,
                        message: err
                    });
                }

                if(!result) {
                    reject({
                        loginSuccess: false,
                        message: "비밀번호가 일치하지 않습니다"
                    });
                }

                createToken(email)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
            });
        });
    });
}

const createToken = (email) => {
    return new Promise((resolve, reject) => {
        // email + 'secretToken' = token이 되고, 추후에 'secretToken'을 이용해 email을 뽑아낸다.
        let token = jwt.sign(email, 'secretToken');

        // DB에 토큰 값을 넣어준다.
        User.update({ token: token }, { where: {email: email} })
        .then((id) => {
            resolve({
                id: id[0],
                token
            });
        })
        .catch(() => {
            reject({
                loginSuccess: false,
                message: "토큰 생성에 실패했습니다."
            });
        });
    });
}

const findOneByToken = (token) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: {token: token} })
        .then((user) => {
            if(!user) {
                reject("로그인 하십시오!");
            }
            resolve(user.dataValues);
        })
        .catch(() => {
            reject("로그인 하십시오!");
        });
    });
}

const deleteToken = (id) => {
    return new Promise((resolve, reject) => {
        User.update({ token: "" }, { where: {id: id} })
        .then(() => {
            resolve({ logoutSuccess: true });
        })
        .catch(() => {
            reject({ logoutSuccess: false });
        });
    });
}

const updateUser = (id, password) => {
    return new Promise((resolve, reject) => {
        encryptPassword(password)
        .then((encryptedPassword) => {
            User.update({ password: encryptedPassword }, { where: {id: id} })
            .then(() => {
                resolve({ updateSuccess: true });
            })
            .catch(() => {
                reject({
                    updateSuccess: false,
                    message: "비밀번호 업데이트에 실패했습니다."
                });
            });
        })
        .catch(() => {
            return reject({
                updateSuccess: false,
                message: "비밀번호 업데이트에 실패했습니다."
            });
        });
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.destroy({ where: {id: id} })
        .then(() => {
            resolve({ deleteSuccess: true });
        })
        .catch(() => {
            reject({ deleteSuccess: false });
        });
    });
}

module.exports = {
    registerUser,
    findOneByEmail,
    confirmPassword,
    findOneByToken,
    deleteToken,
    updateUser,
    deleteUser
};