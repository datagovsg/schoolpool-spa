import { mount, shallow } from 'vue-test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import _ from 'lodash'
import Vue from 'vue'

import Settings from '@/components/Settings'
import User from '../../../src/specs/models/User'
import * as SchoolSession from '../../../src/specs/sessions/school'

describe('Settings.vue', () => {
  // Declare const variables
  const updatedProfile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
  updatedProfile.latlong = {}
  updatedProfile.latlong.coordinates = [1.286, 76.20]
  const newProfile = {
    name: 'Joshua',
    email: 'scubnovice@gmail.com',
  }
  const schoolResponse = {
    data: {
      result: {
        records: [
          {
            school_name: 'FAIRFIELD METHODIST SCHOOL (SECONDARY)',
            postal_code: '139469',
          },
        ],
      },
    },
  }
  const prepMount = (data, stubs = [], isMount = true) => {
    let wrapper = null
    let propsData = null
    if (_.every(stubs, _.isObject) && stubs !== null) {
      // Iterate through all of the stubs and resolve the associated data
      for (let i = 0; i < stubs.length; i++) {
        stubs[i].obj.resolves(stubs[i].data)
      }
    }
    propsData = data
    wrapper = isMount ? mount(Settings, { propsData }) : shallow(Settings, { propsData })
    return wrapper
  }

  describe('DOM elements', () => {
    let wrapper
    let addMarkerStub
    let schoolSessionStub
    beforeEach(() => {
      addMarkerStub = sinon.stub(Settings.methods, 'addMarker')
      schoolSessionStub = sinon.stub(SchoolSession, 'default')
      wrapper = prepMount(
        { profile: updatedProfile },
        [
          { obj: addMarkerStub },
          { obj: schoolSessionStub, data: schoolResponse },
        ],
      )
    })
    afterEach(() => {
      addMarkerStub.restore()
      schoolSessionStub.restore()
    })

    it('has a created hook', () => {
      expect(typeof Settings.created).to.equal('function')
    })

    it('has a root element with class .columns', (done) => {
      expect(wrapper.is('.columns')).to.equal(true)
      done()
    })

    it('should contain 4 active form input fields', (done) => {
      const formElements = wrapper.findAll('form div.field input')
      expect(formElements.length).to.equal(4)
      done()
    })

    it('form elements should contain registered profile information', async () => {
      expect(wrapper.vm.profile).to.be.an('object')
      await setTimeout(() => {}, 10)
      expect(wrapper.vm.phoneNumber).to.equal('91123456')
      expect(wrapper.vm.address).to.equal('118998')
      expect(wrapper.vm.school).to.equal('FAIRFIELD METHODIST SCHOOL (SECONDARY)')
    })
  })

  describe('methods', () => {
    it('calls updateProfileInformation before mount and profile object is not empty', (done) => {
      const spy = sinon.spy(Settings.methods, 'updateProfileInformation')
      const schoolSessionStub = sinon.stub(SchoolSession, 'default')
      const wrapper = prepMount(
        { profile: updatedProfile },
        [{ obj: schoolSessionStub, data: schoolResponse }],
        false,
      )
      // Check for component props
      expect(wrapper.vm.$props).not.equal(null)
      expect(spy.calledOnce).to.equal(true)
      // Check if function was called with the profile object
      expect(spy.calledWith(updatedProfile)).to.equal(true)
      spy.restore()
      SchoolSession.default.restore()
      done()
    })

    it('should trigger the onSubmit method when the save button is clicked', (done) => {
      const spy = sinon.spy(Settings.methods, 'onSubmit')
      const wrapper = prepMount({ profile: newProfile }, null, null, false)
      // Trigger click event of submit button
      wrapper.find('button').trigger('click')
      // Check that onSubmit method is called
      expect(spy.calledOnce).to.equal(true)
      expect(wrapper.vm.response).to.contain('Input fields are empty. Please fill them up and try again.')
      spy.restore()
      done()
    })

    it('should successfully update profile object after save button is clicked', (done) => {
      const submitProfileHandlerStub = sinon.stub(Settings.methods, 'submitProfileHandler')
      const schoolSessionStub = sinon.stub(SchoolSession, 'default')
      const wrapper = prepMount(
        { profile: updatedProfile },
        [
          { obj: submitProfileHandlerStub, data: updatedProfile },
          { obj: schoolSessionStub, data: schoolResponse },
        ],
      )
      // Update form required fields
      wrapper.vm.address = '118998'
      wrapper.vm.phoneNumber = '93232454'
      wrapper.vm.school = 'FAIRFIELD'
      // // Trigger click event of submit button
      wrapper.find('button').trigger('click')
      Vue.nextTick(() => {
        expect(wrapper.vm.response).to.equal('data has been updated successfully!')
        submitProfileHandlerStub.restore()
        schoolSessionStub.restore()
        done()
      })
    })
  })
})
