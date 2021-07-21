import './App.css';
import {Route, Redirect, withRouter, Switch} from "react-router-dom";
import axios from "axios";
import apiKey from "./config";
import Search from "./components/Search";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";
import NotFound from "./components/NotFound";
import NoSearchResults from "./components/NoSearchResults";
import Loader from "./components/Loader";
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
        this.setState({
            tag: "",
            photoUrls: []
        });
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
            .then(res => res.data.photos.photo)
            .then(data => data.map(photoData => {
                let url = `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
                let key = photoData.id;
                urls.push({
                    url: url,
                    key: key
                });
                return true;
            }))
            .then(data =>
                this.setState({
                    tag: tag,
                    photoUrls: urls
                })
            )
            .then(() => {
                if (this.state.photoUrls.length === 0) {
                    this.props.history.push("/no-search-results");
                }
            });
    }

    handleSearch = (tag) => {
        const path = `/${tag}`;
        this.getPhotos(tag);
        this.props.history.push(path);
    };

    render() {
        if (this.state.tag === "") {
            return (
                <div className="App">
                    <Search handleSubmit={this.handleSearch} />
                    <Nav currentTag={this.state.tag} setPhotos={this.getPhotos} />
                    <Loader />
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Search handleSubmit={this.handleSearch} />
                    <Nav currentTag={this.state.tag} setPhotos={this.getPhotos} />
                    <Switch>
                        <Route exact path="/" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                        <Route path="/skydivers" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                        <Route path="/desierto" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                        <Route path="/お寺" render={() => <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />} />
                        <Route path="/no-search-results" component={() => <NoSearchResults />}/>
                        <Route path="/" render={() => {
                            if (this.state.tag === "skydivers") {
                                return <NotFound />
                            } else {
                                return <PhotoContainer tag={this.state.tag} urls={this.state.photoUrls} />
                            }
                        }
                        }/>
                    </Switch>
                </div>
            );
        }
    }
}

export default withRouter(App);
