import { mount } from 'vue-test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import Vue from 'vue'

import Settings from '@/components/Settings'
import User from '../../../src/specs/models/User'

describe('Settings.vue', () => {
  const propsData = { profile: new User('Joshua', '1 Normanton Park 118998', 1.03, 101.02, ['139469'], '91123456') }

  describe('DOM elements', () => {
    const wrapper = mount(Settings, { propsData })
    it('has a root element with class .columns', () => {
      expect(wrapper.is('.columns')).to.equal(true)
    })

    it('should contain 4 active form input fields', () => {
      const formElements = wrapper.findAll('form div.field input')
      expect(formElements.length).to.equal(4)
    })

    it('renders the profile\'s information in the respective form input fields', () => {
      const formElementsArray = wrapper.findAll('form div.field input').wrappers
      expect(formElementsArray.length).to.equal(4)
      console.log(formElementsArray)
      for (let i = 0; i < formElementsArray.length; i++) {
        const inputElement = formElementsArray[i]
        console.log(inputElement.element)
      }
    })
  })

  describe('methods', () => {
    const wrapper = mount(Settings, { propsData })
    it('should return an empty profile object', () => {
      const result = wrapper.vm.updateUserInformation({})
      expect(result).to.equal(null)
    })

    it('calls updateUserInformation before mount and profile object is not empty', () => {
      const spy = sinon.spy(Settings.methods, 'updateUserInformation')
      // * Mount component after declaration of spy
      mount(Settings, { propsData })
      // Check for component props
      expect(wrapper.vm.$props).not.equal(null)
      Vue.nextTick().then(() => {
        expect(spy.calledOnce).to.equal(true)
        // Check if function was called with the profile object
        expect(spy.calledWith(propsData.profile)).to.equal(true)
      })
    })
  })
})
