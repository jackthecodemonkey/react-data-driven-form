import React from 'react';
import TextFieldStyleWrapper from './TextFieldStyleWrapper';

const TextField = props => {
    const {
        readOnly,
        style = {},
        onChange,
        className = '',
        labelStyle,
        label = '',
    } = props;
 
    return (
        <React.Fragment>
            <label className={labelStyle} htmlFor={label}>{label}</label>
            <input
                className={className}
                onChange={onChange}
                value={props.value === null ? '' : props.value}
                disabled={readOnly}
                style={style}
                type="text" />
        </React.Fragment>
    );
}

export default TextFieldStyleWrapper(TextField);