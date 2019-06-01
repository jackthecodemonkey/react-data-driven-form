import React from 'react';
import { shallow } from 'enzyme';
import FetchOptions from '../../Common/FetchOptions';
import event from '../../event';

const syncTemplates = {
    fieldType: 'select',
    fieldName: 'suburb',
    label: 'Suburb',
    referenceFields: ['state', 'address'],
    options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ],
    fetchByRefAsync: true,
    refSelector: 'state',
    validation: {
        required: false,
    }
};

const asyncTemplates = {
    fieldType: 'select',
    fieldName: 'suburb',
    label: 'Suburb',
    referenceFields: ['state', 'address'],
    async: true,
    url: 'testUrl',
    fetchByRefAsync: true,
    refSelector: 'state',
    validation: {
        required: false,
    }
};

let Component = null;
let FetchOptionsComponent = null;
let wrapper = null;

beforeEach(() => {
    Component = () => <div>Test Component</div>;
    FetchOptionsComponent = FetchOptions(Component);
    wrapper = shallow(<FetchOptionsComponent template={syncTemplates} />);
});

test('FetchOptions should render a component passed', () => {
    expect(wrapper.find('Component').length).toEqual(1);
});

test('FetchOptions should have an instance of event by default', () => {
    expect(typeof wrapper.instance().event).toEqual('object');
});

test('FetchOptions should have an instance of event via props', () => {
    wrapper = shallow(<FetchOptionsComponent event={event()} template={syncTemplates} />);
    expect(typeof wrapper.instance().event).toEqual('object');
});

test('Event needs to be initialized on component mount', () => {
    const localEvent = event();
    wrapper = shallow(<FetchOptionsComponent event={localEvent} template={syncTemplates} />);
    expect(Object.keys(localEvent.getEvents()['OnFetchOptions']).length).toEqual(1);
});

test('Spy on fetchOptions method', () => {
    const localEvent = event();
    const spy = jest.spyOn(FetchOptionsComponent.prototype, 'fetchOptions');
    wrapper = shallow(<FetchOptionsComponent event={localEvent} template={syncTemplates} />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});

test('Options need to be initialized if async and url not given', () => {
    expect(wrapper.state().loadingOptions).toEqual(false);
    expect(wrapper.state().options).toEqual(syncTemplates.options);
}); 

test('Spy on fetchOptionsAsync method', () => {
    const localEvent = event();
    const spy = jest.spyOn(FetchOptionsComponent.prototype, 'fetchOptionsAsync');
    wrapper = shallow(<FetchOptionsComponent event={localEvent} template={asyncTemplates} />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});

