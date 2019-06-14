import React, { Component } from 'react';
import makeid from '../RandomStringGen';
import FieldComponent from './Field';
import GroupComponent from './Group';
import Field from './models/Field';
import Group from './models/Group';

const GetFields = (fields, templates) => {
    let children = [];
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field instanceof Group) {
            const nextGroup = React.cloneElement(<React.Fragment></React.Fragment>, {
                className: field.className,
                style: field.style,
                key: makeid(),
                children: GroupComponent(field, templates)
            });
            children.push(nextGroup)
        } else if (field instanceof Field) {
            children.push(FieldComponent(field, templates))
        }
    }
    return children;
}

export default GetFields;