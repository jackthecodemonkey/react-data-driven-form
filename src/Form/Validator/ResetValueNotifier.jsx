import React from 'react';
import events from '../event';
import makeid from '../RandomStringGen';

const ResetValueNotifier = Component => {
    return class ResetValueNotifierComponent extends React.Component {
        constructor(props) {
            super(props);
            this.event = this.props.event || events();
            this.ResetSelectedValueEventKey = makeid();
        }

        componentWillMount() {
            this.event.on(`ResetSelectedValue:${this.ResetSelectedValueEventKey}`, (fieldName, newValue) => {
                if (fieldName === this.props.template.fieldName) {
                    this.props.forceResetValue && this.props.forceResetValue(newValue);
                }
            })
        }

        componentWillUnmount() {
            this.event.off(`ResetSelectedValue:${this.ResetSelectedValueEventKey}`);
        }

        render() {
            return (
                <Component event={this.event} {...this.props} />
            );
        }

    }
}

export default ResetValueNotifier;