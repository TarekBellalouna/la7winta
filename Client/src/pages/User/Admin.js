import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/Common/PageTitle";
import { usersList } from "../../redux/User/userAction";

function Admin({ history }) {
    const { user } = useSelector((state) => state.userReducer);
    console.log("user profile", user);

    const { users } = useSelector(state => state.userReducer)
    console.log("users", users)

    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(usersList())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, user])

    return (
        <div className="user_wrapper">
            <PageTitle title={user.name} />
            {users}
        </div>
    );
}

export default Admin;
