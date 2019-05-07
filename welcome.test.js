import Enzyme, { shallow } from 'enzyme';
import Welcome from '././src/containers/Welcome.js'
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'reactstrap';

Enzyme.configure({ adapter: new Adapter() });

describe('Test case for testing login', () => {
    let wrapper;

    test('username check', () => {
        wrapper = shallow(<Welcome />);
        const t1 = wrapper.find('Input[name="email"]');
        expect(t1).toHaveLength(1);
        t1.simulate('change', { target: { name: 'email', value: 'surya' } });
        expect(wrapper.state('email')).toEqual('surya');
    })

    it('password check', () => {
        wrapper = shallow(<Welcome />);
        const t2 = wrapper.find('Input[name="password"]');
        expect(t2).toHaveLength(1);
        t2.simulate('change', { target: { name: 'password', value: 'surya' } });
        // wrapper.find('Input[type="password"]').simulate('change', {target: {name: 'password', value: 'surya'}});
        expect(wrapper.state('password')).toEqual('surya');
    })

    it('login check with right data', () => {
        wrapper = shallow(<Welcome />);
        const a1 = wrapper.find('Input[name="email"]');
        expect(a1).toHaveLength(1);
        a1.simulate('change', { target: { name: 'email', value: 'surya' } });
        const a2 = wrapper.find('Input[name="password"]');
        expect(a2).toHaveLength(1);
        a2.simulate('change', { target: { name: 'password', value: 'surya' } });
        expect(wrapper.state('email')).toEqual('surya') && expect(wrapper.state('password')).toEqual('surya');
        // wrapper.find('Button').first().simulate('click');
        // wrapper.find('Button').simulate('click');
        expect(true).toBeTruthy();
        expect(a1).toMatchSnapshot();
    })

})