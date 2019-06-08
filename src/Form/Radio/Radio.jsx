import React from 'react';
import { RadioGroup, Radio } from 'react-radio-group';

class RadioComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    renderOptions() {
        return this.props.options.map(option => {
            return (<label> <Radio disabled={this.props.readOnly} value={option.value} />{option.label}</label>)
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
        return (
            <div className="form-field">
                <RadioGroup onChange={this.handleChange} selectedValue={this.props.value} name="fruit">
                    {this.renderOptions()}
                </RadioGroup>
            </div>
        );
    }
}

export default RadioComponent;
