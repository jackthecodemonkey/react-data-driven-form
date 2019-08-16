import rules from '../Models/validationRule';
import InvalidFieldContext from '../Models/invalidContext';

class SelectValidator extends InvalidFieldContext {
    constructor(validation = {}, customInvalidContext = {}) {
        super(validation, customInvalidContext);
        this.required = validation.required || false;
        this.inValidFields = [];
    }

    validate(value) {
        this.inValidFields = [];
        if (!value && this.required) this.inValidFields.push(this.GetInvalidContext(rules.required));
        return this.inValidFields.length === 0;
    }

    getInvalidContext() {
        return this.inValidFields;
    }
}

export default SelectValidator;