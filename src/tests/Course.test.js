import React from 'react';
import {shallow, mount} from 'enzyme';
import Course from '../courseComponents/Course';
// import {Button} from 'semantic-ui-react'

describe('Course', () => {
    const mockCourse = {
        id: 8,
        name: "Using Data Science in your Workplace",
        text_preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, ante sed euismod hendrerit, ex lacus maximus arcu, eu condimentum nibh ex a quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida risus ex, ac aliquam elit gravida ac. Aliquam sodales gravida magna non dictum. Quisque maximus neque eget erat sollicitudin semper. Ut eu purus finibus leo dictum pellentesque a et dui. Aliquam egestas, sem at dignissim pulvinar, metus tellus gravida velit, ut iaculis metus tellus eget ex. Maecenas faucibus rhoncus feugiat. Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum. Pellentesque sodales nisi eu sem finibus, sed tristique libero auctor.",
        video_preview: "Placeholder link",
        price: 50.0,
        summary: "Placeholder text",
        duration: "6-9 weeks",
        subject: "Data Science",
        difficulty_level: "Intermediate",
        content_covered: "Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum.",
        picture: "https://www.techiexpert.com/wp-content/uploads/2020/04/Data-Science-Growth.jpg",
        company_id: 4,
        created_at: "2020-07-03T18:31:19.271Z",
        updated_at: "2020-07-03T18:31:19.271Z",
        company: {
            "id": 4,
            "name": "Udemy",
            "email": "udemy@hotmail.com",
            "password_digest": "$2a$12$nrH3CuGi/9LpqioY85g0m.etL0UaeVVfstG1eK6rJcc/XINOiImxe",
            "created_at": "2020-07-03T18:31:19.109Z",
            "updated_at": "2020-07-03T18:31:19.109Z"
        }
    }
    it('should receive props', () => {
        const wrapper = shallow(<Course.WrappedComponent {...mockCourse} />)
        expect(wrapper).toMatchSnapshot()
    })
})