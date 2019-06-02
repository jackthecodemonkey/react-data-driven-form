import React from 'react';
import { shallow, mount } from 'enzyme';
import event from '../../event';
import SelectField from '../../Select';
import { select2 } from '../template/mockTemplate';
import sinon from 'sinon';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

let wrapper = null;
let localEvent = null;

beforeEach(() => {
    localEvent = event();
    wrapper = shallow(<SelectField options={options} event={localEvent} template={select2} />);
})

test('Should render a Select component', () => {
    expect(wrapper.find('StateManager').length).toEqual(1);
})

test('Should get options via props', () => {
    expect(wrapper.instance().props.options).toEqual(options);
})

test('Should register an event on mount', () => {
    expect(Object.keys(localEvent.getEvents('ResetCurrentSelection')).length).toEqual(1);
})

test('Should unregister an event on unmount', () => {
    wrapper.unmount();
    expect(Object.keys(localEvent.getEvents('ResetCurrentSelection')).length).toEqual(0);
})

test('Should trigger onChange method on ResetCurrentSelection event', (done) => {
    wrapper = mount(<SelectField options={options} onChange={() => { }} event={localEvent} template={select2} />);
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    localEvent.emit('ResetCurrentSelection', select2.fieldName);
    setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
    })
})