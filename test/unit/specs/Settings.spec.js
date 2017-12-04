import { mount } from 'vue-test-utils'
import { expect } from 'chai'
import Vue from 'vue'

import Settings from '@/components/Settings'
import User from '../../../src/specs/models/User'

describe('Settings.vue', () => {
  const propsData = { profile: new User('Joshua', '1 Normanton Park 118998', 1.03, 101.02, ['139469']) }

  it('has a root element with class .columns', () => {
    const wrapper = mount(Settings, { propsData })
    expect(wrapper.is('.columns')).to.equal(true)
  })

  it('should contain 5 form elements', () => {
    const wrapper = mount(Settings, { propsData })
    const divElements = wrapper.findAll('form div.field')
    expect(divElements.length).to.equal(5)
  })


  it('calls updateUserInformation before mount', (done) => {
    const spy = sinon.spy(Settings.methods, 'updateUserInformation')
    mount(Settings, { propsData })
    Vue.nextTick(() => {
      try {
        done()
        // Assert
        spy.should.have.calledOnce()
      } catch (err) {
        done(err)
      }
    })
  })
})
