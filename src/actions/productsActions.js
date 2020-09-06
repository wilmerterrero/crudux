import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCESS,
    GET_PRODUCT_EDIT,
    START_PRODUCT_EDITION,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

// New products
export function createNewProductAction(product){
    return async (dispatch) => {

        dispatch( addProduct() );

        try {
            //Post in API
            await axiosClient.post('/productos', product);

            //Update the state
            dispatch( addProductSuccess(product) );

            //SweetAlert
            Swal.fire(
                'Success',
                'The product is added correctly',
                'success'
            )

        } catch (error) {
            console.log(error)
            dispatch( addProductError(true) );

            //SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something happens, try again'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

const addProductError = status => ({
    type: ADD_PRODUCT_ERROR,
    payload: status
});

export function getProductsAction() {
    return async (dispatch) => {
        dispatch( getProducts() );
        try {
            const response = await axiosClient.get('/productos');
            dispatch(getProductsSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(getProductsError())
        }
    }
}

const getProducts = () => ({
    type: START_GET_PRODUCTS,
    payload: true
})

const getProductsSuccess = productos => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: productos
})

const getProductsError = () => ({
    type: GET_PRODUCTS_ERROR,
    payload: true
})

export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch( getProductOnDelete(id) );

        try {
            await axiosClient.delete(`/productos/${id}`);
            dispatch( deleteProductSuccess() );

            //If user delete product
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            );

        } catch (error) {
            console.log(error);
            dispatch( deleteProductError() );
        }
    }
}

const getProductOnDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id
})

const deleteProductSuccess = () => ({
    type: PRODUCT_DELETE_SUCCESS
})

const deleteProductError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload: true
})

export function editProductAction(product) {
    return (dispatch) => {
        dispatch(getProductAction(product))
    }
}

const getProductAction = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product
})

export function productEditAction(product) {
    return async (dispatch) => {
        dispatch( productEdit() )

        try {
            await axiosClient.put(`/productos/${product.id}`, product);
            dispatch( productEditionSuccess(product) )
        } catch (error) {
            console.log(error)
            dispatch( editProductError() )
        }

    }
}

const productEdit = () => ({
    type: START_PRODUCT_EDITION,
})

const productEditionSuccess = product => ({
    type: PRODUCT_EDIT_SUCCESS,
    payload: product
})

const editProductError = () => ({
    type: PRODUCT_EDIT_ERROR,
    payload: true
})

