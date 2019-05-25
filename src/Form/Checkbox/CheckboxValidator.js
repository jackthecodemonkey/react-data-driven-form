import rules from '../Validator/ValidationRules';

class CheckboxValidator {
    constructor(validation = {}) {
        this.required = validation.required || false;
        this.minSelect = validation.minSelect || null;
        this.maxSelect = validation.maxSelect || null;
        this.inValidFields = [];
    }

    hasValue(value) {
        return value && value.length > 0;
    }

    validate(value = []) {
        this.inValidFields = [];
        if (!this.hasValue(value) && this.required) this.inValidFields.push(rules.required);
        if (this.minSelect && value.length < this.minSelect) this.inValidFields.push(rules.minSelect);
        if (this.maxSelect && value.length > this.maxSelect) this.inValidFields.push(rules.maxSelect);
        return this.inValidFields.length === 0;
    }
}

export default CheckboxValidator;