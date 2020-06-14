import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
// import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: '',
                validation:{},
                valid:true
            },
        },
        formIsValid:false
       
    }

    orderHandler = (event) => {
        event.preventDefault();
       
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            localId:this.props.localId

        }
        this.props.onOrderBurger(order,this.props.idToken);

    }
    checkvalidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid= value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, identifier) => {
        const neworderForm = {
            ...this.state.orderForm
        }
        const newElement = {
            ...neworderForm[identifier]
        }
        newElement.value = event.target.value;
        newElement.valid = this.checkvalidity(newElement.value, newElement.validation);
        newElement.touched = true;
        neworderForm[identifier] = newElement;
       let formIsValid=true;
       for(let a in neworderForm){
            formIsValid=neworderForm[a].valid && formIsValid;
       }
        this.setState({ orderForm: neworderForm,
        formIsValid:formIsValid });
    }

    render() {
        const formElementArry = [];
        for (let key in this.state.orderForm) {
            formElementArry.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            )
        }
        let form = (<form onSubmit={this.orderHandler}>

            {formElementArry.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}
                style={{ marginLeft: '130px' }}>ORDER</Button>
        </form>);
        if (this.props.loading === true) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4 style={{ marginLeft: '130px' }}>Enter Your Contact Data</h4>
                {form}
            </div>);
    }

}
const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        idToken:state.auth.idToken,
        localId:state.auth.localId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger : (orderData,idToken) => dispatch(actions.purchaseBurger(orderData,idToken))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContactData));