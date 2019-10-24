import React from 'react';
import {
    mount
} from 'enzyme';
import '../setupTest'

import DashBoard from "../pages/DashBoard";

// const jest = require('mock-local-storage')
// jest.setMock('sessionStorage', "fhdfgd")
describe('Class exist', () => {
    it('should render without throwing an error', () => {
        expect(mount(<DashBoard />).exists()).toBe(true)
    })
});
