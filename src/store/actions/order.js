import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const purchaseBurgerSuccess =(id, orderData)=> {
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{
        return{
            type:actionTypes.PURCHASE_BURGER_FAIL,
            error:error
        }

}
export const purchaseBurgerStart =() =>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData,idToken) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+idToken, orderData)
            .then(responce => {
              dispatch(purchaseBurgerSuccess(responce.data,orderData));
            })
            .catch(error => { 
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
 
export const fetchOrdersSucess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCESS,
        orders:orders
    }
}
export const fetchOrdersFail = (error) => {
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const fetchOrdersStart = () => {
    return{
        type:actionTypes.PURCHASE_BURGER_START,
        
    }
}

export const fetchOrders = (idToken,localId) =>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        const queryParam='?auth='+idToken+'&orderBy="localId"&equalTo="'+localId+'"'
        axios.get('/orders.json'+queryParam)
        .then(res => {
            const fetchedorders=[];
            for(let key in res.data)
            {
                fetchedorders.push({
                    ...res.data[key],
                    id:key
                })
            }
              dispatch(fetchOrdersSucess(fetchedorders));
              
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}