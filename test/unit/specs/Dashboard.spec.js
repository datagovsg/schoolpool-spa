import Dashboard from '@/components/Dashboard'
import * as Func from '../handlers/fnc'
import User from '../../../src/specs/models/User'

describe('Dashboard.vue', () => {
  describe('Success test cases', () => {
    const profile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
    const pairedProfile = new User('Kok Foon', '118998', 1.03, 101.02, ['139469'], '98755412')
    describe('DOM elements with paired profile present', () => {
      let wrapper
      before(() => {
        wrapper = Func.default(
          Dashboard, { propsData: { profile, pairedProfile } },
          null,
          false,
        )
      })
      it('checks if data is inserted to the respective DOM elements', () => {
        const profileNameTextElement = wrapper.find('.title')
        expect(profileNameTextElement.element.textContent.trim()).to.equal('Hello, Joshua')
        const is6Column = wrapper.findAll('div.column.is-6')
        expect(is6Column.length).to.equal(2)
      })
    })


    describe('DOM elements without paired profile', () => {
      let wrapper
      before(() => {
        wrapper = Func.default(
          Dashboard, { propsData: { profile } },
          null,
          false,
        )
      })
      it('checks if data is inserted to the respective DOM elements', () => {
        const profileNameTextElement = wrapper.find('.title')
        expect(profileNameTextElement.element.textContent.trim()).to.equal('Hello, Joshua')
        const is6Column = wrapper.findAll('div.column.is-6')
        expect(is6Column.length).to.equal(1)
      })
    })
  })

  describe('failure test cases', () => {
    describe('user gets into Dashboard without their profile', () => {
      it('should fail because profile is not present', (done) => {
        try {
          const wrapper = Func.default(
            Dashboard, null,
            null,
            false,
          )
          done(wrapper)
        } catch (e) {
          expect(e).to.not.equal(null)
          done()
        }
      })
    })
  })
})
