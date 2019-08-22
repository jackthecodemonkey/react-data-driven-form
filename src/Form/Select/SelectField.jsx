import React from 'react';
import Select from 'react-select';
import makeid from '../RandomStringGen';
import FieldWrapper from '../Common/FieldWrapper';

const defaultStyles = {
    control: provided => {
        return {
            ...provided,
            boxShadow: 'none',
        }
    },
}

const getValueObject = (value, options) => options.find(option => option.value === value);

const getValue = (value, options) => {
    return typeof value === 'object'
        ? value
        : getValueObject(value, options);
};

class SelectField extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ResetSelectedValueEventKey = makeid();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.props.event.on(`ResetCurrentSelection:${this.ResetSelectedValueEventKey}`, fieldName => {
            if (fieldName === this.props.template.fieldName) {
                this.onChange(null, null, false);
            }
        })
    }

    componentWillUnmount() {
        this.props.event.off(`ResetCurrentSelection:${this.ResetSelectedValueEventKey}`);
    }

    onChange(value, actions, triggeredByInteraction = true) {
        this.props.onChange && this.props.onChange(value && value.value, triggeredByInteraction);
        if (this.props.event) {
            const fieldName = this.props.fieldName || this.props.template.fieldName;
            this.props.event.emit('OnReferenceSelectorOptionChanged', fieldName, value && value.value);
        }
    }

    render() {
        let defaultLabelClass = 'label';
        let showInvalidty = true;
        if (!!this.props.template.validation.noValidateOnMount && !this.props.pristine) {
            showInvalidty = false;
        }

        if (!this.props.isValid && showInvalidty) {
            defaultLabelClass += ' invalid'
        }

        const styles = {
            ...defaultStyles,
            ...this.props.style,
        }

        return (
            <FieldWrapper shouldUseFragment={this.props.template && this.props.template.hasTheme}>
                <label className={defaultLabelClass}>{this.props.label}</label>
                <Select
                    className='select-field'
                    classNamePrefix='select-field'
                    styles={styles}
                    isLoading={!this.props.readOnly && this.props.loadingOptions}
                    isDisabled={this.props.readOnly}
                    onChange={this.onChange}
                    value={getValue(this.props.value, this.props.options)}
                    options={this.props.options} />
            </FieldWrapper>
        );
    }
}

export default SelectField;