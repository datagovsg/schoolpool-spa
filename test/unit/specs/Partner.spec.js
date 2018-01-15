import { expect } from 'chai'
import Partner from '@/components/Partner'
import * as Func from '../handlers/fnc'

import User from '../../../src/specs/models/User'
import * as SchoolSession from '../../../src/specs/sessions/school'

const stockImage = require('../../../src/assets/user.png')

describe('Partner.vue', () => {
  const profile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
  profile.latlong = {}
  profile.latlong.coordinates = [1.286, 76.20]
  profile.profileURL = stockImage
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
  describe('DOM elements', () => {
    let wrapper
    let schoolSessionStub
    beforeEach(() => {
      schoolSessionStub = sinon.stub(SchoolSession, 'default')
      wrapper = Func.default(
        Partner,
        { propsData: { profile } },
        [{ obj: schoolSessionStub, data: schoolResponse }],
        false,
      )
    })
    afterEach(() => {
      schoolSessionStub.restore()
    })

    it('has set the correct default data', () => {
      expect(typeof Partner.data).to.equal('function')
      const defaultData = Partner.data()
      expect(defaultData.showModal).to.equal(false)
      expect(defaultData.profileImage).to.equal('')
      expect(defaultData.school).to.equal('')
      expect(defaultData.children).to.equal(1)
    })

    it('renders the card and modal component', () => {
      expect(wrapper.vm.profile).to.equal(profile)
      expect(wrapper.vm.$el.children.length).to.equal(2)
    })

    it('renders the profile\'s information onto the card', async () => {
      const nameTextElement = wrapper.find('.card .media-content .title')
      expect(nameTextElement.element.textContent).to.equal(profile.name)
      const phoneNumberTextElement = wrapper.find('.card .media-content .subtitle')
      expect(phoneNumberTextElement.element.textContent).to.contain(profile.phoneNumber)
      const addressTextElement = wrapper.find('.card .content p')
      expect(addressTextElement.element.textContent).to.contain(profile.address)
      const childrenTextElement = wrapper.find('.columns .is-2 p')
      expect(childrenTextElement.element.textContent).to.equal('1')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      const schoolTextElement = wrapper.find('.columns .is-10 p')
      expect(schoolTextElement.element.textContent).to.equal('FAIRFIELD METHODIST SCHOOL (SECONDARY)')
    })

    it('shows the confirmation modal when \'UNPAIR\' button from card component is clicked', () => {
      // Trigger click event of UNPAIR button
      wrapper.find('.card button').trigger('click')
      expect(wrapper.vm.showModal).to.equal(true)
    })
  })

  describe('methods', () => {
    it('has a created hook', () => {
      expect(typeof Partner.created).to.equal('function')
    })

    it('correctly sets default data onto respective DOM elements', () => {
      const createdStub = sinon.stub(Partner, 'created')
      const wrapper = Func.default(
        Partner,
        { propsData: { profile } },
        [{ obj: createdStub, data: null }],
        false,
      )
      wrapper.setData({
        school: 'METHODIST GIRLS SCHOOL (SECONDARY)',
        profileImage: stockImage,
        children: 3,
        showModal: false,
      })
      const childrenTextElement = wrapper.find('.columns .is-2 p')
      expect(childrenTextElement.element.textContent).to.equal('3')
      const schoolTextElement = wrapper.find('.columns .is-10 p')
      expect(schoolTextElement.element.textContent).to.equal('METHODIST GIRLS SCHOOL (SECONDARY)')
      createdStub.restore()
    })
  })
})
