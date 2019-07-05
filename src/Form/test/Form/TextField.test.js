import React from 'react';
import { mount } from 'enzyme';
import { textField1 } from '../template/mockTemplate';
import Form from '../../../Form';

let template = [textField1]
let formData = {
    name: 'Jack',
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

test('Composed TextField', () => {
    expect(wrapper
        .find('TextField')
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
    } = wrapper.find('TextField').props();
    expect(readOnly).toEqual(false);
    expect(pristine).toEqual(false);
    expect(isDirty).toEqual(false);
    expect(isValid).toEqual(true);
    expect(label).toEqual('Name');
    expect(value).toEqual('Jack');
})

test('After first interaction', () => {
    wrapper
        .find('input')
        .simulate('change', { target: { value: 'Changed' } });

    const {
        isDirty,
        pristine,
    } = wrapper.find('TextField').props()

    expect(isDirty).toEqual(true);
    expect(pristine).toEqual(true);

    wrapper
    .find('input')
    .simulate('change', { target: { value: 'Jack' } });

    expect(wrapper.find('TextField').props().isDirty).toEqual(false);
    expect(wrapper.find('TextField').props().pristine).toEqual(true);
});


