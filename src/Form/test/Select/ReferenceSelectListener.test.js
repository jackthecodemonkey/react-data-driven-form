import React from 'react';
import { shallow } from 'enzyme';
import ReferenceSelectListener, { getUrl, IsFieldInReferences } from '../../Select/ReferenceSelectListener';
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
let ReferenceSelectListenerComponent = null;
let wrapper = null;

beforeEach(() => {
    Component = () => <div>Test Component</div>;
    ReferenceSelectListenerComponent = ReferenceSelectListener(Component);
    wrapper = shallow(<ReferenceSelectListenerComponent template={syncTemplates} />);
});

test('ReferenceSelectListener should render a component passed', () => {
    expect(wrapper.find('Component').length).toEqual(1);
});

test('registerEvents should be called on mount', () => {
    const spy = jest.spyOn(ReferenceSelectListenerComponent.prototype, 'registerEvents');
    wrapper = shallow(<ReferenceSelectListenerComponent template={syncTemplates} />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});

test('Three events need to be initialized', () => {
    const localEvent = event();
    wrapper = shallow(<ReferenceSelectListenerComponent event={localEvent} template={syncTemplates} />);
    expect(localEvent.list.has('AsyncOptionsUpdated')).toEqual(true);
    expect(localEvent.list.has('OptionsUpdated')).toEqual(true);
    expect(localEvent.list.has('OnReferenceSelectorOptionChanged')).toEqual(true);
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
    wrapper = shallow(<ReferenceSelectListenerComponent options={initialOptions} template={syncTemplates} />);
    wrapper.instance().updateState('suburb',
        { options: updatedOptions, loadingOptions: true });
    expect(wrapper.state().options).toEqual(updatedOptions);
});