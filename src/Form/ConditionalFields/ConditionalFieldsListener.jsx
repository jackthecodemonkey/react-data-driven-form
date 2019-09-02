import React from 'react';
import makeid from '../RandomStringGen';

const ConditionalFieldsListener = (Component) => {
    return class ConditionalFieldsListenerComponent extends React.Component {
        constructor(props) {
            super(props);
            this.onChangeEventKey = makeid();
            this.state = {
                show: false,
                value: null,
            }
        }

        componentWillMount() {
            this.props.event.on(`onChange:${this.onChangeEventKey}`, (data, template) => {
                const value = typeof data.value === 'object' ? data.value.value : data.value;
                this.UpdateStateValue(value, template);
                this.DisplayComponent(value, template)
            })
        }

        componentWillUnmount() {
            this.props.event.off(`onChange:${this.onChangeEventKey}`);
        }

        UpdateStateValue(value, template) {
            if (this.props.template.conditionalListener
                && template.fieldName === this.props.template.fieldName) {
                if (value) {
                    this.setState({
                        value,
                    })
                }
            }
        }

        DisplayComponent(value, template) {
            if (template.fieldName === this.props.template.conditionalListener) {
                this.setState({
                    show: value === this.props.template.show
                })
            }
        }

        render() {
            return (
                <React.Fragment>
                    {this.state.show && <div className="conditional-field"><Component value={this.state.value} {...this.props} /></div>}
                </React.Fragment>
            );
        }
    }
}

export default ConditionalFieldsListener;