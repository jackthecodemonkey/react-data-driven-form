import React, { Component } from 'react';

const FieldValidator = (Component) => {
    return class FieldValidatorComponent extends React.Component {
      constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.validation = this.props.template && this.props.template.validation;
        let initialValue = this.props.value;
        if (!initialValue && this.props.formData && this.props.template && this.props.template.fieldName) {
          initialValue = this.props.formData[this.props.template.fieldName];
        }
        this.state = {
          pristine: false,
          isDirty: false,
          isValid: true,
          value: initialValue,
        }
      }
  
      componentWillMount() {
        if (!this.validation.noValidateOnMount) this.updateState(this.state.value);
      }
  
      updateState(value, e = null, userHasInteracted = false) {
        this.setState({
          pristine: userHasInteracted,
          isDirty: this.props.value !== value,
          value,
          isValid: this.props.validator.validate(value),
        }, () => {
          if (this.props.onChange) this.props.onChange(this.state, e);
          if (this.props.event) this.props.event.emit('onChange', this.state, this.props.template)
        })
      }
  
      onChange(e) {
        let value = null;
        if (e && e.target) value = e.target.value;
        else {
          value = e;
          e = null;
        };
        this.updateState(value, e, true);
      }
  
      render() {
        const {
          template,
          formData,
          ...otherProps
        } = this.props;
        const {
          label,
        } = template;
        return (
          <Component
            template={template}
            label={label}
            value={this.state.value}
            onChange={this.onChange}
            {...otherProps}
            {...this.state} />
        );
      }
    }
  }

  export default FieldValidator;