import Template from './template';

class Templates {
    constructor(templates = []) {
        this.templates = Array.isArray(templates)
            ? templates.map(template => new Template(template))
            : []
    }
}

export default Templates;