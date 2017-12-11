import { mount } from 'vue-test-utils'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('should render correct title', () => {
    // Mount the component and you have the wrapper
    const wrapper = mount(Home)
    expect(wrapper.html()).to.contains('Schoolpool')
  })
})
