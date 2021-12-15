import axios from 'axios'
import React, { Component } from 'react'
import './submit.scss'

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async deleteItem(id) {
    const response = await axios.delete(`https://localhost:44321/product/${id}`)
    console.log(response)
    this.props.isUpdated(true)
    this.props.close()
  }

  render() {
    return (
      <div id='submitForm'>
        <div id="boxSubmit">
          <div id="box">
            <h2 id='text'>คุณต้องการลบข้อมูลใช่หรือไม่</h2>
            <div id="btnBox">
              <button id='cancel' onClick={this.props.close}>Cancel</button>
              <button id='discard' onClick={(e) => this.deleteItem(this.props.id)}>Discard</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Submit
