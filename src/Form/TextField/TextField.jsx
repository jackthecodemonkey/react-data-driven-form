import React from 'react';
import FieldWrapper from '../Common/FieldWrapper';

const defaultStyle = {
    outline: 'none',
};

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

    const inValidStyle = (!isValid && showInvalidty) ? 'invalid' : '';

    const finalClass = `text-field ${inValidStyle}`;

    return (
        <FieldWrapper shouldUseFragment={template && template.hasTheme}>
            <label htmlFor={label}>{label}</label>
            <input
                className={finalClass}
                onChange={onChange}
                value={props.value === null ? '' : props.value}
                disabled={readOnly}
                style={{ ...defaultStyle, ...style }}
                type="text" />
        </FieldWrapper>
    );
}

export default TextField;