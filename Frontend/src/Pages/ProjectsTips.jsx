import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/projects.css';

const TIPS = [
    { label: 'Watering Techniques', icon: '🚿', image: '/Icons/watering_can.png', path: '/Projects/tips/watering-techniques' },
    { label: 'Repotting',           icon: '🪴', image: '/Icons/repotting.png',     path: '/Projects/tips/repotting' },
];

const PROJECTS = [
    { label: 'Bonsai', icon: '🌳', image: '/vite.svg', path: '/Projects/bonsai' },
];

export default function ProjectsTips() {
    const [tab, setTab] = useState('tips');
    const navigate = useNavigate();
    const items = tab === 'tips' ? TIPS : PROJECTS;

    return (
        <div className="projects-page">
            <div className="projects-toggle" role="tablist">
                <button
                    role="tab"
                    aria-selected={tab === 'tips'}
                    className={`projects-toggle-btn${tab === 'tips' ? ' active' : ''}`}
                    onClick={() => setTab('tips')}
                >
                    Tips
                </button>
                <button
                    role="tab"
                    aria-selected={tab === 'projects'}
                    className={`projects-toggle-btn${tab === 'projects' ? ' active' : ''}`}
                    onClick={() => setTab('projects')}
                >
                    Projects
                </button>
            </div>

            <div className="projects-list">
                {items.map(item => (
                    <button
                        key={item.path}
                        className="projects-card"
                        onClick={() => navigate(item.path)}
                        aria-label={item.label}
                    >
                        {item.image
                            ? <img src={item.image} alt={item.label} className="projects-card-image" />
                            : <div className="projects-card-image-placeholder">{item.icon}</div>
                        }
                        <div className="projects-card-title">{item.label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
