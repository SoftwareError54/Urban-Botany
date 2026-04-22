import {Outlet, Link, useLocation, useNavigate} from "react-router-dom"

import NavBar from "../GlobalComponents/NavBar";

function MainLayout(){
    const location = useLocation();
    const navigate = useNavigate();

    // derive a simple title from the current path
    const path = location.pathname || '';
    let title = '';
    if(path === '/' ) title = 'Home';
    else if (path.startsWith('/rooms')) title = 'Rooms';
    else if (path.startsWith('/plants')) title = 'Plants';
    else if (path.startsWith('/Calendar')) title = 'Calendar';
    else if (path.startsWith('/Profile')) title = 'Profile';

    return(
        <>
            <header className="topbar">
                <div className="topbar-inner">
                    <h1>{title}</h1>
                    {path.startsWith('/rooms') && (
                        <button className="shop-button" onClick={() => navigate('/rooms')}>Shop</button>
                    )}
                </div>
            </header>

            <div className="page-content">
                <Outlet/>
            </div>
            <NavBar/>
        </>
    )
}

export default MainLayout;