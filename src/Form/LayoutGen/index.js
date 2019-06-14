import React from 'react';
import GetFields from './FieldsGen';

const CreateElements = (theme, getContent) => {
    return React.cloneElement(<div></div>, {
        children: [...GetFields(theme.theme, getContent)]
    });
}

export default CreateElements;
