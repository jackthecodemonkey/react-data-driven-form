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
            options: options ? options : this.state.options,
            loadingOptions,
          })
        }
      }
  
      componentWillMount() {
        this.event.on('AsyncOptionsUpdated', this.updateState);
        this.event.on('OnOptionsChanged', this.updateState);
        this.event.on('OnReferenceSelectorOptionChanged', (fieldName, value) => {
          const selectNameForListen = this.props.template.refSelector;
          if (fieldName === selectNameForListen) {
            const { fetchByRefAsync } = this.props.template;
            this.event.emit('OnFetchOptions', fetchByRefAsync, value, this.props.template.fieldName);
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