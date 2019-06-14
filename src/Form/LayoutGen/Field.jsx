import React, { Component } from 'react';

const Field = (field, templates) => {
    return React.cloneElement(<div></div>, {
        className: field.className,
        style: field.style,
        children: templates && templates[field.field],
        key: field.className,
    });
}

export default Field;