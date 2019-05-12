import rules from '../Validator/ValidationRules';

class SelectValidator {
    constructor(validation = {}) {
        this.options = validation.options || [];
        this.required = validation.required || false;
        this.inValidFields = [];
    }

    updateOptions(options) {
        this.options = options;
    }

    validate(value) {
        this.inValidFields = [];
        if (!value) this.inValidFields.push(rules.required);
        return this.inValidFields.length === 0;
    }
}

export default SelectValidator;