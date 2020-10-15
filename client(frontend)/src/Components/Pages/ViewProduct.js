import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import './pages.css'

import {fetchProduct} from './../../store/actions';


class ViewProduct extends React.Component{

  state = {
      user: null,
      product: null,
      id: null
  }

  componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get('id');
    this.setState({user: this.props.data.user, id: id}, () => {
        this.changePage();
        this.fetchProduct();
    })
  }

  fetchProduct(){
      if(this.state.user){
          if(this.state.user.token){
              this.setState({loading: true}, ()=>{
                this.props.fetchProduct(this.state.id, this.state.user.token).then(()=>{
                    this.setState({loading: false, product: this.props.data.product})
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

  renderLineItems(){
      if(this.state.product.lineitems.length>0){
          return this.state.product.lineitems.map((lineitem)=>{
              return (
                  <div className="col-md-4 mb-2" key={lineitem.id}>
                      <b>Name:</b> {lineitem.name} <br/>
                      <b>Description:</b> {lineitem.description} <br/>
                      <b>Created At: </b> {lineitem.created_at} <br/>
                      <b>Updated At: </b> {lineitem.updated_at}
                  </div>
              )
          })
      }
  }


  renderProduct(){
    if(this.state.loading){
      return <div className="col text-center"><i className="fa fa-spinner fa-spin"></i></div>
    }else{
        if(this.state.product){
            if (this.state.product.error){
                return (<div>{this.state.product.error}</div>)
            }
            return(
                <div className="product-tile"> 
                    <div className="clearfix">
                        <Link to={`/product/edit?id=${this.state.product.product.id}`} className="btn btn-info float-right"> Edit </Link>
                        <h2>{this.state.product.product.name}</h2>        
                    </div>
                    
                    <div><img src={`http://localhost:3000${this.state.product.product.image.url}`} className="img-fluid" alt={this.state.name} /></div>

                    <hr/>
                    <b>Price: </b> $ {this.state.product.product.price} <br/>
                    <b>Description: </b> {this.state.product.product.description} <br/>
                    <b>Created At: </b> {this.state.product.product.created_at} <br/>
                    <b>Updated At: </b> {this.state.product.product.updated_at}
                    <hr/>

                    <h4> Line Items </h4>
                    <div className="row">{this.renderLineItems()}</div>

                    
                </div>
            )
        }
    }
  }

  render(){
      console.log(this.state.product)
    return(
        <div className="container mt-8 mb-8">
            {this.renderProduct()}   
        </div>
    );
  }
  
};


const mapStateToProps = state => {
	return{
        data: state.Data
	}
};


export default connect(mapStateToProps, {fetchProduct})(ViewProduct);
