import React from 'react'
import PropTypes from 'prop-types'
import UnitCreate from './UnitCreate'

class Unit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowAddForm: false
    }

    // Bindings
    this.showAddForm = this.showAddForm.bind(this)
  }

  componentDidMount() {
    this.props.loadUnits()
  }

  showAddForm(isShow) {
    this.setState({
      isShowAddForm: isShow
    })
  }

  render() {
    const unitsTable = this.props.unit.map(u => {
      return (
        <tr key={u.id}>
          <td>{u.code}</td>
          <td>{u.title}</td>
          <td>{u.isavailable ? 'Y': 'N'}</td>
          <td>{u.category}</td>
          <td>{u.slug}</td>
          <td>{u.description}</td>
          <td><button onClick={this.props.removeUnit(u.id)}>Delete</button></td>
          <td><button onClick={this.props.editUnit(u.id)}>Edit</button></td>
        </tr>
      )
    })

    return (
      <div style={{textAlign: 'left'}}>
        {(this.state.isShowAddForm) && (
          <UnitCreate
            addUnit={this.props.addUnit}
            closeForm={() => this.showAddForm(false)}
          />
        )}
        {(this.state.isShowAddForm === false) && (
          <button onClick={(e) => this.showAddForm(true)}>Add New Unit</button>
        )}

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Is Available</th>
              <th>Category</th>
              <th>Slug</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {unitsTable}
          </tbody>
        </table>
      </div>
    )
  }
}

Unit.propTypes = {
  loadUnits: PropTypes.func.isRequired,
  removeUnit: PropTypes.func.isRequired
}

export default Unit
