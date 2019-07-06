import React from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import FieldWrapper from '../Common/FieldWrapper';

class RadioComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    renderOptions() {
        return this.props.options.map(option => {
            return (<label key={option.label}> <Radio disabled={this.props.readOnly} value={option.value} />{option.label}</label>)
        })
    }

    handleChange(value) {
        this.props.onChange(value);
        if (this.props.event) {
            const fieldName = this.props.fieldName || this.props.template.fieldName;
            this.props.event.emit('OnReferenceSelectorOptionChanged', fieldName, value);
        }
    }

    render() {
        let showInvalidty = true;
        if (!!this.props.template.validation.noValidateOnMount && !this.props.pristine) {
            showInvalidty = false;
        }

        return (
            <FieldWrapper shouldUseFragment={this.props.template && this.props.template.hasTheme}>
                <div>
                    {this.props.label}
                </div>
                <RadioGroup onChange={this.handleChange} selectedValue={this.props.value} name="fruit">
                    {this.renderOptions()}
                </RadioGroup>
            </FieldWrapper>
        );
    }
}

export default RadioComponent;
