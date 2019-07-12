import React, { Component } from 'react';
import GetFields from './FieldsGen';

const Group = (group, templates) => {
    const {
        groupId,
        className,
        style,
        subGroup,
    } = group;
    return React.cloneElement(<div></div>, {
        className: className
            ? `form-group ${className}`
            : 'form-group',
        style,
        children: [...GetFields(subGroup, templates)]
    });
}

export default Group;