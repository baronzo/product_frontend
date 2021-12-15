import React, { Component } from 'react'
import './TableProducts.scss'
import AddProduct from './AddProduct'
import { FaSearch, FaTrash } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import axios from 'axios'
import Submit from './Modals/submit'
import Detail from './Modals/Detail'
import Edit from './Modals/Edit'

class TableProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProducts: [],
      showDelete: false,
      showDetail: false,
      showEdit: false,
      delete: 0,
      detail: 0,
      edit: 0
    }
  }

  async componentDidMount() {
    this.getAllProduct()
  }

  async getAllProduct() {
    const data = (await axios.get('https://localhost:44321/product/')).data
    this.setState({
      allProducts: data
    })
  }

  handleUpdated = (isUpdated) => {
    if (isUpdated) {
      this.getAllProduct()
    }
  }

  showModalDelete = (id) => {
    this.setState({
      showDelete: true,
      delete: id
    })
  }

  showDetail = (id) => {
    this.setState({
      showDetail: true,
      detail: id
    })
  }

  showEdit = (id) => {
    this.setState({
      showEdit: true,
      edit: id
    })
  }

  closeChild = () => {
    this.setState({
      showDelete: false,
      showDetail: false,
      showEdit: false
    })
  }

  render() {
    return (
      <div id='tableProducts'>
        <AddProduct isUpdated={this.handleUpdated}/>
        <table className='table'>
          <thead className='column-header'>
            <tr>
              <th className='header id'>ID</th>
              <th className='header image'>Image</th>
              <th className='header name'>Product Name</th>
              <th className='header prices'>Prices</th>
              <th className='header quantity'>Quantity</th>
              <th className='header status'>Status</th>
              <th className='header action'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.allProducts.map((product, index) => {
                return (
                  <tr key={index+1}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={product.image_url} alt={product.name} style={{width: '100px'}}/>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.prices}</td>
                    <td>{product.quantity}</td>
                    <td>{product.status_id}</td>
                    <td>
                      <div className='icon'>
                        <button className='btn-icon' onClick={(e) => this.showDetail(product.id)}>
                          <FaSearch />
                        </button>
                        <button className='btn-icon' onClick={(e) => this.showEdit(product.id)}>
                          <AiFillEdit />
                        </button>
                        <button className='btn-icon' onClick={(e) => this.showModalDelete(product.id)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {this.state.showDelete ? <Submit id={this.state.delete} close={this.closeChild} isUpdated={this.handleUpdated} /> : ''}
        {this.state.showDetail ? <Detail id={this.state.detail} close={this.closeChild} /> : ''} 
        {this.state.showEdit ? <Edit id={this.state.edit} close={this.closeChild} isUpdated={this.handleUpdated} /> : ''} 
      </div>
    )
  }
}

export default TableProducts
