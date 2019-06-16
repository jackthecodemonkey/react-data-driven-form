import React from 'react';
import GetFields from './FieldsGen';
import Theme from './models/Theme';

/**
 * @param {*Array} theme 
 *   [{
        groupId: 'group-1',
        className: 'sub-groupId-2',
        subGroup: [
          {
            groupId: 'sub-groupId-111',
            className: 'sub-groupId-111',
            subGroup: [
              {
                field: 'fruit',
                className: 'fruit',
              },
            ]
          },
          {
            field: 'icecream',
            className: 'icecream',
          },
        ]
      }],
 */

 /**
  * 
  * @param {Object} components
  * {
  *   fruit: React.component to be rendered eg) <input type='text'/> 
  *   icecream: React.component
  * } 
  * @return {React Component} components with theme
  */


const CreateElementsFactory = (theme) => {
    theme = theme instanceof Theme ? theme : new Theme(theme);
    return (components) => {
        return React.cloneElement(<React.Fragment></React.Fragment>, {
            children: [...GetFields(theme.theme, components)]
        });
    }
}

const CreateElements = (theme, components) => {
    return CreateElementsFactory(new Theme(theme))(components);
}

export { CreateElementsFactory };
export default CreateElements;
