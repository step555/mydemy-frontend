import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
// import Navbar from "./components/Navbar";

const fetchingCourses = jest.fn();
const gettingProfileFetch = jest.fn();
const gettingCompanyProfileFetch = jest.fn();

const initialProps = {
  fetchingCourses,
  gettingProfileFetch,
  gettingCompanyProfileFetch
}

// fetchingCourses
// gettingProfileFetch
// gettingCompanyProfileFetch

it('should render app div', () => {
  expect(shallow(<App.WrappedComponent {...initialProps} />).find('.App').length).toEqual(1)
})

describe('div container', () => {
  it('div width is always 400', () => {
    const divNode2 = shallow(<App.WrappedComponent {...initialProps} />).find('div').at(1);
    expect(divNode2.prop('style').width).toEqual(400);
  });
});