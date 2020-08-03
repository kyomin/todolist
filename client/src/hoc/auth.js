import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

/*
    매개변수 adminRoute의 기본값을 null로 정의. 인자로 안 넘겨주면 디폴트로 null을 갖는다.
    option == null  => 아무나 출입이 가능한 페이지 (LoginPage 등등)
    option == ture  => 로그인한 유저만 출입이 가능한 페이지 (LandingPage 등등)
    option == false => 로그인한 유저는 출입이 불가능한 페이지 (RegisterPage, LoginPage 등등)
*/
export default function(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())
            .then(res => {
                // 로그인하지 않은 상태
                if(!res.payload.isAuth) {
                    // 로그안 안 했는데, 로그인한 유저만 출입이 가능한 페이지로 들어왔다면
                    if(option) {
                        props.history.push('/login');
                    }
                } else {        // 로그인 한 상태
                    // 로그인을 했는데 로그인 페이지나 회원가입 페이지로 들어왔다면
                    if(!option) {
                        props.history.push('/');
                    }
                }
            })
        }, []);

        // 위의 인증을 다 거친 경우에만 해당 컴포넌트를 랜딩한다.
        return (
            <SpecificComponent />
        );
    }

    return AuthenticationCheck;
}