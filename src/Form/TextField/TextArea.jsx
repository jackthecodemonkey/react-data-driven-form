import React from 'react';
import FieldWrapper from '../Common/FieldWrapper';

const defaultStyle = {
    outline: 'none',
};

const TextArea = props => {
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
            <label htmlFor={label}>
                {label}
            </label>
            <textarea
                className={finalClass}
                onChange={onChange}
                value={props.value === null ? '' : props.value}
                disabled={readOnly}
                style={{ ...defaultStyle, ...style }}
            >
            </textarea>
        </FieldWrapper>
    );
}

export default TextArea;