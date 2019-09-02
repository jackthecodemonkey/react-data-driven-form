import React from 'react';

const ConditionalFieldsNotifier = (Component, conditionalFields, shouldHideConditionalFields) => {
    return class ConditionalFieldsNotifierComponent extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <Component {...this.props} />
                    {shouldHideConditionalFields ? null : conditionalFields}
                </React.Fragment>
            );
        }
    }
}

export default ConditionalFieldsNotifier;
