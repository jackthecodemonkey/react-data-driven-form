import React from 'react';
import FieldWrapper from '../Common/FieldWrapper';

const defaultStyle = {
    outline: 'none',
};

const TextFieldStyleWrapper = (TextField) => {
    return class TextFieldStyleWrapperComponent extends React.PureComponent {
        render() {
            const {
                isValid,
                pristine,
                template,
                style = {},
                ...others
            } = this.props;

            const noValidateOnMount = template.validation.noValidateOnMount;
            let showInvalidty = true;

            if (!!noValidateOnMount && !pristine) {
                showInvalidty = false;
            }

            const inValidStyle = (!isValid && showInvalidty) ? 'invalid' : '';

            const finalClass = `text-field ${inValidStyle}`;

            return (
                <FieldWrapper shouldUseFragment={template && template.hasTheme}>
                    <TextField style={{ ...defaultStyle, ...style }} className={finalClass} isValid={isValid} pristine={pristine} template={template} {...others} />
                </FieldWrapper>
            );
        }
    }
}

export default TextFieldStyleWrapper;
