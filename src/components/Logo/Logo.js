import React from 'react';
import burgerLogo from '../../assests/images/aaa.png';

const logo=(props)=>(
    <div style={{display:'flex'}}>
        <img 
        style={{width:'7%',marginLeft:'0%',borderRadius: 5}} 
        src={burgerLogo} alt="UsamaBurger"/>
        <p style={{color:'white',marginLeft:'10px',fontSize:15}}>
           <strong> SPICY BURGER </strong>
        </p>
    </div>
);

export default logo;