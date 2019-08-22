import React, { Component } from 'react';

const Field = (field, templates) => {
    return React.cloneElement(<div></div>, {
        className: field.className
            ? `form-field ${field.className}`
            : 'form-field',
        style: field.style,
        children: templates && React.cloneElement(templates[field.field], { style: field.style }),
        key: field.className,
    });
}

export default Field;