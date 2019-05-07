import Add from './containers/Add.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Button } from 'reactstrap';

let wrapper;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    wrapper = shallow(<Add />);
});

describe('<Add /> rendering', () => {
    it('renders correctly', () => {
    });

    it('should contain 3 buttons', () => {
        expect(wrapper.find('Button')).toHaveLength(3);
    })

    it('should contain 2 labels', () => {
        expect(wrapper.find('Label')).toHaveLength(2);


        const addButton = wrapper.find('Button').first();
        expect(addButton.exists()).toEqual(true)
        addButton.simulate("click")
        const text = wrapper.find('Input[name="title"]').text()
        expect(text).not.toBeNull();
    })
});

describe('<Button />', () => {
    describe('onClick()', () => {
        test('successfully calls the onClick handler', () => {
            const mockOnClick = jest.fn();
            const wrapper = shallow(
                <Button onClick={mockOnClick} label="Submit Article" />
            );
        });
    });
});
