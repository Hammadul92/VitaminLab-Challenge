import React from 'react';
import './App.css';

import {connect} from 'react-redux';

import {Route, BrowserRouter} from 'react-router-dom';
import Auxilary from '../hoc/Auxilary/Auxilary.js'
import Navbar from './Navbar/Navbar.js';
import Signin from './Forms/Signin.js';
import Products from './Pages/Products';
import ViewProduct from './Pages/ViewProduct';
import AddProduct from './Forms/AddProduct';
import UpdateProduct from './Forms/UpdateProduct';



class App extends React.Component{

  state = {
    user: null
  }

  componentDidMount(){
    this.setState({user: this.props.data.user})
  }

  componentDidUpdate(props){
    if(this.props !== props){
      this.setState({user: this.props.data.user})
    }
    
  }

  render(){
    return(
      <Auxilary>    
        <BrowserRouter>
              <Navbar user={this.state.user} />
              {/* <Route path='/' exact render={(props) => <Home {...props} />} /> */}
              <Route path='/' exact component={Signin} />
              <Route path='/signin' exact component={Signin}/>
              <Route path='/products' exact component={Products}/>
              <Route path='/product/view' exact component={ViewProduct}/>
              <Route path='/add-product' exact component={AddProduct}/>
              <Route path='/product/edit' exact component={UpdateProduct}/>
        </BrowserRouter>
      </Auxilary>
    );
  }
  
};


const mapStateToProps = state => {
	return{
    data: state.Data
	}
};


export default connect(mapStateToProps, {})(App);
