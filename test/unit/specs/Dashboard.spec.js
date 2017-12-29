import Dashboard from '@/components/Dashboard'
import * as Func from '../handlers/fnc'
import User from '../../../src/specs/models/User'

describe('Dashboard.vue', () => {
  describe('success', () => {
    const profile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
    const pairedProfile = new User('Kok Foon', '118998', 1.03, 101.02, ['139469'], '98755412')
    describe('DOM elements', () => {
      describe('paired profile present', () => {
        let wrapper
        before(() => {
          wrapper = Func.default(
            Dashboard, { propsData: { profile, pairedProfile } },
            null,
            false,
          )
        })
        it('inserts into the respective DOM elements', () => {
          const profileNameTextElement = wrapper.find('.title')
          expect(profileNameTextElement.element.textContent.trim()).to.equal('Hello, Joshua')
          const is6Column = wrapper.findAll('div.column.is-6')
          expect(is6Column.length).to.equal(2)
        })
      })


      describe('paired profile absent', () => {
        let wrapper
        before(() => {
          wrapper = Func.default(
            Dashboard,
            { propsData: { profile } },
            null,
            false,
          )
        })
        it('inserts data into the respective DOM elements', () => {
          const profileNameTextElement = wrapper.find('.title')
          expect(profileNameTextElement.element.textContent.trim()).to.equal('Hello, Joshua')
          const is6Column = wrapper.findAll('div.column.is-6')
          expect(is6Column.length).to.equal(1)
        })
      })
    })
  })

  describe('failure', () => {
    describe('DOM elements', () => {
      it('does not mount the component successfully', (done) => {
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
