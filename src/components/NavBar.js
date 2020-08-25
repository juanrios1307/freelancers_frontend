import React,{Component} from 'react';
import '../assets/css/Navbar.css';
class navBar extends Component {
    render(){
        return (
            <div className="navbar">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <a className="navbar-brand" href="#">Quick Services</a>
                    </div>

                    <div className="mx-auto order-0">
                        <form className="navbar-form navbar-left my-2 my-lg-0 form-inline">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Buscar"/>

                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                            <i className="fa fa-search"></i>
                                </button>

                            </div>
                        </form>

                    </div>

                    <div className="navbar-collapse collapse w-100 order-1 dual-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>


            </div>
        );
    }
}
export default navBar;