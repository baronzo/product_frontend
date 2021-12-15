import React, { Component } from 'react'
import './Edit.scss'
import axios from 'axios'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      name: null,
      prices: null,
      status_id: null,
      quantity: null,
      category_id: null,
      image_url: null,
      category: []
    }
  }

  async componentDidMount() {
    this.getProduct(this.props.id)
    this.getCategory()
  }

  async getProduct(id) {
    let response = await axios.get(`https://localhost:44321/product/${id}`)
    this.setState({
      product: response.data
    })
    console.log(this.state.product)
    this.state.product.forEach((item) => {
      this.setState({
        name: item.name,
        prices: item.prices,
        status_id: item.status_id,
        quantity: item.quantity,
        category_id: item.category_id,
        image_url: item.image_url
      })
    })
  }

  async getCategory() {
    const data = (await axios.get('https://localhost:44321/category')).data
    this.setState({
      category: data
    })
  }

  async editProduct(id) {
    const body = {
      name: this.state.name,
      prices: this.state.prices,
      status_id: this.state.status_id,
      quantity: this.state.quantity,
      category_id: this.state.category_id,
      image_url: this.state.image_url
    }
    const response = await axios.patch(`https://localhost:44321/product/${id}`, body)
    console.log(response)
    this.props.isUpdated(true)
    this.props.close()
  }

  render() {
    return (
      <div id='editModal'>
        <div id="editBox">
          {this.state.product.map((item) => {
            return(
              <div id="addProductMain">
                <div id="addProductFirstRow">
                  <div className="group">
                    <h4>Product Name</h4>
                    <input className="product-input" type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                  </div>
                  <div className="group">
                    <h4>Prices</h4>
                    <input className="product-input" type="text" value={this.state.prices} onChange={(e) => this.setState({prices: parseInt(e.target.value)})} />
                  </div>
                  <div className="group">
                    <h4>Status</h4>
                    <select name="" id="select" onChange={(e) => this.setState({status_id: parseInt(e.target.value)})} >
                      <option value="1" selected disabled hidden>Choose here</option>
                      <option value='1'>in stock</option>
                      <option value="2">out of stock</option>
                    </select>
                  </div>
                </div>
                <div id="addProductSecondRow">
                  <div className="group">
                    <h4>Quantity</h4>
                    <input className="product-input" type="text" value={this.state.quantity} onChange={(e) => this.setState({quantity: parseInt(e.target.value)})} />
                  </div>
                  <div className="group">
                    <h4>Category</h4>
                    <select name="" id="select" onChange={(e) => this.setState({category_id: parseInt(e.target.value)})} >
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
                    <input className="product-input" type="text" value={this.state.image_url} onChange={(e) => this.setState({image_url: e.target.value})} />
                  </div>
                </div>
                <div id="buttonBox">
                  <button id='cancel' onClick={this.props.close}>Cancel</button>
                  <button id='button' onClick={(e) => this.editProduct(this.props.id)}>Edit</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Edit
