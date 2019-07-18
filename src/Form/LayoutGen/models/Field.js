class Field {
    constructor(localField = {}) {
        this.field = localField.field || null;
        this.className = localField.className || localField.field || null;
        this.style = localField.style || {};
    }

    FindField(field) {
        return this.field === field;
    }
}

export default Field;
