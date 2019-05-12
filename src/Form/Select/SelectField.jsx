import React, { Component } from 'react';
import Select from 'react-select';

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.props.onChange(value);
        if (this.props.event) {
            const fieldName = this.props.fieldName || this.props.template.fieldName;
            this.props.event.emit('OnReferenceSelectorOptionChanged', fieldName, value);
        }
    }

    render() {
        let options = this.props.options;
        const getValueObject = value => options.find(option => option.value === value);
        const getValue = value => {
            let localValue;
            typeof value === 'object'
                ? localValue = value
                : localValue = getValueObject(value);
            return localValue;
        };
        return (
            <div>
                <span>{ !this.props.isValid && <span>Invalid field</span> }</span>
                <Select
                    isLoading={!this.props.readOnly && this.props.loadingOptions}
                    isDisabled={this.props.readOnly}
                    onChange={this.onChange}
                    value={getValue(this.props.value)}
                    options={options} />
            </div>
        );
    }
}

export default SelectField;