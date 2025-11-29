import {makeAutoObservable} from "mobx";

export default class BookStore{
    constructor(){
        this._genres = []
        this._warehouses = []
        this._publishHouses = []
        this._books = []

        this._selectedGenre = {}
        this._selectedWarehouse = {}
        this._selectedPublishHouse = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 4

        makeAutoObservable(this)
    }

    setGenres(genres){
        this._genres = genres;
    }
    setBooks(books){
        this._books = books;
    }

    setWarehouses(warehouses){
        this._warehouses = warehouses;
    }

    setPublishHouses(publishHouses){
        this._publishHouses = publishHouses;
    }

    setSelectedGenre(genre){
        this._selectedGenre = genre;
    }
    setSelectedWarehouse(warehouse){
        this._selectedWarehouse= warehouse;
    }
    setSelectedPublishHouse(publishHouse){
        this._selectedPublishHouse = publishHouse;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    getGenres(){
        return this._genres;
    }

    getBooks(){
        return this._books;
    }
    
    getSelectedGenre(){
        return this._selectedGenre;
    }

    getPublishHouses(){
        return this._publishHouses;
    }

    getWarehouses(){
        return this._warehouses;
    }

    getSelectedPublishHouse(){
        return this._selectedPublishHouse;
    }
    getSelectedWarehouse(){
        return this._selectedWarehouse;
    }

    getPage() {
        return this._page;
    }

    getTotalCount() {
        return this._totalCount;
    }

    getLimit() {
        return this._limit;
    }
}