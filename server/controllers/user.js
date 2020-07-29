const userService = require('../services/user');

//=======================================
//             User Controller
//=======================================

const registerUser = (req, res) => {
    userService.registerUser(req)
    .then((success) => {
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

const loginUser = (req, res) => {
    // 1. 요청된 이메일이 DB에 있는지 찾는다 => 없는 경우에만 실패 메시지를 클라이언트에 응답으로 보낸다.
    userService.findOneByEmail(req.body.email)
    .catch((fail) => {
        res.json(fail);
    });

    // 2. 이메일이 DB에 있으면 비밀번호가 맞는지 확인한다.
    userService.confirmPassword(req.body.email, req.body.password)
    .then((success) => {
        // 3. 로그인 과정을 마쳤다면 최종적으로 토큰을 이용해 쿠키를 생성한다.
        res.cookie("x_auth", success.token)
        .status(200)
        .json({
            loginSuccess: true,
            userId: success.id
        });
    })
    .catch((fail) => {
        res.json(fail);
    });
}

const authUser = (req, res) => {
    /*
        이 곳으로 진입했다면 auth 미들웨어를 통과해 왔다는 얘기이다.
        즉, 토큰을 이용한 인증처리가 완료된 것이다.
    */
   res.status(200).json({auth: true, user: req.user});
}

const logoutUser = (req, res) => {
    userService.deleteToken(req.user.id)
    .then((success) => {
        res.status(200).json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

module.exports = {
    registerUser,
    loginUser,
    authUser,
    logoutUser
};