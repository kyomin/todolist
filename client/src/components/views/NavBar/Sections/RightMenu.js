import React, { useEffect, Fragment } from 'react';
import axios from 'axios';
import { Menu } from 'antd';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeFlag } from '../../../../_actions/todo_action';
import constants from '../../../../utils/constants';

const todoTypes = constants.todoTypes;

function RightMenu(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeFlag(todoTypes.TODO));   // 디폴트 탭 상태는 TODO이다.
    }, []);

    const onLogoutHandler = () => {
        axios.get('/api/user/logout')
        .then(res => {
            if(res.data.logoutSuccess) {
                alert('로그아웃 되었습니다.');
                props.history.push('/login');
            } else {
                alert('로그아웃에 실패했습니다.');
            }
        });
    }

    const onTodoStateHandler = (e) => {
        dispatch(changeFlag(e.currentTarget.getAttribute('value')));
    }

    // 로그인 한 사람들
    if(user.userData && user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="todo">
                    <a value={todoTypes.TODO} onClick={onTodoStateHandler}>todo</a>
                </Menu.Item>
                <Menu.Item key="doing">
                    <a value={todoTypes.DOING} onClick={onTodoStateHandler}>doing</a>
                </Menu.Item>
                <Menu.Item key="done">
                    <a value={todoTypes.DONE} onClick={onTodoStateHandler}>done</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={onLogoutHandler}>logout</a>
                </Menu.Item>
            </Menu>
        )
    } else {  // 로그인 안 한 사람들
        return (
        <Fragment></Fragment>
        )
    }
}

export default withRouter(RightMenu);