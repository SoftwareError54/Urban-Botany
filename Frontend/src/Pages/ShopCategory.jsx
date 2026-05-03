import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllPlantDecorations, getAllRoomDecorations, getRooms, getPlantsByUserId, purchaseDecoration } from '../services/api';
import '../css/shop.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// room_decoration type values: type 1 = background, type 2 = wall
const BACKGROUND_TYPES = new Set([1]);
const WALL_TYPES = new Set([5]);

const ROOM_LAYER_DIRS = {
    1: 'backgrounds',
    2: 'weather',
    3: 'windows',
    4: 'blinds',
    5: 'walls',
    6: 'windowsills',
    8: 'radiators',
    9: 'curtains'
};

const isDefault = (item) =>
    (item.decorationName ?? '').toLowerCase().startsWith('default') || (item.cost ?? 0) === 0;

function ShopCategory() {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null); // item being purchased

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
                } else if (category === 'radiators') {
                    const data = await getAllRoomDecorations();
                    const filtered = Array.isArray(data)
                        ? data.filter(d => d.layer === 8 && !isDefault(d))
                        : [];
                    setItems(filtered);
                } else if (category === 'windows') {
                    const data = await getAllRoomDecorations();
                    const filtered = Array.isArray(data)
                        ? data.filter(d => d.layer === 3 && !isDefault(d))
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
        'radiators': 'Radiators',
        'windows': 'Windows',
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
                        const layerDir = ROOM_LAYER_DIRS[item.layer];
                        const imgSrc = category === 'plant-pots'
                            ? `/PlantDecorations/${imgPtr}.png`
                            : `/RoomDecorations/${layerDir ? layerDir + '/' : ''}${imgPtr}.png`;
                        const fallbackSrc = category === 'plant-pots'
                            ? `/PlantDecorations/default_pot.png`
                            : null;

                        return (
                            <div className="shop-item-card" key={id} onClick={() => setSelected(item)}>
                                <ImageOrColour src={imgSrc} fallbackSrc={fallbackSrc} colour={colour} />
                                <span className="shop-item-cost">{cost} pts</span>
                                <span className="shop-item-name">{name}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {selected && (
                <PurchaseModal
                    item={selected}
                    category={category}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}

function PurchaseModal({ item, category, onClose }) {
    const isPlant = category === 'plant-pots';
    const decorationId = item.plantDecorationID ?? item.roomDecorationID;
    const decorationType = isPlant ? 'plant' : 'room';

    const [options, setOptions] = useState([]);
    const [targetId, setTargetId] = useState('');
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [buying, setBuying] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                if (isPlant) {
                    const plants = await getPlantsByUserId();
                    setOptions(Array.isArray(plants) ? plants : []);
                } else {
                    const rooms = await getRooms();
                    setOptions(Array.isArray(rooms) ? rooms : []);
                }
            } catch {
                setOptions([]);
            } finally {
                setLoadingOptions(false);
            }
        };
        load();
    }, [isPlant]);

    const handleBuy = async () => {
        if (!targetId) return;
        setBuying(true);
        setFeedback(null);
        try {
            const result = await purchaseDecoration({ decorationType, decorationId, targetId });
            setFeedback({ type: 'success', message: `Purchased! You have ${result.pointsRemaining} pts remaining.` });
            if (typeof result.pointsRemaining === 'number') {
                window.dispatchEvent(new CustomEvent('pointsUpdated', { detail: { points: result.pointsRemaining } }));
            }
            setTimeout(onClose, 1800);
        } catch (err) {
            setFeedback({ type: 'error', message: err.message });
        } finally {
            setBuying(false);
        }
    };

    const optionLabel = (opt) => isPlant ? (opt.plantName ?? `Plant ${opt.userPlantID}`) : (opt.roomName ?? `Room ${opt.roomID}`);
    const optionValue = (opt) => isPlant ? opt.userPlantID : opt.roomID;

    return (
        <div className="shop-modal-overlay" onClick={onClose}>
            <div className="shop-modal" onClick={e => e.stopPropagation()}>
                <h2 className="shop-modal-title">{item.decorationName}</h2>
                <p className="shop-modal-cost">{item.cost} pts</p>

                {loadingOptions ? (
                    <p className="shop-empty">Loading…</p>
                ) : (
                    <select
                        className="shop-modal-select"
                        value={targetId}
                        onChange={e => setTargetId(e.target.value)}
                    >
                        <option value="">— Choose {isPlant ? 'a plant' : 'a room'} —</option>
                        {options.map(opt => (
                            <option key={optionValue(opt)} value={optionValue(opt)}>
                                {optionLabel(opt)}
                            </option>
                        ))}
                    </select>
                )}

                {feedback && (
                    <p className={`shop-modal-feedback shop-modal-feedback--${feedback.type}`}>
                        {feedback.message}
                    </p>
                )}

                <button
                    className="shop-modal-buy"
                    disabled={!targetId || buying}
                    onClick={handleBuy}
                >
                    {buying ? 'Buying…' : 'Buy Now'}
                </button>
                <button className="shop-modal-cancel" onClick={onClose}>Cancel</button>
            </div>
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
