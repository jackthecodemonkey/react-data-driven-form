import Field from './Field';
import Group from './Group';

class Theme {
    constructor(localTheme = {}) {
        this.components = {};
        this.theme = Array.isArray(localTheme)
            ? localTheme.map(theme => {
                return theme.groupId
                    ? new Group(theme)
                    : new Field(theme)
            })
            : [];
    }
    
    AddComponent(field, component) {
        this.components[field] = component;
    }

    FindField(field) {
        let found = false;
        this.theme.forEach((local) => {
            const hasField = local.FindField(field);
            if (hasField) found = true;
        })
        return found;
    }

    FindFields(fields) {
        return fields.map(field => this.FindField(field)).filter(found => found).length === fields.length;
    }
};

export default Theme;
