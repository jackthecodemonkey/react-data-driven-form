import React from 'react';
import makeid from '../RandomStringGen';

const ConditionalFieldsListener = (Component) => {
    return class ConditionalFieldsListenerComponent extends React.Component {
        constructor(props) {
            super(props);
            this.onChangeEventKey = makeid();
            this.state = {
                show: false,
            }
        }

        componentWillMount() {
            this.props.event.on(`onChange:${this.onChangeEventKey}`, (data, template) => {
                if (template.fieldName === this.props.template.conditionalListener) {
                    const value = typeof data.value === 'object' ? data.value.value : data.value;
                    if (value === this.props.template.show) {
                        this.setState({
                            show: true,
                        })
                    } else {
                        this.setState({
                            show: false,
                        })
                    }

                }
            })
        }

        componentWillUnmount() {
            this.props.event.off(`onChange:${this.onChangeEventKey}`);
        }

        render() {
            return (
                <React.Fragment>
                    {this.state.show && <Component {...this.props} />}
                </React.Fragment>
            );
        }
    }
}

export default ConditionalFieldsListener;