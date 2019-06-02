import React from 'react';

const TextField = props => {
    const {
        readOnly,
        style = {},
        onChange,
        classNames = '',
        label = '',
        isValid,
    } = props;

    const defaultStyle = {
        outline: 'none',
        border: !isValid ? '1px solid red' : '',
    };

    const className = '';
    return (
        <div className='form-field'>
            <label htmlFor={label}>{label}</label>
            <input
                onChange={onChange}
                value={props.value === null ? '' : props.value}
                disabled={readOnly}
                style={{ ...defaultStyle, ...style }}
                type="text" />
        </div>
    );
}

export default TextField;