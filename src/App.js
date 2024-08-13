import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Dashboard from './Page/Dashboard'
import Content from './Component/category/ContentList'
import Reports from './Page/Reports'
import Forgotpswd from './Component/ForgotPwd/Forgotpswd'
import Login from './Component/Login/Login'
import Registration from './Component/Resister/Registration'
import Settings from './Page/Settings'
import Resetpassword from './Component/ForgotPwd/Resetpswd'
import Changepassword from './Page/ChangePassword'
import Changeprofile from './Page/ChangeProfile'
import Page from './Component/category/AddPages'
import Section from './Component/category/SectionList'
import Control from './Component/category/ControlList'
// import Datafetchersection from './Component/SectionMasterapi/Secdatafetcher'
import OrderList from './Component/category/OrderList'
import SubMenuList from './Component/category/SubMenu'
import TypeOfMenu from './Component/category/TypeOfMenu'
import MenuMaster from './Component/category/MenuMaster'

export default function App() {
  return (
 <>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path='/dasboard' element={<Dashboard/>}></Route>
        <Route path='/setting' element={<Settings/>}></Route>
        <Route path='/report' element={<Reports/>}></Route>
        <Route path='/forgotpswd' element={<Forgotpswd/>}></Route>
        <Route path='/resetpswd' element={<Resetpassword/>}></Route>
        <Route path='/changepassword' element={<Changepassword/>}></Route>
        <Route path='/changeprofile' element={<Changeprofile/>}></Route>
        <Route path='/addpages' element={<Page/>}></Route>
        <Route path='/sectionlist' element={<Section/>}></Route>
        <Route path='/contentlist' element={<Content/>}></Route>
        <Route path='/controllist' element={<Control/>}></Route>
        {/* <Route path='/secdatafetcher' element={<Datafetchersection />} /> */}
        <Route path='/orderlist' element= {<OrderList/>}/>
        <Route path='/submenumaster' element= {<SubMenuList/>}/>
        <Route path='/typeofmenu' element={<TypeOfMenu/>}/>
        <Route path='/menumaster' element={<MenuMaster/>}/>
        </Routes>
  </BrowserRouter>
 </>
  )
}


   