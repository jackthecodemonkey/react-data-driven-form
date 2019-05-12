import React from 'react';
import { templates } from './mockTemplate';
import { areRequiredFieldsInSelectTemplate } from './templateTestUtil';

test('Field names in referenceFields should be in template', () => {
  const fieldNames = Object.keys(templates).reduce((acc, next) => {
    const field = templates[next];
    if (!acc.includes(field.fieldName)) acc.push(field.fieldName);
    return acc;
  }, [])
  const referenceFields = Object.keys(templates).reduce((acc, next) => {
    const field = templates[next];
    field.referenceFields.forEach(refField=>{
      if(!acc.includes(refField)) acc.push(refField);
    })
    return acc;
  }, [])
  const isValid = areRequiredFieldsInSelectTemplate(referenceFields, fieldNames);
  expect(isValid).toBe(true);
});