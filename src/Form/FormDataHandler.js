class FormDataHandler {
    constructor(template) {
        this.formData = {};
        this.template = template;
        this.invalidFields = {};
    }

    UpdateFieldData(fieldName, state, invalidFields) {
        this.ClearConditionalFieldsData(fieldName);
        this.formData[fieldName] = state;
        this.invalidFields[fieldName] = invalidFields;
    }

    ClearConditionalFieldsData(fieldName) {
        const field = this.FindField(fieldName);
        if (field && field.conditional) {
            field.fields.forEach(localField => {
                delete this.invalidFields[localField.fieldName];
                delete this.formData[localField.fieldName];
            })
        }
    }

    FindField(fieldName) {
        return this.template.find(t => t.fieldName === fieldName);
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
            invalidFields: this.invalidFields,
        }
    }
}

export default FormDataHandler;
