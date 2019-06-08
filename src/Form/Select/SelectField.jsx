import React from 'react';
import Select from 'react-select';
import makeid from '../RandomStringGen';

const getValueObject = (value, options) => options.find(option => option.value === value);

const getValue = (value, options) => {
    return typeof value === 'object'
        ? value
        : getValueObject(value, options);
};

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        this.ResetSelectedValueEventKey = makeid();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.props.event.on(`ResetCurrentSelection:${this.ResetSelectedValueEventKey}`, fieldName => {
            if (fieldName === this.props.template.fieldName) {
                this.onChange(null);
            }
        })
    }

    componentWillUnmount() {
        this.props.event.off(`ResetCurrentSelection:${this.ResetSelectedValueEventKey}`);
    }

    onChange(value) {
        this.props.onChange && this.props.onChange(value);
        if (this.props.event) {
            const fieldName = this.props.fieldName || this.props.template.fieldName;
            this.props.event.emit('OnReferenceSelectorOptionChanged', fieldName, value);
        }
    }

    render() {
        return (
            <div className="form-field">
                <span>{!this.props.isValid && <span>Invalid field</span>}</span>
                <Select
                    isLoading={!this.props.readOnly && this.props.loadingOptions}
                    isDisabled={this.props.readOnly}
                    onChange={this.onChange}
                    value={getValue(this.props.value, this.props.options)}
                    options={this.props.options} />
            </div>
        );
    }
}

export default SelectField;