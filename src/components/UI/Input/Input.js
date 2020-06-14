import React from 'react'
import classes from './Input.css';
const input = (props) => {
    let inputElement = null;
    const inputclasses =[classes.InputElement];
    if(props.inValid && props.shouldValidate && props.touched){
        inputclasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputclasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputclasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputElement = <select
                className={inputclasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
            inputElement = <input
                className={inputclasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }
    return (

        <div className={classes.Input}>
            <label className={classes.Label}>{props.lable}</label>
            {inputElement}
        </div>
    );

}
export default input;