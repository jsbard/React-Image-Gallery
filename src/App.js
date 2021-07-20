import './App.css';
import {Route, Redirect, withRouter, useHistory} from "react-router-dom";
import axios from "axios";
import apiKey from "./config";
import Search from "./components/Search";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";
import {Component} from "react";

class App extends Component {

    state = {
        tag: "",
        photoUrls: []
    }

    componentDidMount() {
        this.getPhotos("skydivers");
    }

    shouldComponentUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.getPhotos(prevProps.location.pathname.substring(1));
        }
        return true;
    }


    getPhotos = (tag) => {
        let urls = [];
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
            .then(res => res.data.photos.photo)
            .then(data => data.map(photoData => {
                let url = `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
                urls.push(url);
                return true;
            }))
            .then(data =>
                this.setState({
                    tag: tag,
                    photoUrls: urls
                })
            )
    }

    handleSearch = (tag) => {
        const path = `/${tag}`;
        this.getPhotos(tag);
        this.props.history.push(path);
    };

    render() {
        return (
                <div className="App">
                    <Search handleSubmit={this.handleSearch} />
                    <Nav currentTag={this.state.tag} setPhotos={this.getPhotos} />
                    <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />

                    <Route path="/" render={() => <Redirect to="/skydivers" />} />
                </div>
        );
    }
}

export default withRouter(App);
