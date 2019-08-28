class Validation {
    constructor(validation = {}) {
        this.maxLength = validation.maxLength;
        this.minLength = validation.minLength;
        this.minSelect = validation.minSelect;
        this.maxSelect = validation.maxSelect;
        this.pattern = validation.pattern;
        this.patternName = validation.patternName;
        this.noValidateOnMount = validation.noValidateOnMount || false;
        this.required = validation.required || false;
    }
}

export default Validation;
