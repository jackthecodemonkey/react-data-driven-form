import rules from '../Validator/ValidationRules';

/*
* TODO:: Make default text regexps like Letter, Number, Currency, etc
*/

const InvalidFieldsMessage = Object.freeze({
    required: 'This field is required',
    minLength: 'Minimum length of the field is {}. You have entered {} length',
    maxLength: 'Max length of the field is {}. You have entered {} length',
})

class InvalidFieldContext {
    constructor(requiredValidationRules = {}, customInvalidContext = {}) {
        this.requiredValidationRules = requiredValidationRules;
        this.customInvalidContext = customInvalidContext;
    }

    GetInvalidContext(rule, value) {
        if (!this.requiredValidationRules[rule]) throw new Error(`${rule} is not defined in the form template.`);
        if (!InvalidFieldsMessage[rule] && !this.customInvalidContext[rule]) throw new Error(`Invalid message for the ${rule} is not found.`);
        return this.customInvalidContext[rule]
            ? this.FormatInvalidContext(this.customInvalidContext[rule], rule, value)
            : this.FormatInvalidContext(InvalidFieldsMessage[rule], rule, value)
    }

    FormatInvalidContext(message, rule, value) {
        const requiredValue = this.requiredValidationRules[rule];
        const invalidMessage = this.ReplaceWith(message, '{}', requiredValue);
        return this.ReplaceWith(invalidMessage, '{}', value);
    }

    ReplaceWith(message, find, replaceWith) {
        if (message.indexOf(find) > -1) return message.replace(/{}/, replaceWith);
        return message;
    }
}

class StringValidator extends InvalidFieldContext {
    constructor(validation = {}, customInvalidContext = {}) {
        super(validation, customInvalidContext);
        this.minLength = validation.minLength || null;
        this.maxLength = validation.maxLength || null;
        this.regexp = validation.regexp || null;
        this.required = validation.required || false;
        this.inValidFields = [];
    };

    validate(localString) {
        this.inValidFields = [];
        const string = localString ? localString.toString() : localString;
        if (this.required && !string) this.inValidFields.push(this.GetInvalidContext(rules.required));
        if (string && this.minLength && string.length < this.minLength) this.inValidFields.push(this.GetInvalidContext(rules.minLength, string.length));
        if (string && this.maxLength && string.length > this.maxLength) this.inValidFields.push(this.GetInvalidContext(rules.maxLength, string.length));
        if (!!string && this.regexp) {
            if (!new RegExp(this.regexp).test(string)) this.inValidFields.push(rules.regexp);
        }
        return this.inValidFields.length === 0;
    }

    getInvalidContext() {
        return this.inValidFields;
    }
}

export default StringValidator;