import {
    select1,
    select2,
    inValidSelect1,
    inValidSelect2,
} from './mockTemplate';

import { areRequiredFieldsInSelectTemplate, hasTemplateAnyOf } from './templateTestUtil';

const requiredFields = ['fieldType', 'fieldName', 'label', 'referenceFields', 'validation'];

test('Valid select template has required properties 1', () => {
    const isValid = areRequiredFieldsInSelectTemplate(requiredFields, select1);
    expect(isValid).toBe(true);
});

test('Valid select template has required properties 2', () => {
    const isValid = areRequiredFieldsInSelectTemplate(requiredFields, select2);
    expect(isValid).toBe(true);
});

test('Select template should have either async or options 2', () => {
    const isValid = hasTemplateAnyOf(['async', 'options'], select2);
    expect(isValid).toBe(true);
});

test('Select template should have either async or options 1 ', () => {
    const isValid = hasTemplateAnyOf(['async', 'options'], inValidSelect1);
    expect(isValid).toBe(false);
});

test('Select template should have refSelector and fetchByRefAsync if async is missing', () => {
    const isValid = areRequiredFieldsInSelectTemplate(['refSelector', 'fetchByRefAsync'], inValidSelect2);
    expect(isValid).toBe(false);
});