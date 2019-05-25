import ValidatorSelector from './ValidatorSelector';

const ReferenceValidator = (referenceFields, templates) => {
    if (!referenceFields.length) return null;
    return referenceFields.map((referenceField => {
        const matchedField = templates.find(template => template.fieldName === referenceField);
        return {
            fieldName: referenceField,
            validator: ValidatorSelector({ fieldType: matchedField.fieldType, validation: matchedField.validation }),
        }
    }))
}

export default ReferenceValidator;
