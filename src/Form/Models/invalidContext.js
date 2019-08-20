import InvalidFieldsMessage from './invalidMessages';
import Pattern from './patterns';

class InvalidFieldContext {
    constructor(requiredValidationRules = {}, customInvalidContext = {}) {
        this.requiredValidationRules = requiredValidationRules;
        this.customInvalidContext = customInvalidContext;

        if (this.requiredValidationRules.pattern) {
            if (!this.requiredValidationRules.pattern instanceof RegExp) {
                throw new Error('Pattern should be a RegExp.');
            }
            if (!this.GetPatternName(this.requiredValidationRules.pattern) && !this.requiredValidationRules.patternName) {
                throw new Error('Custom pattern should be passed with its name.');
            }
        }
    }

    get IsPattenCustom() {
        return !!this.requiredValidationRules.patternName;
    }

    DefaultContext(rule) {
        return `The field ${rule} is not valid`;
    }

    GetInvalidContext(rule, value) {
        if (!this.requiredValidationRules[rule]) throw new Error(`${rule} is not defined in the form template.`);
        if (!InvalidFieldsMessage[rule] && !this.customInvalidContext[rule]) throw new Error(`Invalid message for the ${rule} is not found.`);
        return this.FindInvalidContext(rule, value);
    }

    FindInvalidContext(rule, value) {
        return this.customInvalidContext[rule]
            ? this.FormatInvalidContext(this.customInvalidContext[rule], rule, value)
            : this.FormatInvalidContext(InvalidFieldsMessage[rule] || this.DefaultContext(rule), rule, value)
    }

    GetPatternName(pattern) {
        if (this.requiredValidationRules.patternName) return this.requiredValidationRules.patternName;
        return Object.keys(Pattern).find(localPattern => Pattern[localPattern].toString() === (pattern && pattern.toString()));
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

export default InvalidFieldContext;
