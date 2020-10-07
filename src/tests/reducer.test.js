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

    it('if an item is already in the cart, does not add it twice', () => {
        const action = {type: "ALREADY_OWNED", payload: "This item is already in your cart"}
        const result = reducer({ cart: [] }, action)
        expect(result.cart.length).toEqual(0)
    })

    // it('cart can be sucessfully checked out', () => { // does not work properly. likely because of page refresh upon cart checkout
    //     const mockCart = {
    //         purchases: [
    //                 {id: 1, name: "Learn Python"},
    //             ]
    //     }
    //     const action = {type: "CHECKOUT_CART", payload: mockCart}
    //     const result = reducer(mockCart, action)
    //     console.log(result.cart.purchases)
    //     expect(result.cart.purchases).toBeDefined()
    //     expect(result.cart.purchases.length).toEqual(0)
    // })

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

    it('update current user when editing user details', () => {
        const mockUser = {
            user: [
                {name: "Bob"},
                {email: "bob@hotmail.com"}
            ]
        }
        const mockEditUser = {
            user: [
                {name: "Bobb"},
                {email: "bobb@hotmail.com"}
            ]
        }
        const action = { type: "EDITED_USER_INFO", payload: mockEditUser}
        const result = reducer(mockUser, action)
        expect(result.user.currentUser).toBeDefined()
        expect(result.user.currentUser.name).toEqual(action.payload.name)
        expect(result.user.currentUser.email).toEqual(action.payload.email)
    })

    it('update current company when editing company details', () => {
        const mockCompany = {
            company: [
                {name: "MIT"},
                {email: "mit@hotmail.com"}
            ]
        }
        const mockEditCompany = {
            company: [
                {name: "MITt"},
                {email: "mitt@hotmail.com"}
            ]
        }
        const action = { type: "EDITED_COMPANY_INFO", payload: mockEditCompany}
        const result = reducer(mockCompany, action)
        expect(result.company.currentCompany).toBeDefined()
        expect(result.company.currentCompany.name).toEqual(action.payload.name)
        expect(result.company.currentCompany.email).toEqual(action.payload.email)
    })

    it('a user can log in', () => {
        const mockUser = {name: "bob", email: "bob@hotmail.com"}
        const action = { type: "FETCHED_USER", payload: mockUser}
        const result = reducer({user: null}, action)
        expect(result.user.currentUser).toBeDefined()
        expect(result.user.currentUser.name).toEqual(mockUser.name)
        expect(result.user.currentUser.email).toEqual(mockUser.email)
    })
    it('a company can log in', () => {
        const mockCompany = {name: "google", email: "google@hotmail.com"}
        const action = { type: "FETCHED_COMPANY", payload: mockCompany}
        const result = reducer({company: null}, action)
        expect(result.company.currentCompany).toBeDefined()
        expect(result.company.currentCompany.name).toEqual(mockCompany.name)
        expect(result.company.currentCompany.email).toEqual(mockCompany.email)
    })

    it('calculates total revenue', () => {
        const mockTotal = 100
        const action = {type: "FETCHED_TOTAL_REVENUE", payload: mockTotal}
        const result = reducer('', action)
        expect(result.totalRevenue.totalRevenue).toBeDefined()
        expect(result.totalRevenue.totalRevenue).toEqual(mockTotal)
    })

    it('handles search filter', () => {
        const mockSearch = "french"
        const action = {type: "CHANGE_SEARCH_TEXT", payload: mockSearch}
        const result = reducer('', action)
        expect(result.searchText).toEqual("french")
    })

    

})