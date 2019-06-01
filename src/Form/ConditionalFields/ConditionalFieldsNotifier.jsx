import React from 'react';

const ConditionalFieldsNotifier = (Component, conditionalFields) => {
    return class ConditionalFieldsNotifierComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <Component {...this.props} />
                    {conditionalFields}
                </div>
            );
        }
    }
}

export default ConditionalFieldsNotifier;
