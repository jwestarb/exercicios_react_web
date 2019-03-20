import React from 'react'
import { shallow } from 'enzyme'

import NewComment from './NewComment'

describe('<NewComment />', () => {
  it('should handle changes is textarea', () => {
    const wrapper = shallow(<NewComment />)
    wrapper.find('textarea').simulate('change', {
      'target': { 'value': 'test' }
    })
    expect(wrapper.state().newComment).toBe('test')
  })
  it('should call sendComment on button click', () => {
    const sendComment = jest.fn()
    const wrapper = shallow(<NewComment sendComment={sendComment} />)
    wrapper.find('textarea').simulate('change', {
      'target': { 'value': 'test' }
    })
    wrapper.find('button').simulate('click')
    expect(sendComment).toBeCalledWith('test')
    expect(wrapper.state().newComment).toBe('')
  })
})
