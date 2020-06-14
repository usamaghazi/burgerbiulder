import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true,
        ings:null
    }
    componentDidMount(){
        const ing={
            ...this.props.ingredients
        }
        this.setState({ings:ing})
    }
    checkvalidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkvalidity(this.state.controls[controlName].value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);       
    }
    clickHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }
    render() {
        const formElementArry = [];
        for (let key in this.state.controls) {
            formElementArry.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            )
        }
        let from = formElementArry.map(formElement =>
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
        if (this.props.loading) {
            from = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style={{ color: 'red' }}>*{this.props.error.message}</p>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            const numl = Object.keys(this.state.ings)
            const pol = numl.map(key => { return this.state.ings[key] })
            const leg = pol.reduce((arr, el) => {
                return arr + el;

            }, 0);
            console.log('this is your count'+leg);
            if (leg === 0) {
                authRedirect = <Redirect to="/" />
            }

            else {
                authRedirect = <Redirect to="/checkout" />
            }
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    <p style={{ color: 'blue', marginLeft: '45%' }}><b>{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</b></p>

                    {from}
                    {errorMessage}
                    <Button btnType="Success">SUBMIT</Button>

                </form>
                <Button btnType="Danger"
                    clicked={this.clickHandler}>SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>);
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        ingredients: state.burgerBuilder.ingredients
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth); 
