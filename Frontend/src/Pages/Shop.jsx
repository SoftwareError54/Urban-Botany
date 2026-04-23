import { useNavigate } from 'react-router-dom';
import '../css/shop.css';

const CATEGORIES = [
    { label: 'Plant Pots', path: 'plant-pots' },
    { label: 'Backgrounds', path: 'backgrounds' },
    { label: 'Walls', path: 'walls' },
];

function Shop() {
    const navigate = useNavigate();

    return (
        <div className="shop-page">
            <div className="shop-category-list">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.path}
                        className="shop-category-btn"
                        onClick={() => navigate(`/shop/${cat.path}`)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Shop;
