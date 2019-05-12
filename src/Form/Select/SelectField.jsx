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
            this.props.event.emit('OnReferenceSelectorOptionChanged', this.props.template.fieldName, value);
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
        console.log(this.props.readOnly);
        console.log(this.props.isDisabled);
        return (
            <div>
                <Select
                    isLoading={!this.props.readOnly && this.props.loadingOptions}
                    isDisabled={this.props.readOnly || !this.props.isValid}
                    onChange={this.onChange}
                    value={getValue(this.props.value)}
                    options={options} />
            </div>
        );
    }
}

export default SelectField;