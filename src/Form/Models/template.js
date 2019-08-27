

class Template {
    constructor(template = {}) {
        this.fieldType = template.fieldType;
        this.fieldName = template.fieldName;
        this.label = template.label;
        this.default = template.default;
        this.readOnly = template.readOnly || false;
        this.referenceFields = template.referenceFields || [];
        this.validation = template.validation;
        this.hasTheme = template.hasTheme;  
        this.clearIfReferenceInvalid = template.clearIfReferenceInvalid || false;
        this.options = template.options || null;
    }   
}

export default Template;