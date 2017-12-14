import { mount, shallow } from 'vue-test-utils'
import { expect } from 'chai'
import moxios from 'moxios'
import sinon from 'sinon'
import Vue from 'vue'

import Settings from '@/components/Settings'
import User from '../../../src/specs/models/User'

describe('Settings.vue', () => {
  const profile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
  const propsData = { profile }

  describe('DOM elements', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(Settings, { propsData })
    })
    it('has a root element with class .columns', () => {
      expect(wrapper.is('.columns')).to.equal(true)
    })

    it('should contain 4 active form input fields', () => {
      const formElements = wrapper.findAll('form div.field input')
      expect(formElements.length).to.equal(4)
    })
  })

  describe('methods', () => {
    beforeEach(() => {
      moxios.install()
    })

    afterEach(() => {
      moxios.uninstall()
    })
    it('calls updateProfileInformation before mount and profile object is not empty', () => {
      const spy = sinon.spy(Settings.methods, 'updateProfileInformation')
      // * Mount component after declaration of spy
      const wrapper = shallow(Settings, { propsData })
      // Check for component props
      expect(wrapper.vm.$props).not.equal(null)
      Vue.nextTick().then(() => {
        expect(spy.calledOnce).to.equal(true)
        // Check if function was called with the profile object
        expect(spy.calledWith(propsData.profile)).to.equal(true)
      })
      spy.restore()
    })

    it('should trigger the onSubmit method when the save button is clicked', () => {
      const spy = sinon.spy(Settings.methods, 'onSubmit')
      const wrapper = mount(Settings, {
        propsData: {
          profile: {
            name: 'Joshua',
          },
        },
      })
      // Trigger click event of submit button
      wrapper.find('button').trigger('click')
      expect(spy.calledOnce).to.equal(true)
      expect(wrapper.vm.response).to.contain('Input fields are empty. Please fill them up and try again.')
      spy.restore()
    })


    it('should update form input fields after save button is clicked', (done) => {
      const spy = sinon.spy(Settings.methods, 'submitProfileHandler')
      const wrapper = mount(Settings, {
        propsData: {
          profile: {
            name: 'Joshua',
          },
        },
      })
      // Update form required fields
      wrapper.vm.address = '118998'
      wrapper.vm.phoneNumber = '93232454'
      wrapper.vm.school = 'FAIRFIELD'
      // Trigger click event of submit button
      wrapper.find('button').trigger('click')
      expect(spy.calledOnce).to.equal(true)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        console.log(request)
        request.respondWith({
          status: 200,
          response: {
            user: {
              name: 'Joshua',
              address: '118998',
              latlong: [1.03, 101.02],
              phoneNumber: '91123456',
              schoolAddress: ['139469'],
              pairedId: '',
              email: 'ratsjosh@outlook.com',
            },
          },
        }).then(() => {
          spy.restore()
          done()
        })
      })
    })
  })
})
