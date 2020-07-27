import React from 'react'
import {shallow} from 'enzyme'
import reducer from '../redux/reducer'

describe('reducer', () => {
    it('handles @@INIT', () => {
        const action = { type: '@@INIT'}
        expect(reducer(undefined, action)).toEqual({
            allUsers: [],
            cart: [],
            cartTotal: 0,
            checkoutCart: [],
            company: [],
            courses: [],
            dropdownDifficultyLevel: "",
            dropdownDuration: "",
            dropdownPrice: "",
            enlargedCourse: "",
            finalLesson: [],
            lessons: [],
            newLesson: [],
            searchText: "",
            selectedCourse: [],
            selectedLesson: [],
            totalRevenue: {},
            user: [],
        })
    })
    it('should update cart when adding a course to cart', () => {
        const action = { type: 'ADD_TO_CART', payload: ['Learn Python'] }
        const result = reducer({ cart: [] }, action)
        expect(result.cart).toBeDefined()
        expect(result.cart.length).toEqual(1)
        expect(result.cart[0]).toEqual(action.payload[0])
    })
    it('should update cart when removing a course from cart', () => {
        const mockState = {
            cart: [
                    {id: 1, name: "Learn Python"},
                    {id: 2, name: "Gardening"}
                ]
        }
        const action = {type: "REMOVED_FROM_CART", payload: {id: 1, name: "Learn Python"}}
        const result = reducer(mockState, action)
        expect(result.cart).toBeDefined()
        expect(result.cart.length).toBe(mockState.cart.length - 1)
    })
    it('should update when creating a new course', () => {
        const action = { type: "CREATED_NEW_COURSE", payload: ["Gardening"] }
        const result = reducer ({ courses: [] }, action)
        expect(result.courses).toBeDefined()
        expect(result.courses.length).toEqual(1)
        expect(result.courses[0]).toEqual(action.payload)
    })
    it('should update when deleting a course', () => {
        const mockState = {
            courses: [
                    {id: 1, name: "Learn Python"},
                    {id: 2, name: "Gardening"}
                ]
        }
        const action = {type: "DELETED_COURSE", payload: {id: 2, name: "Gardening"}}
        const result = reducer(mockState, action)
        expect(result.courses).toBeDefined()
        expect(result.courses.length).toBe(mockState.courses.length - 1)
    })
    // test for already owned item (cart stuff)
    // test for checked out cart
    // it('update current user when editing user details')
    // it('update current company when editing company details')
    // it('logs in properly')
    // it('handles search filter')
    // it('handles errors when logging in')
})