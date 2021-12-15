import React, { Component } from 'react'
import './AddProduct.scss'
import axios from 'axios'

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.addProduct = this.addProduct.bind(this)
    this.state = {
      product: {
        name: null,
        prices: null,
        status_id: null,
        quantity: null,
        category_id: null,
        image_url: null
      },
      category: []
    }
  }

  async componentDidMount() {
    this.getCategory()
  }

  async addProduct() {
    const body = {
      name: this.state.product.name,
      prices: this.state.product.prices,
      status_id: this.state.product.status_id,
      quantity: this.state.product.quantity,
      category_id: this.state.product.category_id,
      image_url: this.state.product.image_url
    }
    const response = await axios.post('https://localhost:44321/product/', body)
    console.log(response)
    this.props.isUpdated(true)
  }

  async getCategory() {
    const data = (await axios.get('https://localhost:44321/category')).data
    this.setState({
      category: data
    })
  }

  render() {
    return (
      <div id='addProduct'>
        <h1>Product Manager</h1>
        <div id="addProductMain">
          <div id="addProductFirstRow">
            <div className="group">
              <h4>Product Name</h4>
              <input className="product-input" type="text" value={this.state.product.name} onChange={(e) => this.state.product.name = e.target.value} />
            </div>
            <div className="group">
              <h4>Prices</h4>
              <input className="product-input" type="text" value={this.state.product.prices} onChange={(e) => this.state.product.prices = parseInt(e.target.value)} />
            </div>
            <div className="group">
              <h4>Status</h4>
              <select name="" id="select" onChange={(e) => this.state.product.status_id = parseInt(e.target.value)}>
                <option value="1" selected disabled hidden>Choose here</option>
                <option value='1'>in stock</option>
                <option value="2">out of stock</option>
              </select>
            </div>
          </div>
          <div id="addProductSecondRow">
            <div className="group">
              <h4>Quantity</h4>
              <input className="product-input" type="text" value={this.state.product.quantity} onChange={(e) => this.state.product.quantity = parseInt(e.target.value)} />
            </div>
            <div className="group">
              <h4>Category</h4>
              <select name="" id="select" onChange={(e) => this.state.product.category_id = parseInt(e.target.value)}>
                {
                  this.state.category.map((item) => {
                    return (
                      <>
                        <option value="1" selected disabled hidden>Choose here</option>
                        <option value={item.id}>{item.name}</option>
                      </>
                    )
                  })
                }
              </select>
            </div>
            <div className="group">
              <h4>Image URL</h4>
              <input className="product-input" type="text" value={this.state.product.image_url} onChange={(e) => this.state.product.image_url = e.target.value} />
            </div>
          </div>
          <div id="buttonBox">
            <button id='button' onClick={this.addProduct}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddProduct
