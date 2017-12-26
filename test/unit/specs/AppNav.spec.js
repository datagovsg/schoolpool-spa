import { createLocalVue } from 'vue-test-utils'
import AppNav from '@/components/AppNav'
import * as Func from '../handlers/fnc'

describe('AppNav.vue', () => {
  describe('success', () => {
    let wrapper
    let computedStub
    let createdStub
    describe('Check Login statuses', () => {
      const localVue = createLocalVue()
      computedStub = sinon.stub(AppNav, 'computed')
      createdStub = sinon.stub(AppNav, 'created')
      beforeEach(() => {
        wrapper = Func.default(
          AppNav,
          { localVue },
          null,
          false,
        )
      })
      afterEach(() => {
        computedStub.restore()
        createdStub.restore()
      })
      it('should show a login button because we are not logged in', () => {
        const loginBtn = wrapper.find('.button.is-primary')
        const buttonContent = loginBtn.children
        expect(buttonContent[1]).innerHTML.to.equal('Login')
      })

    })
  })
})
