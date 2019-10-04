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
    this.handleImageChange        = this.handleImageChange.bind(this)
  }

  handleImageChange(imageName) {
    console.log(imageName)
    this.setState({ selectedImage: imageName })
  }

  renderBannerImageOptions() {
    return(
      <div className="banner-img-options">
        { this.state.availableImages.map((imageName, idx) => {
          return(
            <img
              src={ require(`./Images/${ imageName }-thumb.jpg`) }
              alt={ imageName }
              onClick={ () => this.handleImageChange(imageName) }
            />)
          })
        }
    </div>
    )
  }
  //returned in a modal
  // modal props: title, content, close, submit, buttonText if other than 'send'
  // either default image selection or file upload availability
  render() {
    return(
      <Modal
        title="Update Banner Image"
        content={ this.renderBannerImageOptions() }
        buttonText="Update Image"
      />
    )
  }
}

export default ImageUpload
