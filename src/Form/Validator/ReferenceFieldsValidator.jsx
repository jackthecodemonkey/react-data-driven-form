import React, { Component } from 'react';
import events from '../event';

const ReferenceFieldsValidator = (Component) => {
    return class ReferenceFieldsValidatorComponent extends React.Component {
      constructor(props) {
        super(props);
        this.event = this.props.event || events();
        this.state = {
          readOnly: this.props.readOnly !== undefined ? this.props.readOnly : false,
          validFields: this.props.template.referenceFields.reduce((acc, next) => { acc[next] = null; return acc; }, {}),
        }
      }
  
      validateReferenceFields(formData = this.state.validFields) {
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
  
      componentWillMount() {
        this.validateReferenceFields(this.props.formData);
        this.event.on('onChange', (state, template) => {
          const { fieldName } = template;
          const { value } = state;
          const validFields = { ...this.state.validFields };
          validFields[fieldName] = value;
          this.setState({ validFields }, this.validateReferenceFields);
        })
      }
  
      render() {
        return (
          <Component {...this.props} readOnly={this.state.readOnly} />
        );
      }
    }
  }

  export default ReferenceFieldsValidator;