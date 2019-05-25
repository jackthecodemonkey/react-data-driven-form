import React from 'react';
import SelectField from './Select';
import { OptionsChangeListener, FetchOptions } from './Common';
import TextField from './TextField';
import Radio from './Radio';
import Checkbox from './Checkbox';
import {
  FieldValidator,
  ReferenceFieldsValidator,
  ValidatorSelector,
  ReferenceValidator,
} from './Validator';
import events from './event';

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
    this.event.on('onChange', (state, { fieldName }) => {
      // console.log(state);
      // console.log(fieldName);
    })
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
        referenceValidators={ReferenceValidator(template.referenceFields, this.props.templates)}
        validator={ValidatorSelector(template)}
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