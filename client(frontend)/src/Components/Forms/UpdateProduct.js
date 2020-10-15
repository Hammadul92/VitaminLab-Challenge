/** 
 * This component consists of underline functionalities:
 * User Login form asks for email and password, and both fields are sent to backend server for authentication
 * User details are sent back from server to frontend with jwt token if credentials are valid otherwise error is shown
 * User is redirected to dashboard component on authentication
 * Link to PID Digitization Demo takes user to Guest Demo Form
 */

import React from 'react';

import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import './Forms.css';
import {updateProduct, fetchProduct} from '../../store/actions';

class AddProduct extends React.Component{
    state = {
      id: null,
      product: null,
      name: "",
      price: "",
      description: "",
      image_url: "",
      file: null,
      previewUrl: null,
      fileErrorMessage: null,
      user: null,
      loading: false
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
                  this.setState({
                    loading: false, 
                    product: this.props.data.product,
                    name: this.props.data.product.product.name, 
                    price: this.props.data.product.product.price,
                    description: this.props.data.product.product.description,
                    image_url: this.props.data.product.product.image.url
                  })
              })
            })  
        }
    }
  }

  handleDocument(files){
    if(files[0].type === "image/jpeg" || files[0].type === "image/png" || files[0].type === "image/jpg"){
        this.setState({
            previewUrl: URL.createObjectURL(files[0]),
            file: files,
            fileErrorMessage: null
        })
    }else{
        this.setState({fileErrorMessage: "File type is not allowed (must be PNG, JPEG or JPG image)"})
    }      
  }


  updateProductDataHandler = (event) =>{
    event.preventDefault();
    if(this.state.user){
        if(this.state.user.token){
            this.setState({loading: true}, ()=>{ 
                let formData = new FormData();
                if(this.state.file){
                  formData.append('image', this.state.file[0]);
                }       
                formData.append('name', this.state.name);
                formData.append('price', this.state.price);
                formData.append('description', this.state.description)
                this.props.updateProduct(this.state.id, formData, this.state.user.token).then(
                  this.changeState 
                );
            })
        }    
    }
  }

  changeState = () => {
     this.setState({product: this.props.data.updated_product, loading: false}, () => {
         if(this.state.product){
             if(!this.state.product.error){
                 this.props.history.push('/products')
             }
         }
     });
  }



  changePage = () => {
      if(!this.state.user || this.state.user.error){
          this.props.history.push('/')
      }
  }

  renderButton(){
    if(this.state.loading){
      return <button type="submit" className="btn btn-info float-right" disabled> Edit <i className="fa fa-spinner fa-spin"></i> </button>;
    }
    return <button type="submit" className="btn btn-info float-right" > Edit </button>;
  }


	render(){
      return(
        <Auxilary>
                <div className="container mb-4 mt-4 auth-form">
                    <div className="row">
                      <div className="col-md-4 offset-md-4">
                        
                        <h2 className="mb-4 text-center"><b> Edit Product </b></h2>

                        { (this.state.product) ?
                          (this.state.product.error)?
                            <div className="alert alert-danger text-center" role="alert">
                                {this.state.product.error}
                            </div>
                            :
                            null
                          :null
                        }
                        
                        <form onSubmit={(event) => this.updateProductDataHandler(event)}>

                          <div className="form-group">
                            <input
                              type='text'
                              className={(this.state.name!=='')?"form-control filled": "form-control"}
                              value={this.state.name}
                              onChange={(event)=>this.setState({name: event.target.value})}
                              required
                            />
                            <label>Name</label>                            
                          </div>

                          <div className="form-group">
                            <input
                              type='number'
                              step="0.01"
                              className={(this.state.price!=='')?"form-control filled": "form-control"}
                              value={this.state.price}
                              onChange={(event)=>this.setState({price: event.target.value})}
                              required
                            />
                            <label>Price</label>                            
                          </div>

                          <div className="form-group">
                            <textarea
                              className={(this.state.description!=='')?"form-control filled": "form-control"}
                              value={this.state.description}
                              onChange={(event)=>this.setState({description: event.target.value})}
                              required
                            />
                            <label>Description</label>                            
                          </div>

                          <div className="form-group">
                            <Dropzone onDrop={acceptedFiles => this.handleDocument(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>                                
                                        {(this.state.file === null)?
                                            <div>
                                                <img src={`http://localhost:3000${this.state.image_url}`} className="img-fluid" alt={this.state.name} />
                                                <button {...getRootProps()} className="upload-content btn btn-success mt-4" type="button">
                                                    <input {...getInputProps()} multiple={false} />
                                                    Update Product Image <i className="fas fa-cloud-upload-alt"></i>                                                               
                                                </button>
                                                {(this.state.fileErrorMessage)? <p className="mt-2 text-danger">{this.state.fileErrorMessage}</p>: null}
                                            </div>
                                            :
                                            <div>
                                                <img src={this.state.previewUrl} className="img-fluid" alt="preview" />
                                                <div className="mt-4"> 
                                                    File Name: {this.state.file[0].name} 
                                                    <i className="text-danger" onClick={event => this.setState({file: null, previewUrl: null})} style={{cursor: 'pointer'}}> Remove </i>
                                                </div>
                                            </div>
                                        }
                                    </section>
                                )}  
                            </Dropzone>
                          </div>

                          <div className="form-group forgot clearfix">
                              {this.renderButton()}
                          </div>
   
                        </form>
                      </div>                  
                    </div>
                </div>
        </Auxilary>
			);
	}
}


const mapStateToProps = state => {
	return{
        data: state.Data
	}
};

export default connect(mapStateToProps, {fetchProduct, updateProduct})(AddProduct);
