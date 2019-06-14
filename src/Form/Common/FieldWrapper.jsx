import React from 'react';

const FieldWrapper = (props) => {
    const {
        children,
        className = "form-field",
        shouldUseFragment,
    } = props;
    return (
        shouldUseFragment
            ? (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )
            :
            (
                <div className={className}>
                    {children}
                </div>
            )
    );
}

export default FieldWrapper;
