import React, { Component } from 'react';

const Field = (field, getContent) => {
    return React.cloneElement(<div></div>, {
        className: field.className,
        style: field.style,
        children: getContent && getContent(field.field),
        key: field.className,
    });
}

export default Field;