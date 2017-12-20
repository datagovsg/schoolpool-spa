import { mount, shallow } from 'vue-test-utils'
import _ from 'lodash'

const prepMount = (component, data = {}, stubs = [], isMount = true) => {
  let wrapper = null
  if (_.every(stubs, _.isObject) && stubs !== null) {
    // Iterate through all of the stubs and resolve the associated data
    for (let i = 0; i < stubs.length; i++) {
      stubs[i].obj.resolves(stubs[i].data)
    }
  }
  wrapper = isMount ? mount(component, data) : shallow(component, data)
  return wrapper
}

export default prepMount
