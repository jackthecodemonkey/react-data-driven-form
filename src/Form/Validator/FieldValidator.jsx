import React from 'react';

const FieldValidator = (Component) => {
  return class FieldValidatorComponent extends React.Component {
    constructor(props) {
      super(props);
      this.onChange = this.onChange.bind(this);
      this.forceResetValue = this.forceResetValue.bind(this);
      this.validation = this.props.template && this.props.template.validation;
      this.initialValue = this.props.value;
      if (!this.initialValue && this.props.formData && this.props.template && this.props.template.fieldName) {
        this.initialValue = this.props.formData[this.props.template.fieldName];
      }
      this.state = {
        pristine: false,
        isDirty: false,
        isValid: this.initializeValidity(this.initialValue),
        value: this.initialValue,
      }
    }

    componentWillMount() {
      if (!this.validation.noValidateOnMount) this.updateState(this.state.value);
    }

    initializeValidity(initialValue) {
      return !this.validation.noValidateOnMount ? this.props.validator.validate(initialValue) : true;
    }

    updateState(value, e = null, userHasInteracted = false) {
      let isDirty = false;
      if (!this.state.pristine && userHasInteracted) {
        this.initialValue = this.state.value;
      }

      if (!this.initialValue && value) {
        isDirty = true;
      } else {
        isDirty = this.initialValue !== this.props.value && this.initialValue !== value;
      }

      this.setState({
        pristine: userHasInteracted,
        isDirty,
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

    forceResetValue(newValue = null) {
      this.setState({
        value: newValue,
      }, () => {
        if (this.props.event) this.props.event.emit('onChange', this.state, this.props.template, true);
      })
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
          forceResetValue={this.forceResetValue}
          {...otherProps}
          {...this.state} />
      );
    }
  }
}

export default FieldValidator;