import React from 'react';

const TextField = props => {
    const {
        readOnly,
        style = {},
        onChange,
        className = '',
        label = '',
        isValid,
        template,
    } = props;

    const defaultStyle = {
        outline: 'none',
        border: !isValid ? '1px solid red' : '',
    };

    return (
        <div id={template && template.fieldName} className='form-field'>
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