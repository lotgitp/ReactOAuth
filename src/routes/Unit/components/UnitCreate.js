import React from 'react'
import PropTypes from 'prop-types'

class UnitCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      code: '99',
      title: '',
      isavailable: false,
      category: 1,
      slug: '',
      description: ''
    }

    // Bindings
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e, value) {
    e.preventDefault()

   this.setState({
    [value]: e.target.value
   })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.addUnit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Code:
          <input
            type="text"
            value={this.state.code}
            onChange={(e) => this.handleChange(e, 'code')}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            value={this.state.title}
            onChange={(e) => this.handleChange(e, 'title')}
          />
        </label>
        <br />
        <label>
          Available:
          <select name="selectAvailable" onChange={(e) => this.handleChange(e, 'isavailable')}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <br />
        <label>
          Category:
          <input
            type="number"
            value={this.state.category}
            onChange={(e) => this.handleChange(e, 'category')}
          />
        </label>
        <br />
        <label>
          Slug:
          <input
            type="text"
            value={this.state.slug}
            onChange={(e) => this.handleChange(e, 'slug')}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={this.state.description}
            onChange={(e) => this.handleChange(e, 'description')}
          />
        </label>
        <br />
        <input
          type='submit'
          value='Submit Unit'
        />
      </form>
    )
  }
}

UnitCreate.propTypes = {
  addUnit: PropTypes.func.isRequired
}

export default UnitCreate
