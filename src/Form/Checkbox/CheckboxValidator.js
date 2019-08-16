import rules from '../Models/validationRule';
import InvalidFieldContext from '../Models/invalidContext';

class CheckboxValidator extends InvalidFieldContext  {
    constructor(validation = {}, customInvalidContext = {}) {
        super(validation, customInvalidContext);
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
        if (!this.hasValue(value) && this.required) this.inValidFields.push(this.GetInvalidContext(rules.required));
        if (this.minSelect && value.length < this.minSelect) this.inValidFields.push(this.GetInvalidContext(rules.minSelect, value.length));
        if (this.maxSelect && value.length > this.maxSelect) this.inValidFields.push(this.GetInvalidContext(rules.maxSelect, value.length));
        return this.inValidFields.length === 0;
    }

    getInvalidContext() {
        return this.inValidFields;
    }
}

export default CheckboxValidator;