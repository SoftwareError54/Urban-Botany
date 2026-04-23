import {Outlet, Link, useLocation, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import NavBar from "../GlobalComponents/NavBar";
import PointsWallet from "../GlobalComponents/PointsWallet";

// Paths reachable directly from the NavBar — no back button shown on these
const NAV_ROOT_PATHS = new Set(['/rooms', '/Calendar', '/Projects', '/Scan', '/Profile']);

function MainLayout(){
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname || '';

    // derive a simple title from the current path
    let title = '';
    if(path === '/' ) title = 'Home';
    else if (path.startsWith('/rooms')) title = 'Rooms';
    else if (path.startsWith('/plants')) title = 'Plants';
    else if (path.startsWith('/Calendar')) title = 'Calendar';
    else if (path.startsWith('/Profile')) title = 'Profile';
    else if (path === '/shop') title = 'Shop';
    else if (path.startsWith('/shop/plant-pots')) title = 'Plant Pots';
    else if (path.startsWith('/shop/backgrounds')) title = 'Backgrounds';
    else if (path.startsWith('/shop/walls')) title = 'Walls';

    // Show back button on any page that isn't a NavBar root
    const showBack = !NAV_ROOT_PATHS.has(path);

    return(
        <>
            <header className="topbar">
                <div className="topbar-inner">
                    <div className="topbar-left">
                        {showBack && (
                            <button className="topbar-back" onClick={() => navigate(-1)} aria-label="Back">
                                &#8592;
                            </button>
                        )}
                        <PointsWallet />
                    </div>
                    <h1>{title}</h1>
                    {path === '/rooms' && (
                        <button className="shop-button" onClick={() => navigate('/shop')}>Shop</button>
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