import React from 'react';

import {connect} from 'react-redux';

import Auxilary from './../../hoc/Auxilary/Auxilary';
import './Forms.css';
import {loginUser} from './../../store/actions';

class Login extends React.Component{
    state = {
      email: "",
      password: "",
      user: null,
      loading: false
	}

  componentDidMount(){
    this.setState({user: this.props.data.user}, this.changePage);
  }

  loginDataHandler = (event) =>{

    event.preventDefault();

    this.setState({loading: true}, ()=>{
      this.props.loginUser(this.state.email, this.state.password).then(
      this.changeState 
    );
    })
 
  }

  changeState = () => {
     this.setState({user: this.props.data.user, loading: false}, this.changePage );
  }


  changePage = () => {
    if(this.state.user && !this.state.user.error){
      this.props.history.push('/products');
    }
  }

  renderButton(){
    if(this.state.loading){
      return <button type="submit" className="btn btn-info float-right" disabled> Sign in <i className="fa fa-spinner fa-spin"></i> </button>;
    }
    return <button type="submit" className="btn btn-info float-right" > Sign in </button>;
  }


	render(){
      return(
        <Auxilary>
                <div className="container mb-8 mt-8 auth-form">
                    <div className="row">
                      <div className="col-md-4 offset-md-4">
                        
                        <h2 className="mb-4 text-center"><b>Welcome! </b></h2>

                        { (this.state.user) ?
                          (this.state.user.error)?
                            <div className="alert alert-danger text-center" role="alert">
                                {this.state.user.error}
                            </div>
                            :
                            null
                          :null
                        }
                        
                        <form onSubmit={(event) => this.loginDataHandler(event)}>

                          <div className="form-group">
                            <input
                              type='email'
                              className={(this.state.email!=='')?"form-control filled": "form-control"}
                              value={this.state.email}
                              onChange={(event)=>this.setState({email: event.target.value})}
                              required
                            />
                            <label>Email</label>                            
                          </div>

                          <div className="form-group">
                            
                            <input
                                type='password'
                                className={(this.state.password!=='')?"form-control filled": "form-control"}
                                value={this.state.password}
                                onChange={(event)=>this.setState({password: event.target.value})}
                                onClick={(event)=>this.setState({errorMessage: null})}
                                required
                            />
                            <label>Password</label>
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

export default connect(mapStateToProps, {loginUser})(Login);
