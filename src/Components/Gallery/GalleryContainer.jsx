import React from 'react';
import {AddImgToGallery, OnSrcPostChange, getUserProfile} from "../../Redux/Galerey_reducer.js";
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class galleryContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2; 
        }
        this.props.getUserProfile(userId)
    }
    render() {
        return <>
            <Gallery GalleryPage={this.props.GalleryPage}  BlockPost={this.props.BlockPost}
                     profile={this.props.GalleryPage.profile} {...this.props} auth={this.props.auth}
                     updateImgURL={OnSrcPostChange} addPicture={AddImgToGallery}/>
            </>
    }
}
let mapStateToProps = (state) => {
    return{
        GalleryPage: state.GalleryPage,
        BlockPost: state.GalleryPage.BlockPost,
        profile: state.GalleryPage.profile,
        auth: state.auth.isAuth
    }
}

let WithRouterDataContainerComponent = withRouter(galleryContainer)
const GalleryContainer = connect(mapStateToProps, {getUserProfile, OnSrcPostChange, AddImgToGallery})(WithRouterDataContainerComponent)
export default GalleryContainer