import rules from '../Validator/ValidationRules';

const InvalidMessage = Object.freeze({
    required: 'This field is required',
    minLength: 'Mininmum length of this field is {}',
    maxLength: 'Max length of this field is {}',
})

class StringValidator {
    constructor(validation = {}) {
        this.minLength = validation.minLength || null;
        this.maxLength = validation.maxLength || null;
        this.regexp = validation.regexp || null;
        this.required = validation.required || false;
        this.inValidFields = [];
    };

    validate(localString) {
        this.inValidFields = [];
        const string = localString ? localString.toString() : localString;
        if (this.required && !string) this.inValidFields.push(rules.required);
        if (string && this.minLength && string.length < this.minLength) this.inValidFields.push(rules.minLength);
        if (string && this.maxLength && string.length > this.maxLength) this.inValidFields.push(rules.maxLength);
        if (!!string && this.regexp) {
            if (!new RegExp(this.regexp).test(string)) this.inValidFields.push(rules.regexp);
        }
        return this.inValidFields.length === 0;
    }
}

export default StringValidator;