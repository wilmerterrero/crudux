import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// REDUX ACTIONS
import { createNewProductAction } from '../actions/productsActions';
import { showAlertAction, hideAlertAction } from '../actions/alertActions';

const NewProduct = ({history}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const dispatch = useDispatch(); //always use dispatch for call actions functions

    //access to store state
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const alert = useSelector(state => state.alert.alert);

    const addProduct = product => dispatch( createNewProductAction(product) );

    const onSubmit = e => {
        e.preventDefault();

        //validation
        if(name.trim() === '' || price <= 0){
            
            const alert = {
                msg: 'Both fields are required',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch( showAlertAction(alert) );

            return;
        }

        //!errors
        dispatch( hideAlertAction() );

        //create new product
        addProduct({
            name,
            price
        });

        //move to index
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>
                        { alert ? <p className={alert.classes}>{alert.msg}</p> : null }
                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="form-group">
                                <label>Product name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Product name"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Product price</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Product price"
                                    name="price"
                                    value={price}
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100">Add</button>
                        </form>
                        { loading ? <p>Loading...</p> : null}
                        { error ? <p className="alert alert-danger text-center mt-4 p2">Something happens <span role="img" aria-label="error">😕</span></p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;