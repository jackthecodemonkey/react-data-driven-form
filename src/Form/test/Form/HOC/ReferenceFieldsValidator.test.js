import React from 'react';
import { mount, shallow } from 'enzyme';
import { select1, textField2, select2, formData } from '../../template/mockTemplate';
import events from '../../../event';
import ReferenceFieldsValidator from '../../../Validator/ReferenceFieldsValidator';
import SelectValidator from '../../../Select/SelectValidator';
import StringValidator from '../../../TextField/StringValidator';

let select1Copy = { ...select1 };
let select2Copy = { ...select2 };
let textField2Copy = { ...textField2 };
let formDataCopy = { ...formData };

const referenceFieldsValidatorFunctions =
    [
        {
            fieldName: 'state',
            validator: new SelectValidator(select1Copy.validation),
        },
        {
            fieldName: 'address',
            validator: new StringValidator(textField2Copy.validation),
        }
    ];

let wrapper = null;
let event = null;

const partialWrapper = (Component, event) => (localFormData = formDataCopy, localTemplate = select2Copy) => {
    return shallow(
        <Component
            template={localTemplate}
            event={event}
            formData={localFormData}
            referenceValidators={referenceFieldsValidatorFunctions}
        />);
}

beforeEach(() => {
    event = events();
    const TestComp = () => <div>Test</div>;
    const ReferenceFieldValidatorCom = ReferenceFieldsValidator(TestComp);
    wrapper = partialWrapper(ReferenceFieldValidatorCom, event);
})

test('state: readOnly should be true on mount', () => {
    expect(wrapper().state().readOnly).toEqual(true);
})

test('state: readOnly should be false on mount', () => {
    formDataCopy.address = 123;
    expect(wrapper(formDataCopy).state().readOnly).toEqual(false);
    delete formDataCopy.address;
})

test('state: readOnly should be true on mount if validation false', () => {
    formDataCopy.address = 12;
    wrapper = wrapper(formDataCopy);
    expect(wrapper.state().readOnly).toEqual(true);
    delete formDataCopy.address;
})

test('Event: readOnly should be false after value updated', (done) => {
    formDataCopy.address = 12;
    wrapper = wrapper(formDataCopy);
    expect(wrapper.state().readOnly).toEqual(true);
    event.emit('onChange', {
        value: 121,
    }, textField2Copy);
    wrapper.update();
    setTimeout(() => {
        expect(wrapper.state().readOnly).toEqual(false);
        done();
    })
})

test('Event: readOnly should be true after value updated', (done) => {
    formDataCopy.address = 121;
    wrapper = wrapper(formDataCopy);
    expect(wrapper.state().readOnly).toEqual(false);
    event.emit('onChange', {
        value: 12,
    }, textField2Copy);
    wrapper.update();
    setTimeout(() => {
        expect(wrapper.state().readOnly).toEqual(true);
        done();
    })
})

test('Event: Should skip onChange event', (done) => {
    formDataCopy.address = 121;
    wrapper = wrapper(formDataCopy);
    expect(wrapper.state().readOnly).toEqual(false);
    event.emit('onChange', {
        value: 12,
    }, textField2Copy, true);
    wrapper.update();
    setTimeout(() => {
        expect(wrapper.state().validFields.address).toEqual(121);
        expect(wrapper.state().readOnly).toEqual(false);
        done();
    })
})

test('Event: ResetSelectedValue should be triggered', (done) => {
    select2Copy.clearIfReferenceInvalid = true;
    event.on('ResetSelectedValue', () => {
        expect(wrapper.state().readOnly).toEqual(true);
        done();
        delete select2Copy.clearIfReferenceInvalid;
    })
    wrapper = wrapper(formDataCopy, select2Copy);
    event.emit('onChange', {
        value: 12,
    }, textField2Copy);
    wrapper.update();
});

test('Event: ResetSelectedValue should not be triggered', (done) => {
    event.on('ResetSelectedValue', () => {
        /* This event should never be called */
        expect(true).toEqual(false);
    })
    wrapper = wrapper(formDataCopy, select2Copy);
    event.emit('onChange', {
        value: 12,
    }, textField2Copy);
    wrapper.update();
    setTimeout(() => {
        expect(wrapper.state().readOnly).toEqual(true);
        done();
    }, 3000);
});


test('Event: Should unlisten event after component unmounted', () => {
    formDataCopy.address = 121;
    wrapper = wrapper(formDataCopy);
    expect(Object.keys(event.getEvents('onChange')).length).toEqual(1);
    wrapper.instance().componentWillUnmount();
    expect(Object.keys(event.getEvents('onChange')).length).toEqual(0);
})