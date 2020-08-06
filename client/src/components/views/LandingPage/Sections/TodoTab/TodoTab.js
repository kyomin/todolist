import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeFlag } from '../../../../../_actions/todo_action';
import constants from '../../../../../utils/constants';

import './TodoTab.scss';

const todoTypes = constants.todoTypes;

function TodoTab() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeFlag(todoTypes.TODO));   // 디폴트 탭 상태는 TODO이다.
    }, []);

    const onTodoStateHandler = (e) => {
        dispatch(changeFlag(e.currentTarget.getAttribute('value')));
    }

    return (
        <Menu className='todo_tab_wrap' mode="horizontal">
            <Menu.Item key="todo">
                <a value={todoTypes.TODO} onClick={onTodoStateHandler}>할 일</a>
            </Menu.Item>
            <Menu.Item key="doing">
                <a value={todoTypes.DOING} onClick={onTodoStateHandler}>진행 중인 일</a>
            </Menu.Item>
            <Menu.Item key="done">
                <a value={todoTypes.DONE} onClick={onTodoStateHandler}>완료된 일</a>
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(TodoTab);