import React from 'react';

class Checkbox extends React.Component {
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
                <div>
                    <label key={option.label}>
                        <input
                            disabled={this.props.readOnly}
                            onClick={this.handleClick}
                            checked={(this.props.value || []).includes(option.value)}
                            type="checkbox"
                            name={option.value}
                            value={option.value} />
                        {option.label}
                    </label>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="form-field">
                {this.getOptions()}
                {!this.props.isValid && <div>Invalid field</div>}
            </div>
        );
    }
}

export default Checkbox;
