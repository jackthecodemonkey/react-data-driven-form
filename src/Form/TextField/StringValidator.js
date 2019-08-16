import rules from '../Models/validationRule';
import InvalidFieldContext from '../Models/invalidContext';

class StringValidator extends InvalidFieldContext {
    constructor(validation = {}, customInvalidContext = {}) {
        super(validation, customInvalidContext);
        this.minLength = validation.minLength || null;
        this.maxLength = validation.maxLength || null;
        this.pattern = validation.pattern || null;
        this.required = validation.required || false;
        this.inValidFields = [];
    };

    validate(localString) {
        this.inValidFields = [];
        const string = localString ? localString.toString() : localString;
        if (this.required && !string) this.inValidFields.push(this.GetInvalidContext(rules.required));
        if (string && this.minLength && string.length < this.minLength) this.inValidFields.push(this.GetInvalidContext(rules.minLength, string.length));
        if (string && this.maxLength && string.length > this.maxLength) this.inValidFields.push(this.GetInvalidContext(rules.maxLength, string.length));
        if (!!string && this.pattern) {
            if (!new RegExp(this.pattern).test(string)) this.inValidFields.push(this.FindInvalidContext(this.GetPatternName(this.pattern), string));
        }
        return this.inValidFields.length === 0;
    }

    getInvalidContext() {
        return this.inValidFields;
    }
}

export default StringValidator;