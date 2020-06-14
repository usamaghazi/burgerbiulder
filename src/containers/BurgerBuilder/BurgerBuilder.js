import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

    state = {

        purchasable: false,
        purchasing: false,
        sum: 0,
       //loading:false
    }
    componentDidMount() {
        console.log('usama');
        // axios.get('https://react-my-burger-2f446.firebaseio.com/ingredients.json')
        // .then(responce=>{
        //     this.setState({ingredients:responce.data})
        // });
        this.props.onInitIngredients();
        const date=new Date();
       const time= new Date(date.setSeconds(date.getSeconds()+3600));
        console.log('Expiration Time = '+time);
        const hel = new Date(time);
        console.log('this is'+hel);
        if(time>new Date()){
            console.log('good');
            console.log(new Date());
        }
        else{
            console.log('bad');
        }
        console.log(time.getTime()-new Date().getTime());
        
        
        
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({ purchasable: sum > 0 })
    }


    purchasingHandler = () => {
        this.setState({
            purchasing: true,
            sum: 0
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        const numl = Object.keys(this.props.ings)
        //console.log(numl);
        const pol = numl.map(key => { return this.props.ings[key] })
        const leg = pol.reduce((arr, el) => {
            return arr + el;

        }, 0);
        console.log('this is your count'+leg);
        if (leg === 0) {
            this.setState({ sum: 1 });
            console.log(this.state.sum);
        }
        else if(!this.props.isAuthenticated){
            this.props.history.push('/auth');
        }
        else {
            this.props.onInitPurchase();
            this.props.history.push('/checkout');
        }
    }

    // else{ alert('I am a rider'); }

    //                     }
    render() {
        let ordersumary = null;


        let burger = <Spinner />;
        if (this.props.ings) {
            const disabledInfo = {
                ...this.props.ings
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasble={this.state.purchasable}
                    ordered={this.purchasingHandler} />
            </Aux>)
            ordersumary = <OrderSummary ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                caso={this.state.sum}
                price={this.props.price} />;
        }
        // if (this.state.loading) {
        //     ordersumary = <Spinner />;
        // }


        return (

            <Aux>
                <Modal show={this.state.purchasing}>
                    {ordersumary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuthenticated:state.auth.idToken!==null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);