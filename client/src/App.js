import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "./index";
import {check} from "./http/clientAPI";
import {jwtDecode} from "jwt-decode";
import {LOGIN_ROUTE} from "./utils/consts";

const App = observer(()=>{
    const {client} = useContext(Context);
    const alertShown = useRef(false);

    //     useEffect(() => {
    //         try {
    //             check().then(data=> {
    //                 console.log(data)
    //                 if (data.message === 'SESSION_EXPIRED') {
    //                     localStorage.setItem('alertShown', 'true');
    //                     alert('Время сеанса вышло! Зарегистрируйтесь еще раз!');
    //                     document.location.reload();}
    //                 else if (data.message === 'SUCCESS') {
    //                     client.setIsAuth(true)
    //                     client.setIsAdmin(data.user.role === 'Админ')
    //                 }
    //             })
    //             // const token = localStorage.getItem('token');
    //             // if(!token && !alertShown.current) {
    //             //     alert('Время сеанса вышло! Зарегестрируйтесь еще раз!')
    //             //     alertShown.current = true;
    //             // }
    //             // else if (token){
    //             //     check().then(data=> {
    //             //         client.setIsAuth(true)
    //             //         client.setIsAdmin(jwtDecode(localStorage.getItem('token')).role === 'Админ')
    //             //     })
    //             // }
    //
    //         } catch(err){
    //             console.log(err.message);}
    // }, [])
    useEffect(() => {
        check().then(data => {
            if(data!==null){
                client.setClient(true)
                client.setIsAuth(true)
                client.setIsAdmin(data.role==="Админ")
            } else{
                client.setIsAuth(false)
                client.setIsAdmin(false)
            }
        })
    }, [])

  return(
      <BrowserRouter>
          <NavBar />
          <AppRouter/>
      </BrowserRouter>
  );
});
export default App