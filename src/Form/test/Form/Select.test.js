import React from 'react';
import { mount, shallow } from 'enzyme';
import { select1 } from '../template/mockTemplate';
import Form from '../../../Form';

let template = [select1]
let formData = {
    state: 'vanilla',
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

test('Should render a FieldValidator', () => {
    expect(wrapper
        .find('FieldValidatorComponent')
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

test('Composed TextField', () => {
    expect(wrapper
        .find('SelectField')
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
    } = wrapper.find('SelectField').props();
    expect(readOnly).toEqual(false);
    expect(pristine).toEqual(false);
    expect(isDirty).toEqual(false);
    expect(isValid).toEqual(true);
    expect(label).toEqual('State');
    expect(value).toEqual('vanilla');
})

test('After first interaction', () => {
    wrapper.find('SelectField').instance().onChange({value: "strawberry", label: "Strawberry"});
    wrapper.update();
 
    const {
        isDirty,
        pristine,
    } = wrapper.find('SelectField').props()

    expect(isDirty).toEqual(true);
    expect(pristine).toEqual(true);

    wrapper.find('SelectField').instance().onChange({ value: 'vanilla', label: 'Vanilla' });
    wrapper.update();

    expect(wrapper.find('SelectField').props().value).toEqual('vanilla');
    expect(wrapper.find('SelectField').props().isDirty).toEqual(false);
    expect(wrapper.find('SelectField').props().pristine).toEqual(true);
});


