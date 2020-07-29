const userService = require('../services/user');

/* 인증 처리를 하는 곳 */
const auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 다음에 DB에서 유저를 찾는다.
    userService.findOneByToken(token)
    .then((user) => {   // 인증 성공!
        // 이렇게 넣어줌으로 인해서 /api/user/auth의 get에서 req 객체는 해당 값을 가지게 된다.
        req.token = token;
        req.user = user;
        next();    
    })
    .catch((err) => {   // 인증 실패!
        return res.json({ isAuth: false, message: err });
    });
}

module.exports = { auth };