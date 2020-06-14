import React, { Component } from 'react';
import Model from '../../components/UI/Modal/Modal';
import Aux from '../Aux';
const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component{
        state={
            error:null
        }
    componentWillMount(){
     axios.interceptors.request.use(req=>{
         this.setState({error:null});
         return req;
     });
        axios.interceptors.responce.use(res=>res,error=>{
            this.setState({error:error});
        });
    }

        render(){
           return(
               <Aux>
                   <Model show={this.state.error}>
                    {this.state.error? this.state.error.message:null}
                   
                   </Model>

             <WrappedComponent {...this.props}/>
             </Aux>
           )
        
    }
}
}

export default withErrorHandler;