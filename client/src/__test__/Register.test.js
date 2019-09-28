import React from 'react'
import { shallow, mount } from 'enzyme'
import '../setupTest'
import Register from '../components/Registration'

describe('Registration Testing', () => {
    it('should  work without error', () => {
        let wrapper = shallow(<Register />);
        expect(wrapper.exists()).toBe(true)
    })
})

describe('Input  Testing', () => {
    it('Fname should change the  state for Register Component', () => {
        let wrapper = shallow(<Register />)
        wrapper.find('#Fname')
            .simulate('change', {
                target: {
                    name: 'fname',
                    value: 'manoj'
                }
            });
        expect(wrapper.state('fname')).toEqual('manoj')

    })

    it('Lname should change the  state for Register Component', () => {
        let wrapper = shallow(<Register />)
        wrapper.find('#Lname')
            .simulate('change', {
                target: {
                    name: 'lname',
                    value: 'kumar'
                }
            });
        expect(wrapper.state('lname')).toEqual('kumar')

    })


    it('Password should change the  state for Register Component', () => {
        let wrapper = shallow(<Register />)
        wrapper.find('#Password')
            .simulate('change', {
                target: {
                    name: 'password',
                    value: 'password'
                }
            });
        expect(wrapper.state('password')).toEqual('password')

    })
    it('Email should change the  state for Register Component', () => {
        let wrapper = shallow(<Register />)
        wrapper.find('#Email')
            .simulate('change', {
                target: {
                    name: 'email',
                    value: 'email@gmail.com'
                }
            });
        expect(wrapper.state('email')).toEqual('email@gmail.com')
    })


})