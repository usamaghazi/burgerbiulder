import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
const toolbar = (props)=>(
<header className={classes.Toolbar}>
    <Logo/>  
    <nav>
       <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
</header>
);

export default toolbar;

