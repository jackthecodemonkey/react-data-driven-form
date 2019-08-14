import React from 'react';
import TextFieldStyleWrapper from './TextFieldStyleWrapper';

const TextArea = props => {
    const {
        readOnly,
        style = {},
        onChange,
        className,
        label = '',
    } = props;

    return (
        <React.Fragment>
            <label htmlFor={label}>
                {label}
            </label>
            <textarea
                className={className}
                onChange={onChange}
                value={props.value === null ? '' : props.value}
                disabled={readOnly}
                style={style}
            >
            </textarea>
        </React.Fragment>
    );
}

export default TextFieldStyleWrapper(TextArea);