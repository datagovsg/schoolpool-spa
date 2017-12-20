import { createLocalVue } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import Home from '@/components/Home'
import * as Func from '../handlers/fnc'

describe('Home.vue', () => {
  // Vue class to install plugins without polluting the global Vue class. Reference: https://vue-test-utils.vuejs.org/en/api/createLocalVue.html
  const localVue = createLocalVue()
  localVue.use(VeeValidate)
  // Mock emailjs global variable set at, main.js => line: 14
  const $emailjs = {
    init() {},
    send() {},
  }
  describe('DOM elements', () => {
    let wrapper
    beforeEach(() => {
      wrapper = Func.default(
        Home, {
          localVue,
          mocks: {
            $emailjs,
          },
        },
        null,
        false,
      )
    })
    it('has set the correct default data', () => {
      expect(typeof Home.data).to.equal('function')
      const defaultData = Home.data()
      expect(defaultData.name).to.equal('')
      expect(defaultData.email).to.equal('')
      expect(defaultData.feedback).to.equal('')
      expect(defaultData.feedbackResponse).to.equal('')
      expect(defaultData.inSubmitProcess).to.equal(false)
      expect(defaultData.isSuccessful).to.equal(false)
      expect(defaultData.hasSent).to.equal(false)
    })

    it('renders 4 different sections', () => {
      expect(wrapper.element.children.length).to.equal(4)
    })

    // it('does not successfully render google recaptcha', () => {
    //   const spy = sinon.spy(window, 'alert')
    //   Func.default(
    //     Home, {
    //       localVue,
    //       mocks: {
    //         $emailjs,
    //       },
    //     },
    //     null,
    //     false,
    //   )
    //   wrapper.setData({
    //     siteKey: 'fake data-sitekey',
    //   })
    //   expect(spy.called).to.equal(true)
    // })
  })

  describe('methods', () => {
    it('has a created hook', () => {
      expect(typeof Home.created).to.equal('function')
    })
  })
})
