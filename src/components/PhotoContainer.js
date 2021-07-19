import React, {Component} from "react";

class PhotoContainer extends Component {

    render () {
        return (
            <div className="photo-container">
                <h2>{this.props.tag}</h2>
                <hr />
                <ul>
                    {
                        this.props.urls.map(url => (
                            <li>
                                <img src={url} alt="" />
                            </li>
                            )
                        )
                    }
                </ul>
                <hr />
            </div>
        )
    }
}

export default PhotoContainer;