import React, { Component } from "react"
import Modal                from "../Modal/Modal.js"
import "./image-upload.css"

class ImageUpload extends Component {
  constructor() {
    super()
    this.state = {
      selectedImage: "",
      availableImages: ["building-plane", "plane-hills", "plane-stars", "qatar-plane", "winglet", ]
    }

    this.renderBannerImageOptions = this.renderBannerImageOptions.bind(this)
    this.handleBannerImageChange  = this.handleBannerImageChange.bind(this)
  }

  handleBannerImageChange(imageName) {
    this.props.submit(imageName)
  }

  renderBannerImageOptions() {
    return(
      <div className="banner-img-options">
        { this.state.availableImages.map((imageName, idx) => {
          return(
            <img
              key={ idx }
              src={ require(`./Images/${ imageName }-thumb.jpg`) }
              alt={ imageName }
              onClick={ () => this.handleBannerImageChange(imageName) }
            />)
          })
        }
    </div>
    )
  }

  // add rendering for profile image upload

  render() {
    return(
      <Modal
        title="Update Banner Image"
        content={ this.renderBannerImageOptions() }
        buttonText="Update Image"
        close={ this.props.close }
        submit={ this.props.submit }
      />
    )
  }
}

export default ImageUpload
