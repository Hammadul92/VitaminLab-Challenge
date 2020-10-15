import React from 'react';
import {connect} from 'react-redux';

import {Link, NavLink} from 'react-router-dom';

import {Logout} from './../../store/actions';
import "./NavBar.css";
import Auxilary from './../../hoc/Auxilary/Auxilary';



class Navbar extends React.Component {

  state = {
    navCollapsed: true,
    user: null,
  }

  componentDidMount(){
    this.setState({user: this.props.user})
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({user: this.props.user})
    }
  }

  _onToggleNav = () => {
    this.setState({ navCollapsed: !this.state.navCollapsed })
  }

  logout = () => {
    this.props.Logout();
  }


  render(){
    const {navCollapsed} = this.state  
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link to="/signin" className="navbar-brand">
            VitaminLab Challenge
          </Link>
          <button
              onClick={this._onToggleNav}
              className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'}>
            {(this.state.user && !this.state.user.error)?
              <ul className="mr-auto navbar-nav">
                <li className="nav-item">
                  <NavLink to="/products" className="main" activeClassName="active"> Products </NavLink>     
                </li>
                <li className="nav-item">
                  <NavLink to="/add-product" className="main" activeclassname="active"> Add Product </NavLink>   
                </li>
              </ul>
              :null
            }
            <ul className="navbar-nav ml-auto">
              {(!this.state.user || this.state.user.error)?
                <li className="nav-item">
                  <NavLink to="/signin" className="main" activeClassName="active"> 
                    Sign In
                  </NavLink>
                </li>
                :
                <Auxilary>
                  <li className="nav-item">
                    <NavLink to="" className="main" activeClassName="active"> Welcome, {this.state.user.user.email} </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="" className="main" activeClassName="active" onClick={this.logout}> 
                      <i className="fa fa-power-off"></i> Logout </NavLink>
                  </li>
                </Auxilary>
              }
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}



export default connect(null, {Logout})(Navbar);

