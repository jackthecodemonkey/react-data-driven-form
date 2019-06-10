import CreateElements from '../LayoutGen';
import React from 'react';
import makeid from '../RandomStringGen';
import theme from './template/mockLayout';
import Theme from '../LayoutGen/models/Theme'; 
import { shallow, mount } from 'enzyme';

let wrapper = null;

beforeEach(() => {
    wrapper = shallow(<div className="App">
        {
          CreateElements(new Theme(theme), (field) => {
            return <span>Hello</span>
          })
        }
    </div>);
})

test('Should render 9 spans', () => {
    expect(wrapper.find('span').length).toEqual(9);
})

test('Should render two groups', () => {
    expect(wrapper.find('.groupId0-class').length).toEqual(1);
    expect(wrapper.find('.groupId1-class').length).toEqual(1);
    expect(wrapper.find('.groupId3-class').length).toEqual(1);
})

test('Group element test 1', () => {
    expect(wrapper.find('.groupId0-class').children().length).toEqual(2);
    expect(wrapper.find('.groupId0-class').childAt(0).type()).toEqual('div');
    expect(wrapper.find('.groupId0-class').childAt(0).hasClass('sub-field-0-class')).toEqual(true);
    expect(wrapper.find('.groupId0-class').childAt(1).type()).toEqual('div');
    expect(wrapper.find('.groupId0-class').childAt(1).hasClass('sub-field-0-1-class')).toEqual(true);
})

test('Group element test 2', () => {
    expect(wrapper.find('.groupId1-class').children().length).toEqual(2);
    expect(wrapper.find('.groupId1-class').childAt(0).children().length).toEqual(2);
    expect(wrapper.find('.groupId1-class').childAt(0).childAt(0).childAt(0).find('span').length).toEqual(1);
    expect(wrapper.find('.groupId1-class').childAt(0).childAt(0).childAt(1).find('span').length).toEqual(2);
})
