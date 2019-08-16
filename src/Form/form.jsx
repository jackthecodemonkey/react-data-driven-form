import React from 'react';
import SelectField from './Select';
import { OptionsChangeListener, FetchOptions } from './Common';
import TextField, { TextArea } from './TextField';
import Radio from './Radio';
import Checkbox from './Checkbox';
import {
  FieldValueContainer,
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
import { CreateElementsFactory } from './LayoutGen';
import Theme from './LayoutGen/models/Theme';
import FormDataHandler from './FormDataHandler';

import '../Form/styles/defaultStyle.scss';
import '../Form/styles/customStyle.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fields = null;
    this.formData = new FormDataHandler(this.props.templates);
    this.event = events();
    this.applyTheme = CreateElementsFactory(this.props.theme);
    this.initialFormData = {
      ...this.formData.DefaultValues,
      ...this.props.formData,
    }
  }

  componentWillMount() {
    this.event.on('SendData', (state, template, invalidContext) => {
      this.mergeFormValues(state, template, invalidContext);
    })
    this.initializeFields()
  }

  componentWillUnmount() {
    this.event.clear();
  }

  mergeFormValues(state, { fieldName }, invalidContext) {
    this.formData.UpdateFieldData(fieldName, state, invalidContext)
    if (this.formData.MergedData !== null) {
      this.props.onChange && this.props.onChange(this.formData.MergedData);
    }
  }

  getFieldComponent(Field, template) {
    return <Field
      key={template.fieldName}
      event={this.event}
      referenceValidators={ReferenceValidator(template.referenceFields, this.props.templates)}
      validator={ValidatorSelector(template)}
      template={template}
      formData={this.initialFormData} />
  }

  buildComponent(template) {
    let Field = null;
    switch (template.fieldType) {
      case 'text':
        Field = ReferenceFieldsValidator(FieldValueContainer(ResetValueNotifier(TextField)));
        break;
      case 'textarea':
        Field = ReferenceFieldsValidator(FieldValueContainer(ResetValueNotifier(TextArea)));
        break;
      case 'select':
        if (this.props.overrideOptions && this.props.overrideOptions[template.fieldName]) {
          template.url = this.props.overrideOptions[template.fieldName];
        }
        Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValueContainer(ResetValueNotifier(SelectField)))));
        break;
      case 'radio':
        Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValueContainer(ResetValueNotifier(Radio)))));
        break;
      case 'checkbox':
        Field = ReferenceFieldsValidator(FetchOptions(OptionsChangeListener(FieldValueContainer(ResetValueNotifier(Checkbox)))));
        break;
    }

    if (template.conditionalListener) Field = ConditionalFieldsListener(Field);

    return template.conditional
      ? Field
      : this.getFieldComponent(Field, template);
  }

  initializeFields() {
    const theme = new Theme(this.props.theme);
    const hasTheme = !!this.props.theme;
    this.fields = this.props.templates.map(template => {
      let fieldTheme = theme.FindField(template.fieldName);
      if (fieldTheme) template.hasTheme = true;
      let Field = this.buildComponent(template);
      /* If field template includes conditional show/hide, append those fields with the field */
      if (template.conditional) Field = this.applyConditionalField(template, theme, Field);
      theme.AddComponent(template.fieldName, Field);
      return Field;
    })
    if (hasTheme) this.fields = this.applyTheme(theme.components);
  }

  applyConditionalField(template, theme, Field) {
    const fields = template.fields.map(field => field.fieldName);
    const everyConditionalFieldsInTheme = theme.FindFields(fields);
    const conditionalFields = template.fields.map(field => {
      if (!!this.props.theme) field.hasTheme = true;
      const conditionalField = this.buildComponent(field);
      /* If theme contains every conditional fields, then we apply the theme, otherwise, we ignore the theme */
      /* eg) if the field shows other fields A,B conditionally and the theme includes only a theme for A, then we don't apply theme for both */
      if (everyConditionalFieldsInTheme) theme.AddComponent(field.fieldName, conditionalField);
      return conditionalField
    });
    return this.getFieldComponent(ConditionalFieldsNotifier(Field, conditionalFields, everyConditionalFieldsInTheme), template);
  }

  render() {
    return (
      <div className="form-container">
        <div>
          {
            this.fields
          }
        </div>
        <div>
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export default Form;