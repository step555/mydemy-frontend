import React from 'react';
import {shallow} from 'enzyme';
import Lesson from '../lessonComponents/Lesson';

describe('Course', () => {
    const mockLesson = {
        id: 8,
        lesson_name: "Lesson One",
        text_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, ante sed euismod hendrerit, ex lacus maximus arcu, eu condimentum nibh ex a quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida risus ex, ac aliquam elit gravida ac. Aliquam sodales gravida magna non dictum. Quisque maximus neque eget erat sollicitudin semper. Ut eu purus finibus leo dictum pellentesque a et dui. Aliquam egestas, sem at dignissim pulvinar, metus tellus gravida velit, ut iaculis metus tellus eget ex. Maecenas faucibus rhoncus feugiat. Sed vel diam at nunc luctus feugiat eu in justo. Integer vel dui ipsum. Pellentesque sodales nisi eu sem finibus, sed tristique libero auctor.",
        lesson_number: 8,
        video: "video",
    }
    it('should receive props', () => {
        const wrapper = shallow(<Lesson.WrappedComponent {...mockLesson} />)
        expect(wrapper).toMatchSnapshot()
    })
})