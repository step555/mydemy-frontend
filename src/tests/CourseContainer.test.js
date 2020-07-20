import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CourseContainer from '../courseComponents/CourseContainer';
// import configureMockStore from 'redux-mock-store';
import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import CourseListItem from '../courseComponents/CourseContainer';
import { createStore, applyMiddleware } from 'redux'; 

// const mockStore = configureMockStore();
const mockStore = configureStore();
// const store = mockStore({});

const initialState = {
    // "dropdownDifficultyLevel": "",
    // "dropdownDuration": "",
    // "dropdownPrice": "",
    // "searchText": "",
    // "courses": [{
    //     "id": 8,
    //     "name": "Using Data Science in your Workplace",
    //     "text_preview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, ante sed euismod hendrerit, ex lacus maximus arcu, eu condimentum nibh ex a quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida risus ex, ac aliquam elit gravida ac. Aliquam sodales gravida magna non dictum. Quisque maximus neque eget erat sollicitudin semper. Ut eu purus finibus leo dictum pellentesque a et dui. Aliquam egestas, sem at dignissim pulvinar, metus tellus gravida velit, ut iaculis metus tellus eget ex. Maecenas faucibus rhoncus feugiat. Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum. Pellentesque sodales nisi eu sem finibus, sed tristique libero auctor.",
    //     "video_preview": "Placeholder link",
    //     "price": 50.0,
    //     "summary": "Placeholder text",
    //     "duration": "6-9 weeks",
    //     "subject": "Data Science",
    //     "difficulty_level": "Intermediate",
    //     "content_covered": "Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum.",
    //     "picture": "https://www.techiexpert.com/wp-content/uploads/2020/04/Data-Science-Growth.jpg",
    //     "company_id": 4,
    //     "created_at": "2020-07-03T18:31:19.271Z",
    //     "updated_at": "2020-07-03T18:31:19.271Z",
    //     "course_code": 8,
    //     "company": {
    //         "id": 4,
    //         "name": "Udemy",
    //         "email": "udemy@hotmail.com",
    //         "password_digest": "$2a$12$nrH3CuGi/9LpqioY85g0m.etL0UaeVVfstG1eK6rJcc/XINOiImxe",
    //         "created_at": "2020-07-03T18:31:19.109Z",
    //         "updated_at": "2020-07-03T18:31:19.109Z"
    //       }
    // },
    // {
    //     "id": 7,
    //     "name": "Learn the basics of Microsoft Office",
    //     "text_preview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, ante sed euismod hendrerit, ex lacus maximus arcu, eu condimentum nibh ex a quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida risus ex, ac aliquam elit gravida ac. Aliquam sodales gravida magna non dictum. Quisque maximus neque eget erat sollicitudin semper. Ut eu purus finibus leo dictum pellentesque a et dui. Aliquam egestas, sem at dignissim pulvinar, metus tellus gravida velit, ut iaculis metus tellus eget ex. Maecenas faucibus rhoncus feugiat. Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum. Pellentesque sodales nisi eu sem finibus, sed tristique libero auctor.",
    //     "video_preview": "Placeholder link",
    //     "price": 25.0,
    //     "summary": "Placeholder text",
    //     "duration": "0-3 weeks",
    //     "subject": "Computer Science",
    //     "difficulty_level": "Beginner",
    //     "content_covered": "Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum.",
    //     "picture": "https://images.idgesg.net/images/article/2018/03/microsoft_office_logo_press_image_1200x800-100751542-large.jpg",
    //     "company_id": 4,
    //     "created_at": "2020-07-03T18:31:19.264Z",
    //     "updated_at": "2020-07-03T18:31:19.264Z",
    //     "course_code": 7,
    //     "company": {
    //         "id": 4,
    //         "name": "Udemy",
    //         "email": "udemy@hotmail.com",
    //         "password_digest": "$2a$12$nrH3CuGi/9LpqioY85g0m.etL0UaeVVfstG1eK6rJcc/XINOiImxe",
    //         "created_at": "2020-07-03T18:31:19.109Z",
    //         "updated_at": "2020-07-03T18:31:19.109Z"
    //     }
    // },
    // ]
}

// const store = mockStore(initialState);
const store = createStore(() => [], {}, applyMiddleware());

describe('CourseContainer', () => {
  it('should render Course List Item components', () => {
    const mockCourseListItems = [
      { id: 1, name: 'Draaaaaake is cancelled' },
      { id: 2, name: 'Slayah' }
    ]
    const wrapper = shallow(<Provider store={store}><CourseContainer courseListItems={mockCourseListItems} /></Provider>)
    expect(wrapper.find(CourseListItem).length).toBe(1)
    // expect(2 + 2).toBe(5)
  })
})
