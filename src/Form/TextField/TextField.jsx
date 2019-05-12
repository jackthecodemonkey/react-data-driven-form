import React, { Component } from 'react';

const TextField = props => {
    const {
        readOnly,
        style = {},
        onChange,
        classNames = '',
        value,
        isValid,
    } = props;
    const defaultStyle = {
        outline: 'none',
        border: !isValid ? '1px solid red' : '',
    };
    const className = '';
    return <input
        onChange={onChange}
        value={value}
        disabled={readOnly}
        style={{ ...defaultStyle, ...style }}
        type="text" />
}

export default TextField;