import React from 'react';
import { shallow, mount } from 'enzyme';
import { textField1 } from '../template/mockTemplate';
import Form from '../../../Form';

let template = [textField1]
let formData = {
    name: 'Jack',
}

let wrapper = null;
beforeEach(() => {
    wrapper = shallow(
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
        .find('Form')
        .dive()
        .find('ReferenceFieldsValidatorComponent')
        .length)
        .toEqual(1);
})

test('Should render a FieldValidator', () => {
    expect(wrapper
        .find('Form')
        .dive()
        .find('ReferenceFieldsValidatorComponent')
        .dive()
        .find('FieldValidatorComponent')
        .length)
        .toEqual(1);
})

test('Should render a ResetValueNotifier', () => {
    expect(wrapper
        .find('Form')
        .dive()
        .find('ReferenceFieldsValidatorComponent')
        .dive()
        .find('FieldValidatorComponent')
        .dive()
        .find('ResetValueNotifierComponent')
        .length)
        .toEqual(1);
})

test('Should render a ResetValueNotifier', () => {
    expect(wrapper
        .find('Form')
        .dive()
        .find('ReferenceFieldsValidatorComponent')
        .dive()
        .find('FieldValidatorComponent')
        .dive()
        .find('ResetValueNotifierComponent')
        .dive()
        .find('TextField')
        .length)
        .toEqual(1);
})

test('Composed TextField', () => {
    const textfield = wrapper
        .find('Form')
        .dive()
        .find('ReferenceFieldsValidatorComponent')
        .dive()
        .find('FieldValidatorComponent')
        .dive()
        .find('ResetValueNotifierComponent')
        .dive()
        .find('TextField')
    
    console.log(textfield.debug())
})


