const areRequiredFieldsInSelectTemplate = (requiredFields, template) => {
    let isValid = true;
    let keys = Array.isArray(template) ? template : Object.keys(template);
    requiredFields.forEach(prop => { if (isValid) isValid = keys.includes(prop) })
    return isValid;
};

const hasTemplateAnyOf = (fieldsNeedToHave, template) => {
    let keys = Object.keys(template);
    let isValid = false;
    keys.forEach(prop => { if (!isValid) isValid = fieldsNeedToHave.includes(prop) })
    return isValid;
}

export {
    areRequiredFieldsInSelectTemplate,
    hasTemplateAnyOf,
}