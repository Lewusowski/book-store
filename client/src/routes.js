import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import BookPage from './pages/BookPage'
import Profile from './pages/Profile'
import Purchases from "./pages/Purchases";

import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    BOOK_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE, PURCHASES_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
} from "./utils/consts";


export const adminRoutes=[
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
]

export const authRoutes = [

    {
        path: BASKET_ROUTE,
        Component: Basket,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
    {
        path: PURCHASES_ROUTE,
        Component: Purchases,
    }

]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: BookPage,
    }
]