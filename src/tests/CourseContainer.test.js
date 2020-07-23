import React from 'react';
import {shallow} from 'enzyme';
import CourseContainer from '../courseComponents/CourseContainer';
import CourseListItem from '../courseComponents/CourseListItem';

describe('CourseContainer', () => {
  it('should render CourseListItem components', () => {
    const mockCourseListItems = [
      { id: 1, name: 'Learn C' },
      { id: 2, name: 'Gardening' }
    ]
    const wrapper = shallow(<CourseContainer.WrappedComponent courses={mockCourseListItems}/>)    
    expect(wrapper.find(CourseListItem).length).toBe(mockCourseListItems.length)
  })
})
