class FormDataHandler {
    constructor(template) {
        this.formData = {};
        this.template = template;
    }

    UpdateFieldData(fieldName, state) {
        this.formData[fieldName] = state;
    }

    get TotalNumberOfFields() {
        return this.template.length;
    }

    State(property) {
        return Object
            .keys(this.formData)
            .map(fieldName => this.formData[fieldName][property]);
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
        }
    }
}

export default FormDataHandler;
