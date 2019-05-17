import React, { Component } from 'react';
import events from '../event';

const ReferenceSelectListener = (Component) => {
  return class ReferenceSelectListenerComponent extends React.Component {
    constructor(props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.event = this.props.event || events();
      this.state = {
        loadingOptions: this.props.loadingOptions || false,
        options: this.props.options || [],
      }
    }

    updateState(fieldName, { options, loadingOptions }) {
      if (fieldName === this.props.template.fieldName) {
        this.setState({
          options: (options && options.length) ? options : this.state.options,
          loadingOptions,
        })
      }
    }

    componentWillMount() {
      this.registerEvents();
    }

    registerEvents() {
      this.event.on('AsyncOptionsUpdated', this.updateState);
      this.event.on('OnOptionsChanged', this.updateState);
      this.event.on('OnReferenceSelectorOptionChanged', (fieldName, value) => {
        if (fieldName === this.props.template.refSelector) {
          const {
            fetchByRefAsync,
            url,
            fieldName,
          } = this.props.template;
          const api = url.replace('{value}',value.value);
          this.event.emit('OnFetchOptions', fetchByRefAsync, value, fieldName, api);
        }
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

export default ReferenceSelectListener;