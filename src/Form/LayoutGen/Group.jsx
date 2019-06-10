import React, { Component } from 'react';
import GetFields from './FieldsGen';

const Group = (group, getContent) => {
    const {
        groupId,
        className,
        style,
        subGroup,
    } = group;
    return React.cloneElement(<div></div>, {
        className,
        style,
        children: [...GetFields(subGroup, getContent)]
    });
}

export default Group;