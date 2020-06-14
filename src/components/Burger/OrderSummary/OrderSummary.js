import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const ordersummary =(props) =>  {
const ingredentSummary = Object.keys(props.ingredients)
.map(igkey=> {
    return <li key={igkey}>
        <span style={{textTransform:'capitalize'}}>{igkey}</span>:
        
        {props.ingredients[igkey]}
    </li>;
}
    );
 const a=props.caso;
 let abc=null;
 if (a === 1) {
     abc = <p style={{color:'red',fontSize:20}}>*Please add Ingredients</p> 
 }
  
return(
        <Aux>
            <h3>
                Your Order
                
                </h3>
                <p>
                    A delicious burger with following ingredients
                </p>
                <ul>
                        {ingredentSummary}
                    </ul>
          <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                    <p>Continue to CheckOut</p>
                   {abc}
                   <br/>
                    <Button btnType="Danger"
                    clicked={props.purchaseCancelled}>CANCEL</Button>
                    <Button btnType="Success"
                    clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
);

}
export default ordersummary;