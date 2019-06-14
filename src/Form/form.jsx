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
  ResetValueNotifier,
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
      key={template.fieldName}
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
        Field = ReferenceFieldsValidator(FieldValidator(ResetValueNotifier(TextField)));
        break;
      case 'select':
        if (this.props.overrideOptions && this.props.overrideOptions[template.fieldName]) {
          template.url = this.props.overrideOptions[template.fieldName];
        }
        Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValidator(ResetValueNotifier(SelectField)))));
        break;
      case 'radio':
        Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValidator(ResetValueNotifier(Radio)))));
        break;
      case 'checkbox':
        Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValidator(ResetValueNotifier(Checkbox)))));
        break;
    }

    if (template.conditionalListener) Field = ConditionalFieldsListener(Field);

    return template.conditional
      ? Field
      : this.getFieldComponent(Field, template);
  }

  initializeFields() {
    const hasTheme = !!this.props.theme;
    this.fieldsWithLayout = {};
    this.fields = this.props.templates.map(template => {
      if(hasTheme) template.hasTheme = true;
      let Field = this.buildComponent(template);
      if (template.conditional) {
        const conditionalFields = template.fields.map(field => this.buildComponent(field));
        Field = this.getFieldComponent(ConditionalFieldsNotifier(Field, conditionalFields), template);
      }
      this.fieldsWithLayout[template.fieldName] = Field;
      return Field;
    })
    if(hasTheme){
      this.fields = this.props.theme(this.fieldsWithLayout)
    }
  }

  render() {
    return (
      <div className="form-container">
        {
          this.fields
        }
      </div>
    );
  }
}

export default Form;