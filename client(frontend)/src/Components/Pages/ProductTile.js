import React from 'react';
import {Link} from 'react-router-dom';

const ProductTile = (props) => {
  return(
    <div className="col-md-4 mb-4">
        <div className="product-tile">
            <img src={`http://localhost:3000${props.product.image.url}`} className="img-fluid" alt={props.product.name} />
            <div className="clearfix mt-2">
                <Link to={`/product/edit?id=${props.product.id}`} className="btn btn-info btn-sm float-right">Edit </Link>
                <Link to={`/product/view?id=${props.product.id}`} className="btn btn-success btn-sm float-right mr-2"> View </Link>
                <h5>{props.product.name} </h5>
            </div>   
            <h5>$ {props.product.price}</h5>
            <div>{props.product.description}</div>
          
            <div className="clearfix mt-2">
                <button className="btn btn-danger btn-sm float-right" onClick={(event)=> props.deleteProduct(props.product.id)}> Delete </button>
            </div> 
        </div>
    </div>
  );
};

export default ProductTile;
