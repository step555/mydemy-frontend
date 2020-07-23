import React from 'react';
import {shallow} from 'enzyme';
import CourseListItem from '../courseComponents/CourseListItem';

const mockProps = {
    id: 5000,
    name: "Learn C",
    image: "C Coding Picture",
    subject: "Computer Science",
    company_name: "MIT"
}

describe('CourseListItem', () => {
    // it('should render course image', () => {
    //     expect(shallow())
    // })

    // it('should render course name', () => {
        
    // })

    // it('should render course subject', () => {
        
    // })

    // it('should render course company name', () => {
        
    // })
    it("should receive props", () => {
        const wrapper = shallow(<CourseListItem {...mockProps}/>)
        expect(wrapper).toMatchSnapshot()
    })
})