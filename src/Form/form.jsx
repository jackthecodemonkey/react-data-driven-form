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

import {
  ConditionalFieldsListener,
  ConditionalFieldsNotifier
} from './ConditionalFields';

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

  componentWillUnmount() {
    this.event.clear();
  }

  getFieldComponent(Field, template) {
    return <Field
      event={this.event}
      referenceValidators={ReferenceValidator(template.referenceFields, this.props.templates)}
      validator={ValidatorSelector(template)}
      template={template}
      formData={this.props.formData} />
  }

  buildComponent(template) {
    let Field = null;
    switch (template.fieldType) {
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
        break;
    }

    if (template.conditionalListener) Field = ConditionalFieldsListener(Field);

    return template.conditional
      ? Field
      : this.getFieldComponent(Field, template);
  }

  initializeFields() {
    this.fields = this.props.templates.map(template => {
      let Field = this.buildComponent(template);
      if (template.conditional) {
        const conditionalFields = template.fields.map(field => this.buildComponent(field));
        Field = this.getFieldComponent(ConditionalFieldsNotifier(Field, conditionalFields), template);
      }
      return Field;
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