import React from 'react';
import GetFields from './FieldsGen';
import Theme from './models/Theme';

const CreateElementsFactory = (theme) => {
    theme = theme instanceof Theme ? theme : new Theme(theme);
    return (templates) => {
        return React.cloneElement(<React.Fragment></React.Fragment>, {
            children: [...GetFields(theme.theme, templates)]
        });
    }
}

const CreateElements = (theme, templates) => {
    return CreateElementsFactory(new Theme(theme))(templates);
}



export { CreateElementsFactory };
export default CreateElements;
