import { connect } from 'react-redux'
import {
  fetchUnits,
  uploadUnit,
} from '../modules/unit'

import Unit from '../components/Unit'

const mapDispatchToProps = {
  loadUnits : () => fetchUnits(),
  addUnit: (unit) => uploadUnit(unit),
}

const mapStateToProps = (state) => ({
  unit : state.unit
})

export default connect(mapStateToProps, mapDispatchToProps)(Unit)
