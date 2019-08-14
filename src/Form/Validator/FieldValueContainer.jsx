import React from 'react';
import _ from 'lodash';

const FieldValueContainer = (Component) => {
  return class FieldValueContainerComponent extends React.Component {
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
      this.updateState(this.state.value);
    }

    initializeValidity(initialValue) {
      return !this.validation.noValidateOnMount
        ? this.props.validator.validate(initialValue)
        : true;
    }

    setInitialEmptyValueByFieldType() {
      switch (this.props.template.fieldType) {
        case 'checkbox':
          return [];
        default:
          return '';
      }
    }

    checkIfDirty(value = null, userHasInteracted = false) {
      let isDirty = false;
      /* First interaction by user */
      if (!this.state.pristine && userHasInteracted) {
        this.initialValue = this.state.value || this.setInitialEmptyValueByFieldType();
      }

      if (!this.initialValue && value) {
        isDirty = true;
      }

      /* diff check */
      /* Array type */
      if (Array.isArray(this.initialValue) && Array.isArray(value)) {
        isDirty = _.xor(this.initialValue, value).length !== 0
      } else /* string type */ {
        isDirty = this.initialValue !== this.props.value && this.initialValue !== value;
      }

      return isDirty;
    }

    updateState(value, e = null, userHasInteracted = false) {
      this.setState({
        pristine: this.state.pristine
          ? true
          : userHasInteracted,
        isDirty: this.checkIfDirty(value, userHasInteracted),
        value,
        isValid: this.props.validator.validate(value),
      }, () => {
        if (this.props.onChange) this.props.onChange(this.state, e);
        if (this.props.event) this.props.event.emit('onChange', this.state, this.props.template)
      })
    }

    onChange(e, triggeredByInteraction = true) {
      let value = null;
      if (e && e.target) {
        value = e.target.value;
      } else {
        value = e;
        e = null;
      };
      this.updateState(value, e, triggeredByInteraction);
    }

    forceResetValue(newValue = null) {
      if (!this.state.pristine) return;
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
        readOnly,
        ...otherProps
      } = this.props;

      const {
        label,
      } = template;

      const localReadOnly = typeof template.readOnly === 'boolean'
        && template.readOnly
        ? template.readOnly
        : readOnly;

      return (
        <Component
          template={template}
          label={label}
          readOnly={localReadOnly}
          value={this.state.value}
          onChange={this.onChange}
          forceResetValue={this.forceResetValue}
          {...otherProps}
          {...this.state} />
      );
    }
  }
}

export default FieldValueContainer;