import React from 'react';
import classes from './Burger.css';

import Burgeringrediant from './Burgeringredient/Burgeringredient';
const burger = (props) => {
  console.log(props);

    let transformIngredients =
    Object.keys(props.ingredients) 

    .map(igKey => {
      return  [...Array(props.ingredients[igKey])]
     
    .map((_,i)=>{
       return <Burgeringrediant key={igKey+i} type={igKey}/>
       
    });})
    .reduce((arr,el) => {
        return arr.concat(el)
        
    },[]);

    console.log(transformIngredients);
    
if(transformIngredients.length === 0)
{
  transformIngredients = <p>Please add the Ingredients</p>
}
    return(
         <div className={classes.Burger}>
             <Burgeringrediant type="bread-top"/>
            {transformIngredients}
             <Burgeringrediant type="bread-bottom"/>
             </div>
    );
}

export default burger;