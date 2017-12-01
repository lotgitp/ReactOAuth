import { connect } from 'react-redux'
import {
  fetchUnits,
  uploadUnit,
  removeUnit,
} from '../modules/unit'

import Unit from '../components/Unit'

const mapDispatchToProps = {
  loadUnits : () => fetchUnits(),
  addUnit: (unit) => uploadUnit(unit),
  removeUnit: (id) => removeUnit(id),
}

const mapStateToProps = (state) => ({
  unit : state.unit
})

export default connect(mapStateToProps, mapDispatchToProps)(Unit)
