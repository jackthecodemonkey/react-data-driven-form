import rules from '../Validator/ValidationRules';

class SelectValidator {
    constructor(validation = {}) {
        this.required = validation.required || false;
        this.inValidFields = [];
    }

    validate(value) {
        this.inValidFields = [];
        if (!value && this.required) this.inValidFields.push(rules.required);
        return this.inValidFields.length === 0;
    }
}

export default SelectValidator;