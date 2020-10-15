import React from 'react';
import {connect} from 'react-redux';

import Auxilary from './../../hoc/Auxilary/Auxilary';
import './Forms.css';
import Dropzone from 'react-dropzone';
import {addProduct} from './../../store/actions';

class AddProduct extends React.Component{
    state = {
      name: "",
      price: "",
      description: "",
      product: null,
      user: null,
      file: null,
      previewUrl: null,
      fileErrorMessage: null,
      loading: false
	}

  componentDidMount(){
    this.setState({user: this.props.data.user}, this.changePage);
  }

  componentDidUpdate(props){
    if(this.props !== props){
      this.setState({user: this.props.data.user})
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

  addProductDataHandler = (event) =>{

    event.preventDefault();

    if(this.state.user){
        if(this.state.user.token){
            if(this.state.file){
              this.setState({loading: true}, ()=>{
                let formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('price', this.state.price);
                formData.append('description', this.state.description);
                formData.append('image', this.state.file[0]);
                this.props.addProduct(formData, this.state.user.token).then(
                 this.changeState 
                );
              })
            }else{
              this.setState({fileErrorMessage: "Product Image Required"});
            }
            
        }    
    }
  }

  changeState = () => {
     this.setState({product: this.props.data.new_product, loading: false}, () => {
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
      return <button type="submit" className="btn btn-info float-right" disabled> Add <i className="fa fa-spinner fa-spin"></i> </button>;
    }
    return <button type="submit" className="btn btn-info float-right" > Add </button>;
  }


	render(){
      return(
        <Auxilary>
                <div className="container mb-4 mt-4 auth-form">
                    <div className="row">
                      <div className="col-md-4 offset-md-4">
                        
                        <h2 className="mb-4 text-center"><b> Add Product </b></h2>

                        { (this.state.product) ?
                          (this.state.product.error)?
                            <div className="alert alert-danger text-center" role="alert">
                                {this.state.product.error}
                            </div>
                            :
                            null
                          :null
                        }
                        
                        <form onSubmit={(event) => this.addProductDataHandler(event)}>

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
                                                <button {...getRootProps()} className="upload-content btn btn-success" type="button">
                                                    <input {...getInputProps()} multiple={false} />
                                                    Product Image <i className="fas fa-cloud-upload-alt"></i>                                                               
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

export default connect(mapStateToProps, {addProduct})(AddProduct);
