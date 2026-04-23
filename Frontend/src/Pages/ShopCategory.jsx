import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllPlantDecorations, getAllRoomDecorations } from '../services/api';
import '../css/shop.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// room_decoration type values: type 1 = background, type 2 = wall
const BACKGROUND_TYPES = new Set([1]);
const WALL_TYPES = new Set([5]);

const isDefault = (item) =>
    (item.decorationName ?? '').toLowerCase().startsWith('default') || (item.cost ?? 0) === 0;

function ShopCategory() {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const load = async () => {
            try {
                if (category === 'plant-pots') {
                    const data = await getAllPlantDecorations();
                    setItems(Array.isArray(data) ? data.filter(d => !isDefault(d)) : []);
                } else if (category === 'backgrounds') {
                    const data = await getAllRoomDecorations();
                    const filtered = Array.isArray(data)
                        ? data.filter(d => BACKGROUND_TYPES.has(d.type ?? d.layer) && !isDefault(d))
                        : [];
                    setItems(filtered);
                } else if (category === 'walls') {
                    const data = await getAllRoomDecorations();
                    const filtered = Array.isArray(data)
                        ? data.filter(d => WALL_TYPES.has(d.type ?? d.layer) && !isDefault(d))
                        : [];
                    setItems(filtered);
                }
            } catch (err) {
                setError('Failed to load items.');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [category]);

    const categoryLabel = {
        'plant-pots': 'Plant Pots',
        'backgrounds': 'Backgrounds',
        'walls': 'Walls',
    }[category] ?? 'Items';

    if (loading) return <div className="shop-category-page"><p className="shop-empty">Loading…</p></div>;
    if (error) return <div className="shop-category-page"><p className="shop-empty">{error}</p></div>;

    return (
        <div className="shop-category-page">
            {items.length === 0 ? (
                <p className="shop-empty">No {categoryLabel} available yet.</p>
            ) : (
                <div className="shop-grid">
                    {items.map((item, i) => {
                        const id = item.plantDecorationID ?? item.roomDecorationID ?? i;
                        const colour = item.colour1 ?? item['1erColour'] ?? '#e8e8e8';
                        const cost = item.cost ?? 0;
                        const name = item.decorationName ?? '';
                        const imgPtr = item.imagePointer;
                        // attempt to resolve a known image path
                        const imgSrc = category === 'plant-pots'
                            ? `/PlantDecorations/${imgPtr}.png`
                            : `/RoomDecorations/${imgPtr}.png`;
                        const fallbackSrc = category === 'plant-pots'
                            ? `/PlantDecorations/default_pot.png`
                            : null;

                        return (
                            <div className="shop-item-card" key={id}>
                                <ImageOrColour src={imgSrc} fallbackSrc={fallbackSrc} colour={colour} />
                                <span className="shop-item-cost">{cost} pts</span>
                                <span className="shop-item-name">{name}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function ImageOrColour({ src, fallbackSrc, colour }) {
    const [errCount, setErrCount] = useState(0);

    const handleError = () => setErrCount(c => c + 1);

    if (errCount === 0) {
        return <img className="shop-item-preview" src={src} alt="" onError={handleError} />;
    }
    if (errCount === 1 && fallbackSrc && fallbackSrc !== src) {
        return <img className="shop-item-preview" src={fallbackSrc} alt="" onError={handleError} />;
    }
    return (
        <div
            className="shop-item-preview--colour"
            style={{ background: colour }}
        />
    );
}

export default ShopCategory;
