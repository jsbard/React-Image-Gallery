import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Nav extends Component {

    render () {
        return (
            <nav className="main-nav">
                <ul>
                    <NavLink to="/skydivers" onClick={() => this.props.setPhotos("skydivers")}>Skydivers</NavLink>
                    <NavLink to="/desierto" onClick={() => this.props.setPhotos("desierto")}>Desierto</NavLink>
                    <NavLink to="/お寺" onClick={() => this.props.setPhotos("お寺")}>お寺</NavLink>
                </ul>
            </nav>
        )
    }
}

export default Nav;