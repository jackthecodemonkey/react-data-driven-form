class Field {
    constructor(localField = {}) {
        this.field = localField.field || null;
        this.className = localField.className || null;
        this.style = localField.style || {};
    }
}

export default Field;
