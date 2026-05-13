import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Landing(){
  const navigate = useNavigate();
  const primary = '#568c71';
  const secondary = '#F2ea9e';
  const [tcOpen, setTcOpen] = useState(false);

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
          Urban Botany is an application designed to help users living in urban dwellings better care for their houseplants and expand
          on their hobbies.
        </p>
        <p>
          Explore features like room-based plant placement, plant care scheduling, and a visual scene builder to
          compose rooms and plant decorations. Sign in to manage your plants or try the app to see how it helps you
          keep your plants healthy in small living spaces.
        </p>
        <div style={{marginTop:20,display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
          <button onClick={() => navigate('/auth')} style={{backgroundColor:'#2F8F4E',color:'#ffffff',border:'none',padding:'10px 18px',borderRadius:6,cursor:'pointer',fontSize:16}}>Login / Signup</button>
        </div>
      </section>

      <section style={{width:'100%',background:secondary,padding:20,borderRadius:8,boxSizing:'border-box'}}>
        <button
          onClick={() => setTcOpen(o => !o)}
          style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:8,padding:0,width:'100%'}}
        >
          <h2 style={{color:'#2F8F4E',margin:0,fontSize:18}}>{tcOpen ? '▾' : '▸'} Terms &amp; Conditions</h2>
        </button>

        {tcOpen && (
          <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:16,fontSize:14,color:'#2a2a2a',lineHeight:1.6}}>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>1. Acceptance of Terms</h3>
              <p style={{margin:0}}>
                By creating an account or using Urban Botany you agree to these Terms &amp; Conditions and
                our User Content Guidelines. If you do not agree, please do not use the application.
              </p>
            </div>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>2. Plant Identification — Powered by PlantNet</h3>
              <p style={{margin:'0 0 6px'}}>
                Plant species identification in Urban Botany is provided by the{' '}
                <strong>Pl@ntNet API</strong> (<a href="https://plantnet.org" target="_blank" rel="noopener noreferrer" style={{color:'#2F8F4E'}}>plantnet.org</a>).
                Use of this feature is subject to PlantNet's own Terms of Use.
              </p>
              <ul style={{margin:0,paddingLeft:20}}>
                <li>PlantNet is acknowledged as the source of all plant identification results.</li>
                <li>PlantNet does <strong>not guarantee accuracy</strong>. Identification results are
                  provided as a guide only and you use them entirely at your own risk.</li>
                <li>PlantNet and Urban Botany are <strong>not liable</strong> for incorrect
                  identifications, data loss, or any financial or material damages arising from
                  reliance on identification results.</li>
                <li>PlantNet data and images are protected by intellectual property law. You may
                  not copy, reproduce, or redistribute PlantNet content without written permission
                  from PlantNet.</li>
                <li>This application is provided for <strong>non-commercial, personal use only</strong>.
                  Commercial use of the PlantNet API requires a separate paid licence from PlantNet.</li>
                <li>Only one PlantNet API account is permitted per person or organisation.</li>
              </ul>
            </div>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>3. AI Transparency</h3>
              <p style={{margin:0}}>
                Urban Botany uses AI-based image analysis to identify plant species. A confidence
                score is displayed with every result so you can judge its reliability. You are always
                asked to confirm whether the identified species matches your plant before it is added
                to your account. Urban Botany is classified as a minimal-risk AI system under the EU AI
                Act (Regulation (EU) 2024/1689) and operates in accordance with voluntary transparency
                and human-oversight best practices recommended by that framework.
              </p>
            </div>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>4. Toxic Plant Safety</h3>
              <p style={{margin:0}}>
                Urban Botany strongly advises against the consumption of any plant.
                Identification results should never be used to determine whether a plant is safe to eat.
              </p>
            </div>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>5. User Content Guidelines</h3>
              <p style={{margin:'0 0 6px'}}>
                You are responsible for all content you submit or share through Urban Botany.
                The following content is strictly prohibited:
              </p>
              <ul style={{margin:0,paddingLeft:20}}>
                <li>Pornographic, sexually explicit, or adult content.</li>
                <li>Hateful, racist, discriminatory, or slanderous material.</li>
                <li>Content that harasses, threatens, or demeans other users.</li>
              </ul>
              <p style={{margin:'6px 0 0'}}>
                Violation of these guidelines will result in immediate account suspension and/or
                permanent deletion of your account.
              </p>
            </div>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>6. Data &amp; Privacy (GDPR)</h3>
              <p style={{margin:0}}>
                Urban Botany collects only the personal data necessary to provide the service
                (data minimisation). Your data is stored securely and used solely for the purposes
                described at the point of collection (purpose limitation). You have the right to
                access, correct, and request deletion of your personal data at any time via your
                Profile page. Urban Botany is designed in compliance with the principles of the
                General Data Protection Regulation (GDPR).
              </p>
            </div>

            <div>
              <h3 style={{color:'#2F8F4E',margin:'0 0 4px'}}>7. Changes to These Terms</h3>
              <p style={{margin:0}}>
                These Terms &amp; Conditions may be updated periodically. Continued use of Urban
                Botany after any changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <p style={{margin:0,fontSize:12,color:'#555'}}>Last updated: May 2026</p>
          </div>
        )}
      </section>
    </div>
  )
}
