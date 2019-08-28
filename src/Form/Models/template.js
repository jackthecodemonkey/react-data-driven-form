
import Validation from './validation';

class Template {
    constructor(template = {}) {
        this.fieldType = template.fieldType;
        this.fieldName = template.fieldName;
        this.label = template.label;
        this.default = template.default;
        this.readOnly = template.readOnly || false;
        this.referenceFields = template.referenceFields || [];
        this.validation = new Validation(template.validation);
        this.hasTheme = template.hasTheme;
        this.clearIfReferenceInvalid = template.clearIfReferenceInvalid || false;
        
        // Properties for Select, Radio and Checkbox async options fetch
        this.options = template.options || null;
        this.fetchByRefAsync = template.fetchByRefAsync;
        this.refSelector = template.refSelector;
        this.async = template.async;
        this.url = template.url;
        
        // Field for determining which child field to show
        // eg) Radio - 1.A (Orange field), 2.B (Grape field) 
        this.conditional = template.conditional;
        this.defaultField = template.defaultField;
        this.fields = Array.isArray(template.fields)
            ? template.fields.map(field => new Template(field))
            : null;

        // Properties which child field should have
        this.conditionalListener = template.conditionalListener;
        this.show = template.show;

    }
}

export default Template;