import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import { Spinner } from '@components';
import {
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
} from '@pages'

const SuspenseLayout = () => (
  <React.Suspense fallback={<h1 className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}>
    <Outlet />
  </React.Suspense>
);

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<SuspenseLayout/>}>
        <Route path="/" element={<App />}>
          <Route index element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="user-layout" element={<UserLayout />}>
            <Route index element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Product/></React.Suspense>}/>
            <Route path="category" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Category/></React.Suspense>}/>
            <Route path="category/:id" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><SubCategory/></React.Suspense>}/>
            <Route path="brands" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Brands/></React.Suspense>}/>
            <Route path="brand-category" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><BrandCategory/></React.Suspense>}/>
            <Route path="ads" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Ads/></React.Suspense>}/>
            <Route path="stock" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Stock/></React.Suspense>}/>
            <Route path="settings" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Settings/></React.Suspense>}/>
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
