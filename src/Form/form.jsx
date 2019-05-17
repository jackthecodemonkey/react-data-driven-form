import React, { Component } from 'react';
import SelectField, { FetchOptions, ReferenceSelectListener, SelectValidator } from './Select';
import TextField, { StringValidator } from './TextField';
import { FieldValidator, ReferenceFieldsValidator } from './Validator';
import events from './event';

const GetValidator = ({ fieldType, validation }) => {
  let ValidationFactory = null;
  switch (fieldType) {
    case 'text':
    case 'textArea':
      ValidationFactory = StringValidator;
      break;
    case 'select':
      ValidationFactory = SelectValidator;
      break;
    default:
      ValidationFactory = StringValidator;
  }
  return new ValidationFactory(validation);
}

const GetReferenceValidator = (referenceFields, templates) => {
  if (!referenceFields.length) return null;
  return referenceFields.map((referenceField => {
    const matchedField = templates.find(template => template.fieldName === referenceField);
    return {
      fieldName: referenceField,
      validator: GetValidator({ fieldType: matchedField.fieldType, validation: matchedField.validation }),
    }
  }))
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fields = null;
    this.event = events();
    this.state = {
      formData: this.props.formData,
    }
  }

  componentWillMount() {
    this.initializeFields()
  }

  initializeFields() {
    this.fields = this.props.templates.map(template => {
      const fieldType = template.fieldType;
      let Field = null;
      switch (fieldType) {
        case 'text':
        case 'textArea':
          Field = ReferenceFieldsValidator(FieldValidator(TextField));
          break;
        case 'select':
          if (this.props.overrideOptions && this.props.overrideOptions[template.fieldName]) {
            template.url = this.props.overrideOptions[template.fieldName];
          }
          Field = ReferenceFieldsValidator(FetchOptions(ReferenceSelectListener(FieldValidator(SelectField))));
          break;
      }
      return <Field
        event={this.event}
        referenceValidators={GetReferenceValidator(template.referenceFields, this.props.templates)}
        validator={GetValidator(template)}
        template={template}
        formData={this.props.formData} />
    })
  }

  render() {
    return (
      <div>
        {
          this.fields
        }
      </div>
    );
  }
}

export default Form;