import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { deleteProductAction, editProductAction } from '../actions/productsActions';

const Product = ({product}) => {

    const {name, price, id} = product;

    const dispatch = useDispatch();
    const history = useHistory();

    //Confirm delete
    const confirmDeleteProduct = id => {
        //ask to user
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {

              //action
              dispatch( deleteProductAction(id) );

            }
          });
    }

    //redirect programmatically
    const redirectEdit = product => {
        dispatch( editProductAction(product) );
        history.push(`/products/edit/${product.id}`)
    }

    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">$ {price}</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={() => redirectEdit(product)}
                    className="btn btn-primary mr-2"
                >Edit</button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(id)}
                >Delete</button>
            </td>
        </tr>
     );
}
 
export default Product;