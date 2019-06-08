import React from 'react';

const ConditionalFieldsNotifier = (Component, conditionalFields) => {
    return class ConditionalFieldsNotifierComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <React.Fragment>
                    <Component {...this.props} />
                    {conditionalFields}
                </React.Fragment>
            );
        }
    }
}

export default ConditionalFieldsNotifier;
