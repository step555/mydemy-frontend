import React from 'react';
import {shallow} from 'enzyme';
import CourseListItem from '../courseComponents/CourseListItem';

const mockProps = {
    course: {
        id: 5000,
        name: "Learn C",
        image: "C Coding Picture",
        subject: "Computer Science",
        company: {
            name: "MIT"
        }
    }
}

describe('CourseListItem', () => {
    it("should receive props", () => {
        const wrapper = shallow(<CourseListItem {...mockProps} />)
        expect(wrapper).toMatchSnapshot()
    })
})