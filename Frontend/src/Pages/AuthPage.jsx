import { useState, useEffect } from "react";

const primary = '#568c71';
const secondary = '#F2ea9e';
const terciary = '#67b296';
const headerText = '#ffffff';
import { login, signup} from "../services/api";
import {useNavigate} from "react-router-dom";

const COUNTRY_CODES = [
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AD', name: 'Andorra' },
    { code: 'AO', name: 'Angola' },
    { code: 'AG', name: 'Antigua and Barbuda' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BB', name: 'Barbados' },
    { code: 'BY', name: 'Belarus' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BZ', name: 'Belize' },
    { code: 'BJ', name: 'Benin' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BR', name: 'Brazil' },
    { code: 'BN', name: 'Brunei' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'CV', name: 'Cabo Verde' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'CL', name: 'Chile' },
    { code: 'CN', name: 'China' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KM', name: 'Comoros' },
    { code: 'CG', name: 'Congo' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'DM', name: 'Dominica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'EE', name: 'Estonia' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'DE', name: 'Germany' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GR', name: 'Greece' },
    { code: 'GD', name: 'Grenada' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'GY', name: 'Guyana' },
    { code: 'HT', name: 'Haiti' },
    { code: 'HN', name: 'Honduras' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'LA', name: 'Laos' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Liberia' },
    { code: 'LY', name: 'Libya' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MV', name: 'Maldives' },
    { code: 'ML', name: 'Mali' },
    { code: 'MT', name: 'Malta' },
    { code: 'MH', name: 'Marshall Islands' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FM', name: 'Micronesia' },
    { code: 'MD', name: 'Moldova' },
    { code: 'MC', name: 'Monaco' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'NA', name: 'Namibia' },
    { code: 'NR', name: 'Nauru' },
    { code: 'NP', name: 'Nepal' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NO', name: 'Norway' },
    { code: 'OM', name: 'Oman' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PW', name: 'Palau' },
    { code: 'PA', name: 'Panama' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russia' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'KN', name: 'Saint Kitts and Nevis' },
    { code: 'LC', name: 'Saint Lucia' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines' },
    { code: 'WS', name: 'Samoa' },
    { code: 'SM', name: 'San Marino' },
    { code: 'ST', name: 'Sao Tome and Principe' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SN', name: 'Senegal' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SB', name: 'Solomon Islands' },
    { code: 'SO', name: 'Somalia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'SS', name: 'South Sudan' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SR', name: 'Suriname' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syria' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TL', name: 'Timor-Leste' },
    { code: 'TG', name: 'Togo' },
    { code: 'TO', name: 'Tonga' },
    { code: 'TT', name: 'Trinidad and Tobago' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'TV', name: 'Tuvalu' },
    { code: 'UG', name: 'Uganda' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'VU', name: 'Vanuatu' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' },
];

function getUserIdFromToken(token){
    try{
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded.userId || decoded.user_id || decoded.id || null;
    } catch(e){
        console.error('Failed to decode token', e);
        return null;
    }
}

function Signup({setAction}){
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const username = form.username.value;
        const password = form.password.value;
        const firstName = form.FirstName.value;
        const lastName = form.LastName.value;
        const DoB = form.DoB.value;
        const phoneNumber = form.phoneNumber.value;
        const addressLine1 = form.addressLine1.value;
        const addressLine2 = form.addressLine2.value;
        const city = form.city.value;
        const region = form.region.value;
        const postalCode = form.postalCode.value;
        const country = form.country.value;

        try{
            const payload = {
                username,
                password,
                email,
                DoB,
                firstName,
                lastName,
                phoneNumber,
                addressLine1,
                addressLine2,
                city,
                region,
                postalCode,
                country
            };
            const res = await signup(payload);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                const uid = getUserIdFromToken(res.token);
                if(uid) localStorage.setItem('userId', uid);
            }
            setAction('loggedIn');
            navigate('/rooms');
        } catch(err){
            console.error(err);
            alert(err.message || 'Signup failed');
        }
    }
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        {/* <header style={{width:'100%',background:secondary, padding:12,borderRadius:8,color:headerText,textAlign:'center',marginBottom:12}}>
          
        </header> */}
        <form onSubmit={handleSubmit} style={{background:secondary,padding:20,borderRadius:8,maxWidth:720,width:'100%', paddingRight:40, boxSizing:'border-box'}}>
            <h2 style={{margin:0, color: primary}}>Welcome to Urban Botany</h2>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="DoB">Date of Birth:</label>
            <input type="date" id="DoB" name="DoB" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor ="FirstName">First Name:</label>
            <input type="text" id="FirstName" name="FirstName" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="LastName">Last Name:</label>
            <input type="text" id="LastName" name="LastName" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input type="text" id="addressLine1" name="addressLine1" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input type="text" id="addressLine2" name="addressLine2" style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="state">Region:</label>
            <input type="text" id="region" name="region" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="country">Country:</label>
            <select id="country" name="country" required defaultValue="GB" style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc',background:'#fff',fontSize:'inherit'}}>
                {COUNTRY_CODES.map(c => (
                    <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                ))}
            </select>
            <br />
            
            <button type="submit" style={{background:primary,color:headerText,border:'none',padding:'10px 14px',borderRadius:8,cursor:'pointer'}}>Sign Up</button>
        
        </form>
        </div>

    )
}

function Login({ setAction }){
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const identifier = form.identifier.value;
        const password = form.password.value;
        try{
            const res = await login(identifier, password);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                const uid = getUserIdFromToken(res.token);
                if(uid) localStorage.setItem('userId', uid);
            }
            setAction('loggedIn');
            navigate('/rooms');
        } catch(err){
            console.error(err);
            alert(err.message || 'Login failed');
        }
    }

    return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        {/* <header style={{width:'100%',background:secondary,padding:12,borderRadius:8,color:headerText,textAlign:'center',marginBottom:12}}>
          
        </header> */}
        <form onSubmit={handleSubmit} style={{background:secondary,padding:20,borderRadius:8,maxWidth:420,width:'100%', paddingRight:40, boxSizing:'border-box'}}>
            <h2 style={{margin:0, color: primary}}>Welcome to Urban Botany</h2>
            <label htmlFor="identifier">Email or Username:</label>
            <input type="text" id="identifier" name="identifier" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <button type="submit" style={{background:primary,color:headerText,border:'none',padding:'10px 14px',borderRadius:8,cursor:'pointer'}}>Login</button>
        </form>
    </div>

    )
}

function AuthPage(){
    const [action, setAction] = useState("login");

    useEffect(() => {
        document.body.classList.add('landing-fullscreen');
        return () => document.body.classList.remove('landing-fullscreen');
    }, []);

        const outerPadding = action === 'login'
            ? { paddingTop: '40vh', paddingBottom: 20 }
            : { paddingTop: '6vh', paddingBottom: '6vh' };

        return(
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',gap:12,padding:20, background: terciary, minHeight:'100vh', width:'100%', boxSizing:'border-box', overflowX:'hidden', ...outerPadding}}>
            {action === "login" ? (
                <Login setAction={setAction} />
            ) : (
                <Signup setAction={setAction} />
            )}
            {action !== "loggedIn" && (
                <button onClick={() => setAction(action === "login" ? "signup" : "login")} style={{background:'transparent',border:`2px solid ${primary}`,color: "black",padding:'8px 12px',borderRadius:8,cursor:'pointer'}}> 
                    {action === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </button>
            )}
        </div>
    )
}

export default AuthPage;
