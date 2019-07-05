import React from 'react';
import { mount, shallow } from 'enzyme';
import { checkbox1 } from '../template/mockTemplate';
import Form from '../../../Form';

let template = [checkbox1]
let formData = {
    icecream: ['watermelon', 'apple']
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

test('Should render a FieldValueContainerComponent', () => {
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

test('Composed Checkbox', () => {
    expect(wrapper
        .find('Checkbox')
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
    } = wrapper.find('Checkbox').props();
    expect(readOnly).toEqual(false);
    expect(pristine).toEqual(false);
    expect(isDirty).toEqual(false);
    expect(isValid).toEqual(true);
    expect(label).toEqual('Ice cream');
    expect(value).toEqual(['watermelon', 'apple']);
})

test('After first interaction', () => {
    wrapper.find('Checkbox').instance().handleClick({ target: { value: 'apple' } });
    wrapper.update();

    const {
        isDirty,
        pristine,
        value,
    } = wrapper.find('Checkbox').props()

    expect(isDirty).toBe.true;
    expect(pristine).toBe.true;
    expect(value).toEqual(['watermelon']);

    wrapper.find('Checkbox').instance().handleClick({ target: { value: 'orange' } });
    wrapper.update();

    expect(wrapper.find('Checkbox').props().value).toEqual(['watermelon', 'orange']);
    expect(wrapper.find('Checkbox').props().pristine).toEqual(true);
    expect(wrapper.find('Checkbox').props().isDirty).toEqual(true);

    wrapper.find('Checkbox').instance().handleClick({ target: { value: 'orange' } });
    wrapper.find('Checkbox').instance().handleClick({ target: { value: 'apple' } });
    wrapper.update();

    expect(wrapper.find('Checkbox').props().value).toEqual(['watermelon', 'apple']);
    expect(wrapper.find('Checkbox').props().pristine).toEqual(true);
    expect(wrapper.find('Checkbox').props().isDirty).toEqual(false);
});