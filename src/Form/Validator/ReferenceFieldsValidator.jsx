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
      if (this.props.referenceValidators) {
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
        this.setState({ readOnly: !areAllReferenceFieldsValid })
      }
    }

    getValidFieldsWithInitialFormData() {
      return this.props.template.referenceFields.reduce((acc, next) => {
        acc[next] = this.props.formData[next] !== undefined ? this.props.formData[next] : null;
        return acc;
      }, {})
    }

    componentWillMount() {
      this.validateReferenceFields(this.state.validFields);
      this.event.on(`onChange:${this.onChangeEventKey}`, (state, template) => {
        const { fieldName } = template;
        const { value } = state;
        const validFields = { ...this.state.validFields };
        if ([fieldName] in validFields) validFields[fieldName] = value;
        this.setState({ validFields }, () => this.validateReferenceFields(validFields));
      })
    }

    componentWillUnmount(){
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