import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
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
        this.setCurrentPhotos("skydivers");
    }

    getPhotos = (tag) => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
            .then(res => res.data.photos.photo)
            .then(data => data.map(photoData => {
                let url = `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
                this.setState(prevState => ({
                    photoUrls: [...prevState.photoUrls, url]
                }));
            }));
    }

    setCurrentPhotos = (tag) => {
        this.setState({
            tag: tag,
            photoUrls: []
        });
        this.getPhotos(tag);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Search/>
                    <Nav setPhotos={this.setCurrentPhotos} />

                    <Switch>
                        <Route path="/" render={() => <Redirect to="/skydivers" />} />
                        <Route path="/skydivers" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                        <Route path="/desierto" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                        <Route path="/お寺" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                    </Switch>
                    </div>
            </BrowserRouter>
        );
    }
}

export default App;
