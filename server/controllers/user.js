const userService = require('../services/user');

//=================================
//             User
//=================================

const registerUser = (req, res) => {
    userService.registerUser(req)
    .then((success) => {
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

module.exports = {
    registerUser
};