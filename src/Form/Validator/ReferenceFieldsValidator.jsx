import React from 'react';
import events from '../event';
import makeid from '../RandomStringGen';

const ReferenceFieldsValidator = (Component) => {
  return class ReferenceFieldsValidatorComponent extends React.Component {
    constructor(props) {
      super(props);
      this.onChangeEventKey = makeid();
      this.event = this.props.event || events();
      this.state = {
        readOnly: this.props.readOnly !== undefined ? this.props.readOnly : false,
        validFields: this.getValidFieldsWithInitialFormData(),
      }
    }

    validateReferenceFields(formData) {
      if (Array.isArray(this.props.referenceValidators) && this.props.referenceValidators.length) {
        let areAllReferenceFieldsValid = true;
        this.props.referenceValidators.forEach(referenceField => {
          const {
            fieldName,
            validator
          } = referenceField;
          Object.keys(formData).forEach((localFieldName) => {
            if (localFieldName === fieldName) {
              if (areAllReferenceFieldsValid) areAllReferenceFieldsValid = validator.validate(formData[localFieldName]);
            }
          })
        })
        return areAllReferenceFieldsValid;
      }
    }

    getValidFieldsWithInitialFormData() {
      return this.props.template.referenceFields.reduce((acc, next) => {
        acc[next] = this.props.formData[next] !== undefined ? this.props.formData[next] : null;
        return acc;
      }, {})
    }

    componentWillMount() {
      let areAllReferenceFieldsValid = this.validateReferenceFields(this.state.validFields);
      if (typeof areAllReferenceFieldsValid === 'boolean') this.setState({ readOnly: !areAllReferenceFieldsValid });
      this.event.on(`onChange:${this.onChangeEventKey}`, (state, template, skipTriggeringEvent = false) => {
        if (skipTriggeringEvent) return;
        const { fieldName } = template;
        const { value } = state;
        const validFields = { ...this.state.validFields };
        if ([fieldName] in validFields) validFields[fieldName] = value;
        let areAllReferenceFieldsValid = this.validateReferenceFields(validFields);
        if (areAllReferenceFieldsValid === false && this.props.template.clearIfReferenceInvalid) this.event.emit('ResetSelectedValue', this.props.template.fieldName);
        this.setState({
          validFields,
          readOnly: typeof areAllReferenceFieldsValid === 'boolean'
            ? !areAllReferenceFieldsValid
            : this.state.areAllReferenceFieldsValid
        });
      })
    }

    componentWillUnmount() {
      this.event.off(`onChange:${this.onChangeEventKey}`);
    }

    render() {
      return (
        <Component {...this.props} readOnly={this.state.readOnly} />
      );
    }
  }
}

export default ReferenceFieldsValidator;