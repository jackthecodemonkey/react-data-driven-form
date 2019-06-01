import React from 'react';
import { shallow } from 'enzyme';
import OptionsChangeListener from '../../Common/OptionsChangeListener';
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

let Component = null;
let OptionsChangeListenerComponent = null;
let wrapper = null;

beforeEach(() => {
    Component = () => <div>Test Component</div>;
    OptionsChangeListenerComponent = OptionsChangeListener(Component);
    wrapper = shallow(<OptionsChangeListenerComponent template={syncTemplates} />);
});

test('OptionsChangeListener should render a component passed', () => {
    expect(wrapper.find('Component').length).toEqual(1);
});

test('registerEvents should be called on mount', () => {
    const spy = jest.spyOn(OptionsChangeListenerComponent.prototype, 'registerEvents');
    wrapper = shallow(<OptionsChangeListenerComponent template={syncTemplates} />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});

test('Three events need to be initialized', () => {
    const localEvent = event();
    wrapper = shallow(<OptionsChangeListenerComponent event={localEvent} template={syncTemplates} />);
    expect(Object.keys(localEvent.getEvents()['AsyncOptionsUpdated']).length).toEqual(1);
    expect(Object.keys(localEvent.getEvents()['OptionsUpdated']).length).toEqual(1);
    expect(Object.keys(localEvent.getEvents()['OnReferenceSelectorOptionChanged']).length).toEqual(1);
});

test('Options via props needs to be overriden by state', () => {
    const initialOptions = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
    ];
    const updatedOptions = [
        { value: 'aa', label: 'AA' },
        { value: 'bb', label: 'BB' },
    ]
    wrapper = shallow(<OptionsChangeListenerComponent options={initialOptions} template={syncTemplates} />);
    wrapper.instance().updateState('suburb',
        { options: updatedOptions, loadingOptions: true });
    expect(wrapper.state().options).toEqual(updatedOptions);
});