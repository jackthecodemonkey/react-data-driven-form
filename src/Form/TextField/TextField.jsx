import React from 'react';
import FieldWrapper from '../Common/FieldWrapper';

const TextField = props => {
    const {
        readOnly,
        style = {},
        onChange,
        className = '',
        label = '',
        isValid,
        pristine,
        template,
    } = props;

    const noValidateOnMount = template.validation.noValidateOnMount;
    let showInvalidty = true;

    if (!!noValidateOnMount && !pristine) {
        showInvalidty = false;
    }

    const defaultStyle = {
        outline: 'none',
        border: (!isValid && showInvalidty) ? '1px solid red' : '',
    };

    return (
        <FieldWrapper shouldUseFragment={template && template.hasTheme}>
            <label htmlFor={label}>{label}</label>
            <input
                onChange={onChange}
                value={props.value === null ? '' : props.value}
                disabled={readOnly}
                style={{ ...defaultStyle, ...style }}
                type="text" />
        </FieldWrapper>
    );
}

export default TextField;