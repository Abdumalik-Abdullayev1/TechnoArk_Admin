import { lazy } from 'react';

const SignIn = lazy(() => import('./sign-in'));
const SignUp = lazy(() => import('./sign-up'));
const UserLayout = lazy(() => import('./user-layout'));
const Product = lazy(() => import('./product'));
const Category = lazy(() => import('./category'));
const SubCategory = lazy(() => import('./sub-category'));
const Brands = lazy(() => import('./brands'));
const BrandCategory = lazy(() => import('./brand-category'));
const Ads = lazy(() => import('./ads'));
const Stock = lazy(() => import('./stock'));
const Settings = lazy(() => import('./settings'));

export {
    SignIn,
    SignUp,
    UserLayout,
    Product,
    Category,
    SubCategory,
    Brands,
    BrandCategory,
    Ads,
    Stock,
    Settings
}