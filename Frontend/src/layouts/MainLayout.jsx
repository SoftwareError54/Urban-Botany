import {Outlet, Link, useLocation, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import NavBar from "../GlobalComponents/NavBar";
import { getUserProfile } from "../services/api";

function MainLayout(){
    const location = useLocation();
    const navigate = useNavigate();
    const [points, setPoints] = useState(null);

    // derive a simple title from the current path
    const path = location.pathname || '';
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

    const isShop = path.startsWith('/shop');

    // load points when on any shop page
    useEffect(() => {
        if (!isShop) return;
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        getUserProfile(userId)
            .then(profile => setPoints(profile?.points ?? null))
            .catch(() => {});
    }, [isShop, path]);

    // back navigation for shop pages
    const handleBack = () => {
        if (path === '/shop') {
            navigate('/rooms');
        } else if (path.startsWith('/shop/')) {
            navigate('/shop');
        }
    };

    return(
        <>
            <header className="topbar">
                <div className="topbar-inner">
                    {isShop && (
                        <button className="topbar-back" onClick={handleBack} aria-label="Back">
                            &#8592;
                        </button>
                    )}
                    <h1>{title}</h1>
                    {path.startsWith('/rooms') && (
                        <button className="shop-button" onClick={() => navigate('/shop')}>Shop</button>
                    )}
                    {isShop && points !== null && (
                        <span className="topbar-points">{points} pts</span>
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