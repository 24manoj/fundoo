import React from 'react';
import {
    shallow
} from 'enzyme';
import Reset from '../components/ResetPassword';
import '../setupTest'
/**
 * describe what we are testing
 **/
describe('Reset Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow(< Reset />).exists()).toBe(true)
    })
    /**
     * within the Login components describe function
     **/
    it('renders a NewPassword input', () => {
        expect(shallow(< Reset />).find('#NewPassword').length).toEqual(1)
    })
    it('renders a ConfirmPassword input', () => {
        expect(shallow(< Reset />).find('#ConfirmPassword').length).toEqual(1)
    })
    /**
     * within the Login components describe function
     **/
    describe('NewPassword input', () => {
        it('should respond to change event and change the state of the Reset Component', () => {
            const wrapper = shallow(<Reset />);
            wrapper.find('#NewPassword')
                .simulate('change', {
                    target: {
                        name: 'NewPassword',
                        value: 'rockz678'
                    }
                });
            expect(wrapper.state('NewPassword')).toEqual('rockz678');
        })
    })
    describe('ConfirmPassword input', () => {
        it('should respond to change event and change the state of the Reset Component', () => {
            const wrapper = shallow(< Reset />);
            wrapper.find('#ConfirmPassword')
                .simulate('change', {
                    target: {
                        name: 'ConfirmPassword',
                        value: 'rockz678'
                    }
                });
            expect(wrapper.state('ConfirmPassword')).toEqual('rockz678');
        })
    })
})