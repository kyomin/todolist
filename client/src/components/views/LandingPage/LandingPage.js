import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage(props) {

    useEffect(() => {

    }, []);

    const onLogoutHandler = () => {
        axios.get('/api/user/logout')
        .then(res => {
            console.log('응답 데이터 : ', res.data);
            if(res.data.logoutSuccess) {
                alert('로그아웃 되었습니다.');
                props.history.push('/login');
            } else {
                alert('로그아웃에 실패했습니다.');
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>LandingPage</h2>

            <button onClick={onLogoutHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage;