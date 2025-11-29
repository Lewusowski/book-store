import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {jwtDecode} from "jwt-decode";
import {fetchCart, fetchClient} from "../http/clientAPI";

const AppRouter = observer(() => {
    const {client} = useContext(Context);
    const token = localStorage.getItem("token");


return (

        <Routes>
            {token&&jwtDecode(token).role==='Админ'&& adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />)}
            {client._isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} />)}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />)}
            <Route path = "*" element={<Navigate to={SHOP_ROUTE} replace />} />
        </Routes>
    );
});

export default AppRouter;