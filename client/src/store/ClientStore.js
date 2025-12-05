import {makeAutoObservable} from "mobx";

export default class ClientStore {
    constructor(){
        this._isAuth = false;
        this._isAdmin =false;
        this._client = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        console.log('СТАВЛЮ ' + bool);
        this._isAuth = bool;
        console.log(this._isAuth)
    }

    setIsAdmin(bool){
        this._isAdmin = bool;
    }

    setClient(client){
        this._client = client;
    }

    getIsAdmin(){
        return this._isAdmin;
    }

    getIsAuth(){
        return this._isAuth;
    }

    getClient(){
        return this._client;
    }
};