import { createLocalVue } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import Home from '@/components/Home'
import * as Func from '../handlers/fnc'

describe('Home.vue', () => {
  // Vue class to install plugins without polluting the global Vue class. Reference: https://vue-test-utils.vuejs.org/en/api/createLocalVue.html
  const localVue = createLocalVue()
  localVue.use(VeeValidate)
  describe('DOM elements', () => {
    let wrapper
    // Mock emailjs global variable set at, main.js => line: 14
    const $emailjs = {
      init() {},
      send() {},
    }
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
  })

  describe('methods', () => {
    it('has a created hook', () => {
      expect(typeof Home.created).to.equal('function')
    })

    it('triggers the onSubmit method when the \'Submit\' button is clicked', async () => {
      const spy = sinon.spy(Home.methods, 'onSubmit')
      const wrapper = Func.default(
        Home, {
          localVue,
          mocks: {
            $emailjs: {
              init() {},
              send() {},
            },
          },
        },
        null,
        false,
      )
      wrapper.find('#feedbackBtn').trigger('click')
      await wrapper.vm.$nextTick()
      expect(spy.calledOnce).to.equal(true)
      spy.restore()
    })

    it('successfully sends an email to the user', async () => {
      const validateAllStub = sinon.stub(VeeValidate.Validator.prototype, 'validateAll')
      const wrapper = Func.default(
        Home, {
          localVue,
          mocks: {
            $emailjs: {
              init() {},
              send() {
                return new Promise(((resolve) => {
                  resolve()
                }))
              },
            },
          },
        },
        [{ obj: validateAllStub, data: true }],
        false,
      )
      wrapper.find('#feedbackBtn').trigger('click')
      // wait for vee-validator to be completed
      await wrapper.vm.$nextTick()
      // wait for emailjs response
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isSuccessful).to.equal(true)
      validateAllStub.restore()
    })

    it('catches errors related to sending an email', async () => {
      const wrapper = Func.default(
        Home, {
          localVue,
          mocks: {
            $emailjs: {
              init() {},
              send() {
                return new Promise(((resolve, reject) => {
                  const error = {
                    error: 'Error test message',
                  }
                  const res = {
                    text: JSON.stringify(error),
                  }
                  reject(res)
                }))
              },
            },
          },
        },
        null,
        false,
      )
      wrapper.find('#feedbackBtn').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isSuccessful).to.equal(false)
    })

    it('catches validation errors pertaining to feedback form', async () => {
      const validateAllSpy = sinon.spy(VeeValidate.Validator.prototype, 'validateAll')
      const wrapper = Func.default(
        Home, {
          localVue,
          mocks: {
            $emailjs: {
              init() {},
            },
          },
        },
        null,
        false,
      )
      wrapper.find('#feedbackBtn').trigger('click')
      await wrapper.vm.$nextTick()
      expect(validateAllSpy.calledOnce).to.equal(true)
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.feedbackResponse).to.equal('Please ensure that all input fields are filled.')
      validateAllSpy.restore()
    })
  })
})


// const validateAllStub = sinon.stub(VeeValidate.Validator.prototype, 'validateAll')
// const wrapper = Func.default(
//   Home, {
//     localVue,
//     mocks: {
//       $emailjs,
//     },
//   },
//   [{ obj: validateAllStub, data: false }],
//   false,
// )
// wrapper.find('#feedbackBtn').trigger('click')
// await wrapper.vm.$nextTick()
// expect(wrapper.vm.feedbackResponse).to.equal('Please ensure that all input fields are filled.')
