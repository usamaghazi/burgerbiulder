import React, { Component } from "react";
import { connect } from 'react-redux';
//import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken,this.props.localId)
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            ))
        };
        return (
            <div>
                {orders}
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken:state.auth.idToken,
        localId:state.auth.localId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (idToken,localId) => dispatch(actions.fetchOrders(idToken,localId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);