class FormDataHandler {
    constructor(template) {
        this.formData = {};
        this.template = template;
        this.invalidContext = {};
    }

    UpdateFieldData(fieldName, state, invalidContext) {
        this.formData[fieldName] = state;
        this.invalidContext[fieldName] = invalidContext;
    }

    get TotalNumberOfFields() {
        return this.template.length;
    }

    State(property) {
        return Object
            .keys(this.formData)
            .map(fieldName => this.formData[fieldName][property]);
    }

    get DefaultValues() {
        return this.template
            .reduce((acc, next) => {
                if (next.default) {
                    acc[next.fieldName] = next.default;
                }
                return acc;
            }, {});
    }

    get Value() {
        return Object
            .keys(this.formData)
            .reduce((acc, next) => {
                acc[next] = this.formData[next].value;
                return acc;
            }, {});
    }

    get Pristine() {
        const pristine = this.State('pristine');
        return pristine.some(fieldPristine => !!fieldPristine);
    }

    get IsDirty() {
        const isDirty = this.State('isDirty');
        return isDirty.some(fieldDirty => !!fieldDirty);
    }

    get IsValid() {
        const isValid = this.State('isValid')
        if (isValid.length < this.TotalNumberOfFields) return null;
        return isValid.every(fieldValid => !!fieldValid);
    }

    get MergedData() {
        if (this.IsValid === null) return null;
        return {
            isDirty: this.IsDirty,
            pristine: this.Pristine,
            value: this.Value,
            isValid: this.IsValid,
            invalidContext: this.invalidContext,
        }
    }
}

export default FormDataHandler;
