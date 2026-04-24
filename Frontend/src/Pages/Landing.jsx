import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Landing(){
  const navigate = useNavigate();
  const primary = '#568c71';
  const secondary = '#F2ea9e';

  useEffect(() => {
    document.body.classList.add('landing-fullscreen');
    return () => document.body.classList.remove('landing-fullscreen');
  }, []);

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20,gap:20,backgroundColor:'#67b296',minHeight:'100vh',width:'100%',boxSizing:'border-box',overflowX:'hidden'}}>
      <header style={{width:'100%', background: secondary, borderRadius:10, textAlign:'center',paddingTop:12, paddingBottom:12}}>
        <h1 style={{margin:0,color:'#2F8F4E',fontSize:64,fontWeight:700}}>Urban Botany</h1>
      </header>
      <div style={{width:'100%',background:primary,padding:12,borderRadius:10,display:'flex',justifyContent:'center',boxSizing:'border-box'}}>
        <img src={"../../../banner.png"} alt="Urban Botany banner" style={{width:'100%',maxWidth:960,height:'auto',objectFit:'contain',borderRadius:8,display:'block'}} />
      </div>

      <section style={{width:'100%', marginTop:0,background:secondary,padding:20,borderRadius:8, justifyContent:'center',boxSizing:'border-box'}}>
        <h1 style={{color:'#2F8F4E'}}>About Urban Botany</h1>
        <p>
          This project is my final year project for computer science at Roehampton University. Urban Botany is an
          application designed to help users living in urban dwellings better care for their houseplants and expand
          on their hobbies.
        </p>
        <p>
          Explore features like room-based plant placement, plant care scheduling, and a visual scene builder to
          compose rooms and plant decorations. Sign in to manage your plants or try the app to see how it helps you
          keep your plants healthy in small living spaces.
        </p>
        <div style={{marginTop:20}}>
          <button onClick={() => navigate('/auth')} style={{marginRight:10,backgroundColor:'#2F8F4E',color:'#ffffff',border:'none',padding:'10px 18px',borderRadius:6,cursor:'pointer',fontSize:16}}>Login / Signup</button>
          <button onClick={() => navigate('/rooms')} style={{backgroundColor:'#2F8F4E',color:'#ffffff',border:'none',padding:'10px 18px',borderRadius:6,cursor:'pointer',fontSize:16}}>Enter App</button>
        </div>
      </section>
    </div>
  )
}
