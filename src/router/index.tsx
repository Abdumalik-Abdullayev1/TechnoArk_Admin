import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import {
  SignIn,
  SignUp,
  UserLayout,
  Product,
  Category,
  Brands,
  BrandCategory,
  Ads,
  Stock,
  Settings
} from '@pages'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="user-layout" element={<UserLayout />}>
          <Route index element={<Product/>}/>
          <Route path="category" element={<Category/>}/>
          <Route path="brands" element={<Brands/>}/>
          <Route path="brand-category" element={<BrandCategory/>}/>
          <Route path="ads" element={<Ads/>}/>
          <Route path="stock" element={<Stock/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
