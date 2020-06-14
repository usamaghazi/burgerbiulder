import React,{Component} from 'react';
import Aux from '../hoc/Aux';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../components/Navigation/Toolbar';
class Layout extends Component {
    render(){
        return( <Aux>
                    <Toolbar isAuth={this.props.isAuthenticated}/>
                    <main className={classes.Content}>
                       {this.props.children}
                        </main>
                </Aux>);
    }
}
const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.idToken!==null
    };
}
export default connect(mapStateToProps)(Layout);