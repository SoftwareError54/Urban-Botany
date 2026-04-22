import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/scan.css';
export default function Scan(){
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [devices, setDevices] = useState([]);
    const [currentDeviceId, setCurrentDeviceId] = useState(null);
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        async function init(){
            await navigator.mediaDevices.getUserMedia({video:true}).catch(()=>{});
            const list = await navigator.mediaDevices.enumerateDevices();
            const cams = list.filter(d => d.kind === 'videoinput');
            setDevices(cams);
            if(cams[0]) setCurrentDeviceId(cams[0].deviceId);
        }
        init();
    },[]);

    useEffect(()=>{
        async function start(){
            if(!currentDeviceId) return;
            if(stream){
                stream.getTracks().forEach(t=>t.stop());
            }
            try{
                const s = await navigator.mediaDevices.getUserMedia({video: {deviceId: {exact: currentDeviceId}}});
                setStream(s);
                if(videoRef.current){
                    videoRef.current.srcObject = s;
                    videoRef.current.play().catch(()=>{});
                }
            }catch(err){
                console.error('camera start error', err);
            }
        }
        start();
        return ()=>{ if(stream) stream.getTracks().forEach(t=>t.stop()); }
    },[currentDeviceId]);

    function handleDeviceChange(e){ setCurrentDeviceId(e.target.value); }

    async function captureAndIdentify(){
        if(!videoRef.current) return;
        setLoading(true);
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            try{
                // send base64 to backend so the server can use the .env PLANTNET_API_KEY
                const reader = new FileReader();
                reader.onloadend = async () => {
                    try{
                        const base64 = reader.result.split(',')[1];
                        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/plants/identify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ imageBase64: base64, organs: 'leaf' })
                        });
                        if(!res.ok) throw new Error('Identification failed');
                        const json = await res.json();
                        console.log('plantnet (via backend)', json);
                        // try to extract a species name
                        const result = json.results && json.results[0];
                        const species = result?.species || {};
                        const scientific = species.scientificName || species.scientificNameWithoutAuthor || species.scientific_name || (result?.species && (result.species.scientificNameWithoutAuthor || result.species.scientificName));
                        const score = result?.score ?? null;
                        // navigate to identified page with data
                        navigate('/plants/identified?name=' + encodeURIComponent(scientific || ''), { state: { raw: json, scientific, score } });
                    }catch(err){
                        console.error(err);
                        alert(err.message || 'Identification error');
                    }finally{ setLoading(false); }
                };
                reader.readAsDataURL(blob);
            }catch(err){
                console.error('capture error', err);
                alert(err.message || 'Capture failed');
                setLoading(false);
            }
        }, 'image/jpeg', 0.9);
    }

    return (
        <div className="scan-page">
            <h1>Scan Plant</h1>
            <div>
                {devices.length > 0 && (
                    <select className="scan-device-select" onChange={handleDeviceChange} value={currentDeviceId || ''}>
                        {devices.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || d.deviceId}</option>)}
                    </select>
                )}
            </div>
            <div className="scan-viewfinder-wrapper">
                <video ref={videoRef} className="scan-video" autoPlay muted playsInline />
                <div className="scan-viewfinder-overlay">
                    <img src="/Icons/view_finder.png" alt="viewfinder" />
                </div>
                <canvas ref={canvasRef} style={{display:'none'}} />
            </div>
            <div>
                <button className="scan-capture-button" onClick={captureAndIdentify} disabled={loading}>{loading ? 'Identifying...' : 'Capture & Identify'}</button>
            </div>
        </div>
    );
}