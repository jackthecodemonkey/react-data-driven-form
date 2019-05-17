import React, { Component } from 'react';
import events from '../event';

const FetchOptions = (Component) => {
    return class FetchOptionsComponent extends React.Component {
      constructor(props) {
        super(props);
        this.event = this.props.event || events();
        this.fetchOptions = this.fetchOptions.bind(this);
        this.state = {
          loadingOptions: false,
          options: [],
        }
      }
  
      componentWillMount() {
        this.event.on('OnFetchOptions', (async, value, eventTriggerFieldName, url) => {
          this.fetchOptions(async, value, eventTriggerFieldName, url);
        });
        const { template } = this.props;
        const { async = false, url = null } = template;
        this.fetchOptions(async, null, null, url);
      }
  
      fetchOptions(async, value, eventTriggerFieldName, url = null) {
        if (async && url) {
          this.setState({
            loadingOptions: true,
          }, () => {
            this.event.emit('OnOptionsChanged', eventTriggerFieldName, { options: null, loadingOptions: true });
          })
          /* simulate getting options async */
          /* call api with url given */
          setTimeout(() => {
            this.setState({
              options: [
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'strawberry2', label: 'Strawberry2' },
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry3', label: 'Strawberry3' },
                { value: 'vanilla', label: 'Vanilla' },
              ],
              loadingOptions: false,
            }, () => {
              const eventName = eventTriggerFieldName ? 'OnOptionsChanged' : 'AsyncOptionsUpdated';
              const fieldName = eventTriggerFieldName ? eventTriggerFieldName : this.props.template.fieldName;
              this.event.emit(eventName, fieldName, { ...this.state });
            })
          }, 2000)
        } else {
          this.setState({
            options: this.props.template.options
          }, () => {
            this.event.emit('OnOptionsChanged', eventTriggerFieldName, { ...this.state });
          })
        }
      }
  
      render() {
        return (
          <Component event={this.event} {...this.state} {...this.props} />
        )
      }
    }
  }

  export default FetchOptions;