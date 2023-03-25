import LandingPage from "./components/LandingPage";
import './App.js';



 export const PATHS ={
    App_PAGE:"/",
    LandingPage_DETAIL:"/pincode",
};

export const PATHS_MAP =[{
    path:PATHS.LANDING_PAGE,
    component:<LandingPage/>
},{
    path:PATHS.Login_DETAIL,
    component:<Detail/>
}]