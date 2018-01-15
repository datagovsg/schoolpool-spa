import { createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import AppNav from '@/components/AppNav'
import Home from '@/components/Home'
import ControlPanel from '@/components/ControlPanel'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import * as Func from '../handlers/fnc'
import auth from '../../../src/utils/auth'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AppNav.vue', () => {
  const getters = {
    isLoggedIn: () => false,
  }
  describe('DOM Elements', () => {
    let wrapper
    let createdStub
    let store
    beforeEach(() => {
      const newRouter = new Router({
        routes: [
          {
            path: '/home',
            name: 'home',
            component: Home,
          },
        ],
      })
      createdStub = sinon.stub(AppNav, 'created')
      store = new Vuex.Store({ getters })
      newRouter.replace('home')
      wrapper = Func.default(
        AppNav,
        {
          localVue,
          store,
          router: newRouter,
          mocks: {
            $auth: auth,
          },
        },
        null,
        false,
      )
    })
    afterEach(() => {
      createdStub.restore()
    })

    it('displays a login button', () => {
      const loginButton = wrapper.find('.button')
      expect(loginButton.element.textContent).to.contain('Login')
    })

    it('displays a logout and dashboard button', async () => {
      store.hotUpdate({
        getters: {
          isLoggedIn: () => true,
        },
      })
      await wrapper.vm.$nextTick()
      const wrapperButtons = wrapper.findAll('button')
      expect(wrapperButtons.length).to.equal(2)
    })
  })

  describe('methods', () => {
    const store = new Vuex.Store({
      getters: {
        isLoggedIn: () => false,
      },
    })
    const newRouter = new Router({
      routes: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
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
    it('calls login function in Auth class when login button is triggered', async () => {
      const loginStub = sinon.stub()
      const wrapper = Func.default(
        AppNav,
        {
          localVue,
          store,
          router: newRouter,
          mocks: {
            $auth: auth,
          },
          methods: {
            login: loginStub,
          },
        },
        null,
        false,
      )
      const loginButton = wrapper.find('.button')
      expect(loginButton.element.textContent).to.contain('Login')
      loginButton.trigger('click')
      expect(loginStub.calledOnce).to.equal(true)
    })
    it('redirects to the dashboard view when the \'Dashboard\' button is clicked', () => {
      store.hotUpdate({
        getters: {
          isLoggedIn: () => true,
        },
      })
      const wrapper = Func.default(
        AppNav,
        {
          localVue,
          store,
          router: newRouter,
          mocks: {
            $auth: auth,
          },
        },
        null,
        false,
      )
      const dashboardButton = wrapper.findAll('button').at(0)
      expect(dashboardButton.element.textContent).to.contain('Dashboard')
      dashboardButton.trigger('click')
      expect(wrapper.vm.$route.name).to.equal('Dashboard')
    })

    it('logs out a user when the \'Logout\' button is clicked', async () => {
      const logoutStub = sinon.stub()
      const wrapper = Func.default(
        AppNav,
        {
          localVue,
          store,
          router: newRouter,
          mocks: {
            $auth: auth,
          },
          methods: {
            logout: logoutStub,
          },
        },
        null,
        false,
      )
      const logoutButton = wrapper.findAll('button').at(1)
      expect(logoutButton.element.textContent).to.contain('Logout')
      logoutButton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(logoutStub.calledOnce).to.equal(true)
    })
  })
})
