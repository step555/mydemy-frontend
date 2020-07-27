import React from 'react'
import {shallow} from 'enzyme'
import reducer from '../redux/reducer'

describe('reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            "allUsers": [],
            "cart": [],
            "cartTotal": 0,
            "checkoutCart": [],
            "company": [],
            "courses": [],
            "dropdownDifficultyLevel": "",
            "dropdownDuration": "",
            "dropdownPrice": "",
            "enlargedCourse": "",
            "finalLesson": [],
            "lessons": [],
            "newLesson": [],
            "searchText": "",
            "selectedCourse": [],
            "selectedLesson": [],
            "totalRevenue": {},
            "user": [],
        })
    })

    // it('should update cart when adding a course to cart')
    // it('should update cart when removing a course from cart')
    // it('should update when creating a new course')
    // it('should update when deleting a course')
    // it('update current user when editing user details')
    // it('update current company when editing company details')
    // it('logs in properly')
    // it('handles search filter')
    // it('handles errors when logging in')
})