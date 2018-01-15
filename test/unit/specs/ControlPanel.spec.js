import { shallow } from 'vue-test-utils'
import Router from 'vue-router'
import flushPromises from 'flush-promises'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ControlPanel from '@/components/ControlPanel'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import * as Func from '../handlers/fnc'
import User from '../../../src/specs/models/User'

const stockImage = require('../../../src/assets/user.png')

describe('ControlPanel.vue', () => {
  const profile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
  profile.id = 'fakeId'
  describe('DOM elements', () => {
    let wrapper
    let createdStub
    beforeEach(() => {
      const newRouter = new Router({
        routes: [
          {
            path: '/control-panel',
            component: ControlPanel,
            children: [
              { path: '', name: 'ControlPanel', redirect: '/control-panel/dashboard' },
              { path: 'dashboard', name: 'Dashboard', component: Dashboard },
              { path: 'settings', name: 'Settings', component: Settings },
            ],
          },
        ],
      })
      createdStub = sinon.stub(ControlPanel, 'created')
      newRouter.replace('control-panel')
      wrapper = Func.default(
        ControlPanel,
        {
          router: newRouter,
        },
        [{ obj: createdStub, data: null }],
      )
      // expect the spinner component to be displayed until profile data is set to a value
      expect(wrapper.element.children.length).to.equal(2)
      wrapper.setData({
        profile,
      })
    })

    afterEach(() => {
      createdStub.restore()
    })

    it('dismisses the spinner component while profile object is empty', () => {
      expect(wrapper.element.children.length).to.equal(1)
    })

    it('displays 3 different side navigation tabs', () => {
      const navigationList = wrapper.find('#nav .menu-list')
      expect(navigationList.element.children.length).to.equal(3)
    })

    it('shows warning notification when isActive data is true', () => {
      wrapper.setData({
        isActive: true,
      })
      const notificationElement = wrapper.find('.notification.is-warning')
      expect(notificationElement.element.textContent).to.contain('Profile Settings to update your personal information')
    })
  })

  describe('methods', () => {
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios)
    const newRouter = new Router({
      routes: [
        {
          path: '/control-panel',
          component: ControlPanel,
          children: [
            { path: '', name: 'ControlPanel', redirect: '/control-panel/dashboard' },
            { path: 'dashboard', name: 'Dashboard', component: Dashboard },
            { path: 'settings', name: 'Settings', component: Settings },
          ],
        },
      ],
    })

    it('has a created hook', () => {
      expect(typeof ControlPanel.created).to.equal('function')
    })

    it('calls authentication service to retrieve user\'s picture and renders in DOM', async () => {
      // Mock any GET request to /users
      mock.onGet('https://schoolpool-sp.herokuapp.com/users')
        .reply(200, { user: profile })
        .onGet('https://schoolpool.auth0.com/api/v2/users/fakeId')
        .reply(200, { picture: stockImage })
      const wrapper = shallow(ControlPanel, {
        router: newRouter,
      })
      await flushPromises()
      expect(typeof wrapper.vm.profile).to.equal('object')
      expect(wrapper.vm.profileImage).to.equal(stockImage)
      const image = wrapper.find('.profile-image img').element.src
      expect(image).to.contain(stockImage)
      mock.reset()
    })

    it('catches unathorized profile and attempts to look into local storage for profile information', async () => {
      const tempProfile = new User('Joshua', '118998', 1.03, 101.02, ['139469'], '91123456')
      tempProfile.picture = stockImage
      sinon.stub(localStorage, 'getItem').withArgs('profile').returns(JSON.stringify(tempProfile))
      // Mock any GET request to /users
      mock.onGet('https://schoolpool-sp.herokuapp.com/users').reply(401)
      const wrapper = shallow(ControlPanel, {
        router: newRouter,
      })
      await flushPromises()
      expect(typeof wrapper.vm.profile).to.equal('object')
      await wrapper.vm.$nextTick()
      // console.log(wrapper.vm.profileImage)
      expect(wrapper.vm.profileImage).to.equal(stockImage)
      mock.reset()
    })
  })
})
