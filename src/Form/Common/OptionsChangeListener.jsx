import React from 'react';
import events from '../event';
import makeid from '../RandomStringGen';

export const getUrl = (url, value) => {
  if (typeof url !== 'function' && typeof url !== 'string') {
    throw new Error('url shouuld be either a function or a string');
  }
  if (typeof url === 'string' && url.indexOf('{value}') === -1) {
    throw new Error('url should contain a {value}');
  }
  return typeof url === 'function'
    ? url(value)
    : url.replace('{value}', value)
}

export const IsFieldInReferences = (field, fieldReferences) => {
  if (!fieldReferences) return false;
  if (typeof fieldReferences === 'object' && !Array.isArray(fieldReferences)) {
    throw new Error('fieldReferences should be either a string or an array');
  }
  if (typeof fieldReferences !== 'object' && typeof fieldReferences !== 'string') {
    throw new Error('fieldReferences should be either a string or an array');
  }

  return typeof fieldReferences === 'object'
    ? fieldReferences.includes(field)
    : field === fieldReferences;
}

const OptionsChangeListener = (Component) => {
  return class OptionsChangeListenerComponent extends React.Component {
    constructor(props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.event = this.props.event || events();
      this.AsyncOptionsUpdatedEventKey = makeid();
      this.OptionsUpdatedEventKey = makeid();
      this.onChangeKey = makeid();
      this.OnReferenceSelectorOptionChangedEventKey = makeid();
      this.state = {
        loadingOptions: this.props.loadingOptions || false,
        options: this.props.options || [],
      }
    }

    updateState(fieldName, { options, loadingOptions }) {
      if (fieldName === this.props.template.fieldName) {
        this.setState({
          options: (options && options.length)
            ? options
            : this.state.options,
          loadingOptions,
        })
      }
    }

    componentWillMount() {
      this.registerEvents();
    }

    componentWillUnmount(){
      this.event.off(`AsyncOptionsUpdated:${this.AsyncOptionsUpdatedEventKey}`);
      this.event.off(`OptionsUpdated:${this.OptionsUpdatedEventKey}`);
      this.event.off(`OnReferenceSelectorOptionChanged:${this.OnReferenceSelectorOptionChangedEventKey}`);
      this.event.off(`onChange:${this.onChangeKey}`);
    }

    triggerOptionFetch(value) {
      const {
        fetchByRefAsync,
        url,
        fieldName,
      } = this.props.template;
      this.event.emit(
        'OnFetchOptions',
        fetchByRefAsync,
        fieldName,
        getUrl(url, value || (value && value.value))
      );
    }

    registerEvents() {
      this.event.on(`AsyncOptionsUpdated:${this.AsyncOptionsUpdatedEventKey}`, this.updateState);
      this.event.on(`OptionsUpdated:${this.OptionsUpdatedEventKey}`, this.updateState);
      this.event.on(`OnReferenceSelectorOptionChanged:${this.OnReferenceSelectorOptionChangedEventKey}`, (fieldName, value) => {
        if (IsFieldInReferences(fieldName, this.props.template.refSelector)) {
          this.triggerOptionFetch(value);
          this.event.emit('ResetCurrentSelection', this.props.template.fieldName);
        };
      });
      this.event.on(`onChange:${this.onChangeKey}`, ({ isValid, value }, template) => {
        if (this.props.template.fetchByRefAsync && isValid && IsFieldInReferences(template.fieldName, this.props.template.refSelector)) {
          this.triggerOptionFetch(value);
        };
      })
    }

    render() {
      const { options, loadingOptions, ...otherProps } = this.props;
      return (
        <Component {...otherProps} {...this.state} event={this.event} />
      )
    }
  }
}

export default OptionsChangeListener;