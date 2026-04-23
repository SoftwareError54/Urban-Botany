import { useEffect, useState } from "react";
import { getUserProfile } from '../services/api';

const primary = '#568c71';
const secondary = '#F2ea9e';
const cardStyle = {
    background: secondary,
    padding: 10, // 50% larger
    borderRadius: 12,
    maxWidth: 720, // 50% larger
    margin: '2rem auto',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    color: '#222',
    fontSize: '1.5rem', // 50% larger
};
const labelStyle = {
    fontWeight: 600,
    marginBottom: 2,
    color: primary,
    display: 'block',
};
const valueStyle = {
    marginBottom: 12,
    color: '#222',
    fontWeight: 400,
};

function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded;
    } catch {
        return {};
    }
}

function Profile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (userId) {
            getUserProfile(userId)
                .then(profile => setUser(profile))
                .catch(() => {
                    // fallback to JWT if backend fails
                    if (token) {
                        const decoded = decodeToken(token);
                        setUser(decoded);
                    }
                });
        } else if (token) {
            const decoded = decodeToken(token);
            setUser(decoded);
        }
    }, []);

    return (
        <div className="profile-card" style={cardStyle}>
            <h2 style={{color: primary, marginTop: 0, marginBottom: 24}}>Account Details</h2>
            <div>
                <span style={labelStyle}>Name:</span>
                <span style={valueStyle}>{user.FName || user.firstName || ''} {user.SName || user.lastName || ''}</span>
            </div>
            <div>
                <span style={labelStyle}>Username:</span>
                <span style={valueStyle}>{user.userName || user.username || ''}</span>
            </div>
            <div>
                <span style={labelStyle}>Email:</span>
                <span style={{...valueStyle, wordBreak: 'break-all', overflowWrap: 'anywhere', fontSize: 'clamp(0.75rem, 3.5vw, 1.5rem)'}}>{user.email || ''}</span>
            </div>
            <div>
                <span style={labelStyle}>Phone Number:</span>
                <span style={valueStyle}>{user.phoneNum || user.phoneNumber || ''}</span>
            </div>
            <div>
                <span style={labelStyle}>Address:</span>
                <span style={valueStyle}>
                    {user.addressLine1 || ''}<br/>
                    {user.addressLine2 ? user.addressLine2 + ', ' : ''}
                    {user.city || ''} {user.region || ''} {user.postalCode || ''}<br/>
                    {user.countryCode || user.country || ''}
                </span>
            </div>
        </div>
    );
}

export default Profile;