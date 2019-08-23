import React from 'react'
import Comment from './Comment'
import { render } from 'enzyme'

it('should render', () => {
  const c = {
    comment: 'Test'
  }
  const wrapper = render(<Comment c={c} />)
  expect(wrapper.text()).toBe('Comentário: Test')
})
