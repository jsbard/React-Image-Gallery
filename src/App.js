import './App.css';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.tag !== prevState.tag && prevState !== "") {
            this.getPhotos(this.state.tag);

            window.onpopstate = e => {
                e.preventDefault();
                this.getPhotos(prevState.tag);
            }
        }
    }


    getPhotos = (tag) => {
        let urls = [];
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
            .then(res => res.data.photos.photo)
            .then(data => data.map(photoData => {
                let url = `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
                urls.push(url);
            }))
            .then(data =>
                this.setState({
                    tag: tag,
                    photoUrls: urls
                })
            )
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Search/>
                    <Nav currentTag={this.state.tag} setPhotos={this.getPhotos} />
                    <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />

                    <Route path="/" render={() => <Redirect to="/skydivers" />} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
