import {
    textField1,
} from './mockTemplate';

import { areRequiredFieldsInSelectTemplate } from './templateTestUtil';

const requiredFields = ['fieldType','fieldName','label','referenceFields','validation'];

test('Valid text field template has required properties', () => {
    const isValid = areRequiredFieldsInSelectTemplate(requiredFields,textField1);
    expect(isValid).toBe(true);
});
