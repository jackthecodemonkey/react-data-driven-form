import CreateElements from '../LayoutGen';
import React from 'react';
import makeid from '../RandomStringGen';
import theme from './template/mockLayout';
import { shallow, mount } from 'enzyme';

let wrapper = null;

beforeEach(() => {
    wrapper = shallow(<div className="App">
        {CreateElements(theme, React.cloneElement(<div></div>), (field) => {
            return <span key={makeid()}>hello</span>
        })}
    </div>);
})

test('Should render 23 spans', () => {
    expect(wrapper.find('span').length).toEqual(23);
})

test('Should render two groups', () => {
    expect(wrapper.find('.groupId1').length).toEqual(1);
    expect(wrapper.find('.groupId111').length).toEqual(1);
})

test('None group element should have a span', () => {
    expect(wrapper.find('.fieldName12-class').children().length).toEqual(3);
    expect(wrapper.find('.fieldName12-class').childAt(0).find('div').length).toEqual(1);
    expect(wrapper.find('.fieldName12-class').childAt(1).find('div').length).toEqual(3);
    expect(wrapper.find('.fieldName12-class').childAt(2).text()).toEqual('hello');
})

test('Group element should not have a span', () => {
    expect(wrapper.find('.groupId1').children().length).toEqual(2);
    expect(wrapper.find('.groupId1').childAt(0).type()).toEqual('div');
    expect(wrapper.find('.groupId1').childAt(1).type()).toEqual('div');
    expect(wrapper.find('.groupId1').childAt(0).find('.fieldName3-class').length).toEqual(1);
    expect(wrapper.find('.groupId1').childAt(0).find('.fieldName4-class').length).toEqual(1);
})

test('Sub Group element should have a span', () => {
    expect(wrapper.find('.fieldName1-class').childAt(2).text()).toEqual('hello');
})
