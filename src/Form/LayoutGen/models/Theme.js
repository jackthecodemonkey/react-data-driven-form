import Field from './Field';
import Group from './Group';

class Theme {
    constructor(localTheme = {}) {
        this.theme = Array.isArray(localTheme)
            ? localTheme.map(theme => {
                return theme.groupId
                    ? new Group(theme)
                    : new Field(theme)
            })
            : [];
    }
};

export default Theme;
