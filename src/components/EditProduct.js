import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productEditAction } from '../actions/productsActions';
import { useHistory } from 'react-router-dom';

const EditProduct = () => {

    const [product, setProduct] = useState({
        name: '',
        price: 0
    })

    const productedition = useSelector(state => state.products.productedit);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setProduct(productedition)
    }, [productedition]);

    const onChangeForm = e => {
        setProduct({
            ...product, 
            [e.target.name] : e.target.value
        })
    }

    const { name, price } = product;

    const submitEdition = e => {
        e.preventDefault();

        dispatch( productEditAction(product) );

        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit Product
                        </h2>
                        <form
                            onSubmit={submitEdition}
                        >
                            <div className="form-group">
                                <label>Product name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="New product name"
                                    name="name"
                                    value={name}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>Product price</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="New product price"
                                    name="price"
                                    value={price}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditProduct;