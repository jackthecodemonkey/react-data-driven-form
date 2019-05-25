import React from 'react';
import SelectField, { SelectValidator } from './Select';
import { OptionsChangeListener, FetchOptions } from './Common';
import TextField, { StringValidator } from './TextField';
import Radio, { RadioValidator } from './Radio';
import Checkbox, { CheckboxValidator } from './Checkbox';
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
    case 'radio':
      ValidationFactory = RadioValidator;
      break;
    case 'checkbox':
      ValidationFactory = CheckboxValidator;
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
          Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValidator(SelectField))));
          break;
        case 'radio':
          Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValidator(Radio))));
          break;
        case 'checkbox':
          Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValidator(Checkbox))));
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