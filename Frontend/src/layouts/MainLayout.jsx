import {Outlet, Link} from "react-router-dom"

import NavBar from "../GlobalComponents/NavBar";

function MainLayout(){
    return(
        <>
            
            <Outlet/>
            <NavBar/>
        </>
        
    )
}

export default MainLayout;