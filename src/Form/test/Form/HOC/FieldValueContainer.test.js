import React from 'react';
import { mount, shallow } from 'enzyme';
import { select1, textField2, select2, formData } from '../../template/mockTemplate';
import events from '../../../event';
import FieldValueContainer from '../../../Validator/FieldValueContainer';
import SelectValidator from '../../../Select/SelectValidator';
import StringValidator from '../../../TextField/StringValidator';
import sinon from 'sinon';

let textField2Copy = { ...textField2 };
let formDataCopy = { ...formData };

const partialWrapper = (Component, event) => (localFormData = formDataCopy, localTemplate = textField2Copy, localValidator = StringValidator) => {
    return mount(
        <Component
            validator={new localValidator(localTemplate.validation)}
            template={localTemplate}
            event={event}
            formData={localFormData}
        />);
}

let event = null;
let wrapper = null;

beforeEach(() => {
    event = events();
    const TestComp = () => <div>Test</div>;
    const FieldValidatorComp = FieldValueContainer(TestComp);
    wrapper = partialWrapper(FieldValidatorComp, event);
});

test('Should call updateState method', () => {
    const TestComp = () => <div>Hello</div>;
    const FieldTestComp = FieldValueContainer(TestComp);
    const spy = jest.spyOn(FieldTestComp.prototype, 'updateState');
    shallow(
        <FieldTestComp
            validator={new StringValidator(textField2Copy)}
            template={textField2Copy}
            event={event}
            formData={formDataCopy}
        />);
    expect(spy).toHaveBeenCalled();
})

test('Should call updateState method with noValidateOnMount', () => {
    const TestComp = () => <div>Hello</div>;
    const FieldTestComp = FieldValueContainer(TestComp);
    const spy = jest.spyOn(FieldTestComp.prototype, 'updateState');
    const tmp = { ...textField2Copy };
    tmp.validation.noValidateOnMount = true;
    shallow(
        <FieldTestComp
            validator={new StringValidator(textField2Copy)}
            template={tmp}
            event={event}
            formData={formDataCopy}
        />);
    expect(spy).toHaveBeenCalled();
    tmp.validation.noValidateOnMount = false;
});

test('Should have a state with no initial value', () => {
    wrapper = wrapper();
    expect(wrapper.state().pristine).toEqual(false);
    expect(wrapper.state().isDirty).toEqual(false);
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.state().value).toEqual(undefined);
})

test('Should have a state with an initial value : 123', () => {
    const mockData = { ...formDataCopy };
    mockData.address = '123';
    wrapper = wrapper(mockData);
    expect(wrapper.state().pristine).toEqual(false);
    expect(wrapper.state().isDirty).toEqual(false);
    expect(wrapper.state().isValid).toEqual(true);
    expect(wrapper.state().value).toEqual('123');
})

test('Should have a state with no initial value : 12', () => {
    const mockData = { ...formDataCopy };
    mockData.address = '12';
    wrapper = wrapper(mockData);
    expect(wrapper.state().pristine).toEqual(false);
    expect(wrapper.state().isDirty).toEqual(false);
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.state().value).toEqual('12');
})

test('forceResetValue test', (done) => {
    const TestComp = () => <div>Hello</div>;
    const FieldTestComp = FieldValueContainer(TestComp);
    const tmp = { ...textField2Copy };
    tmp.validation.noValidateOnMount = true;
    const newWrapper = shallow(
        <FieldTestComp
            validator={new StringValidator(textField2Copy)}
            template={tmp}
            event={event}
            formData={formDataCopy}
        />);
    tmp.validation.noValidateOnMount = false;
    event.on('onChange', (state, template, bool) => {
        expect(state.value).toEqual('newVal');
        expect(template).not.toBe(null);
        expect(bool).toEqual(true);
        done();
    })
    newWrapper.instance().forceResetValue('newVal');
})

test('checkIfDirty test', () => {
    wrapper = wrapper();
    expect(wrapper.instance().initialValue).toEqual(undefined);

    const isDirty = wrapper.instance().checkIfDirty(null, true);
    expect(wrapper.instance().initialValue).toEqual('');
    expect(isDirty).toEqual(true);
})
