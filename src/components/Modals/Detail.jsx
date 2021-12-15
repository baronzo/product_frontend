import axios from 'axios'
import React, { Component } from 'react'
import './Detail.scss'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: []
    }
  }

  async componentDidMount() {
    this.getProduct(this.props.id)
  }

  async getProduct(id) {
    let response = await axios.get(`https://localhost:44321/product/${id}`)
    this.setState({
      product: response.data
    })
    console.log(this.state.product)
  }

  render() {
    return (
      <div id='detail'>
        <div id="detailBox">
          <div id="closeBox">
            <div id="close" onClick={this.props.close}>X</div>
          </div>
          <h2 id='text'>Product Detail</h2>
          {this.state.product.map((item) => {
            return (
              <div id="productBox">
                <div className="show">Product Name : {item.name}</div>
                <div className="show">Prices : {item.prices} </div>
                <div className="show">Category : {item.category_id}</div>
                <div className="show">Quantity : {item.quantity}</div>
                <div className="show">Status : {item.status_id}</div>
                <div className="show">Image URL : {item.image_url}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Detail
