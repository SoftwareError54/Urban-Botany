import { useEffect, useRef, useState } from 'react';
import { getUserProfile } from '../services/api';
import '../css/layout.css';

const ANIMATION_DURATION = 800; // ms

function animateCount(from, to, duration, onTick, onDone) {
    if (from === to) { onDone(to); return; }
    const start = performance.now();
    const diff = to - from;
    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        onTick(Math.round(from + diff * eased));
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            onDone(to);
        }
    }
    requestAnimationFrame(step);
}

export default function PointsWallet() {
    const [displayed, setDisplayed] = useState(null);
    const actualPoints = useRef(null);
    const animating = useRef(false);

    function triggerAnimation(newPoints) {
        const from = actualPoints.current ?? newPoints;
        actualPoints.current = newPoints;
        animateCount(from, newPoints, ANIMATION_DURATION, setDisplayed, setDisplayed);
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        getUserProfile(userId)
            .then(profile => {
                const p = profile?.points ?? null;
                if (p !== null) {
                    actualPoints.current = p;
                    setDisplayed(p);
                }
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        function handlePointsUpdated(e) {
            const newPoints = e.detail?.points;
            if (typeof newPoints === 'number') {
                triggerAnimation(newPoints);
            } else {
                // No value provided — re-fetch from server
                const userId = localStorage.getItem('userId');
                if (!userId) return;
                getUserProfile(userId)
                    .then(profile => {
                        const p = profile?.points ?? null;
                        if (p !== null) triggerAnimation(p);
                    })
                    .catch(() => {});
            }
        }
        window.addEventListener('pointsUpdated', handlePointsUpdated);
        return () => window.removeEventListener('pointsUpdated', handlePointsUpdated);
    }, []);

    if (displayed === null) return null;

    return (
        <span className="topbar-points">
            {displayed} pts
        </span>
    );
}
