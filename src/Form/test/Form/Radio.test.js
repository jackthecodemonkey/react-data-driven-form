import React from 'react';
import { mount, shallow } from 'enzyme';
import { radio1 } from '../template/mockTemplate';
import Form from '../../../Form';

let template = [radio1]
let formData = {
    fruit: 'apple',
}

let wrapper = null;
beforeEach(() => {
    wrapper = mount(
        <div>
            <Form
                templates={template}
                formData={formData}
            />
        </div>
    );
})

test('Should render a Form', () => {
    expect(wrapper.find('Form').length).toEqual(1);
})

test('Should render a ReferenceFieldsValidator', () => {
    expect(wrapper
        .find('ReferenceFieldsValidatorComponent')
        .length)
        .toEqual(1);
})

test('Should render a FieldValueContainer', () => {
    expect(wrapper
        .find('FieldValueContainerComponent')
        .length)
        .toEqual(1);
})

test('Should render a OptionsChangeListener', () => {
    expect(wrapper
        .find('OptionsChangeListenerComponent')
        .length)
        .toEqual(1);
})

test('Should render a ResetValueNotifier', () => {
    expect(wrapper
        .find('ResetValueNotifierComponent')
        .length)
        .toEqual(1);
})

test('Should render a ResetValueNotifier', () => {
    expect(wrapper
        .find('ResetValueNotifierComponent')
        .length)
        .toEqual(1);
})

test('Composed RadioComponent', () => {
    expect(wrapper
        .find('RadioComponent')
        .length)
        .toEqual(1);
})

test('Initial props on mount', () => {
    const {
        readOnly,
        pristine,
        isDirty,
        isValid,
        label,
        value,
    } = wrapper.find('RadioComponent').props();
    expect(readOnly).toEqual(false);
    expect(pristine).toEqual(false);
    expect(isDirty).toEqual(false);
    expect(isValid).toEqual(true);
    expect(label).toEqual('Fruit');
    expect(value).toEqual('apple');
})

test('After first interaction', () => {
    wrapper.find('RadioComponent').instance().handleChange('orange');
    wrapper.update();
 
    const {
        isDirty,
        pristine,
    } = wrapper.find('RadioComponent').props()

    expect(isDirty).toBe.true;
    expect(pristine).toBe.true;

    wrapper.find('RadioComponent').instance().handleChange('apple');
    wrapper.update();
    
    expect(wrapper.find('RadioComponent').props().value).toEqual('apple');
    expect(wrapper.find('RadioComponent').props().pristine).toEqual(true);
    expect(wrapper.find('RadioComponent').props().isDirty).toEqual(false);
});