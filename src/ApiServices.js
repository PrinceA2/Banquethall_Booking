import axios from "axios";

const base_url = "https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api";

export const  base_url_pagename = `${base_url}/Pagenames`;
export const base_url_menuname = `${base_url}/Menu`;
export  const base_url_content = `${base_url}/Contents`;
export  const base_url_section = `${base_url}/Section`;
export  const base_url_menuitem = `${base_url}/MenuItem`;
export  const base_url_submenuprice = `${base_url}/SubmenuPrice`;
export  const base_url_control = `${base_url}/Control`;
export const base_url_orders = `${base_url}/Orders`;

//---------------------url for pages-------------------// 
export  const getpagenames = `${base_url_pagename}`;
export  const updatepage = `${base_url_pagename}`;
export  const createpage = `${base_url_pagename}`;

//----------------------url for section-------------------//

export const getsection = `${base_url_section}`;
export const createsection = `${base_url_section}`;
export const updatesection = `${base_url_section}`;

//----------------------url for content------------------//

export  const getcontent = `${base_url_content}`;
export const createcontent = `${base_url_content}/Bulk`;
export const updatecontent = `${base_url_content}/Bulk`;

//----------------------url for control------------------//

export  const getcontrol = `${base_url_control}`;
export const createcontrol = `${base_url_control}`;
export const updatecontrol = `${base_url_control}`;

//----------------------url for submenu----------------//

export  const getsubmenuprice = `${base_url_submenuprice}`;
export const createsubmenuprice = `${base_url_submenuprice}`;
export const updatesubmenuprice = `${base_url_submenuprice}`;

//--------------------------url for menu-------------------//

export  const getmenu = `${base_url_menuname}`;
export const createmenu = `${base_url_menuname}`;
export const updatemenu = `${base_url_menuname}`;

//--------------------------url for menuitem-------------------//

export  const getmenuitem = `${base_url_menuitem}`;
export const createmenuitem = `${base_url_menuitem}/Bulk`;
export const updatemenuitem = `${base_url_menuitem}/Bulk`;

//--------------------------url for order---------------------//

export const getorders = `${base_url_orders}`;
export const createorders = `${base_url_orders}`;
export const updateorders = `${base_url_orders}`;
