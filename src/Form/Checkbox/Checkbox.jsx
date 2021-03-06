import React from 'react';
import FieldWrapper from '../Common/FieldWrapper';

class Checkbox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let values = this.props.value && this.props.value.length ? [...this.props.value] : [];
        let selectedValue = e.target.value;
        if (values.includes(selectedValue)) {
            values.splice(values.indexOf(selectedValue), 1)
        } else {
            values.push(selectedValue);
        }
        this.props.onChange(values);
        if (this.props.event) {
            const fieldName = this.props.fieldName || this.props.template.fieldName;
            this.props.event.emit('OnReferenceSelectorOptionChanged', fieldName, values);
        }
    }

    getOptions() {
        return this.props.options.map(option => {
            return (
                <div className="checkbox-field" key={option.value}>
                    <label>
                        {option.label}
                    </label>
                    <input
                        disabled={this.props.readOnly}
                        onChange={this.handleClick}
                        checked={(this.props.value || []).includes(option.value)}
                        type="checkbox"
                        name={option.value}
                        value={option.value} />
                </div>
            );
        })
    }

    render() {
        let showInvalidty = true;
        if (!!this.props.template.validation.noValidateOnMount && !this.props.pristine) {
            showInvalidty = false;
        }
        const labelClass = showInvalidty && !this.props.isValid ? 'invalid' : '';
        return (
            <FieldWrapper shouldUseFragment={this.props.template && this.props.template.hasTheme}>
                <label className={labelClass}>
                    {this.props.label}
                </label>
                <div className="checkbox-group-field">
                    {this.getOptions()}
                </div>
            </FieldWrapper>
        )
    }
}

export default Checkbox;
