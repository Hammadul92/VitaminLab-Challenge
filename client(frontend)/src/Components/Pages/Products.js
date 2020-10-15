import React from 'react';

import {connect} from 'react-redux';
import ProductTile from './ProductTile';

import './pages.css'

import {fetchProducts, deleteProduct} from './../../store/actions';




class Products extends React.Component{

  state = {
   products: [],
   loading: false
  }

  componentDidMount(){
    this.setState({user: this.props.data.user}, () => {
        this.changePage();
        this.fetchProducts();
    })
  }

  fetchProducts(){
      if(this.state.user){
          if(this.state.user.token){
              this.setState({loading: true}, ()=>{
                this.props.fetchProducts(this.state.user.token).then(()=>{
                    this.setState({loading: false, products: this.props.data.products})
                })
              })  
          }
      }
  }



  changePage = () => {
      if(!this.state.user || this.state.user.error){
          this.props.history.push('/')
      }
  }

  deleteProduct = (id) => {
      if(this.state.user){
          if(this.state.user.token){
              this.props.deleteProduct(id, this.state.user.token).then(() =>{
                  this.fetchProducts();
              })
          }
      }
  }

  renderProducts(){
    if(this.state.loading){
      return <div className="col text-center mt-4 mb-4"><i className="fa fa-spinner fa-spin"></i></div>
    }else{
      if(this.state.products.length === 0){
        return <div className="col">There is no data.</div>
      }else{
        return this.state.products.map(product => {
          return(
            <ProductTile product={product} deleteProduct={this.deleteProduct} key={product.id} />
          )
        })
      }
    }
  }

  render(){
      console.log(this.state)
    return(
        <div className="container mt-4 mb-4">
            <h2 className="mb-4 mt-4"> Products </h2>
            <div className="row">
                {this.renderProducts()}
            </div>     
        </div>
    );
  }
  
};


const mapStateToProps = state => {
	return{
        data: state.Data
	}
};


export default connect(mapStateToProps, {fetchProducts, deleteProduct})(Products);
