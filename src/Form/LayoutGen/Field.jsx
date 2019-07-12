import React, { Component } from 'react';

const Field = (field, templates) => {
    return React.cloneElement(<div></div>, {
        className: field.className
            ? `form-field ${field.className}`
            : 'form-field',
        style: field.style,
        children: templates && templates[field.field],
        key: field.className,
    });
}

export default Field;