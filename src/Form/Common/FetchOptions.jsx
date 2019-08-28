import React from 'react';
import events from '../event';
import makeid from '../RandomStringGen';

const FetchOptions = (Component) => {
  return class FetchOptionsComponent extends React.Component {
    constructor(props) {
      super(props);
      this.event = this.props.event || events();
      this.fetchOptions = this.fetchOptions.bind(this);
      this.OnFetchOptionsEventKey = makeid();
      this.state = {
        loadingOptions: false,
        options: [],
      }
    }

    componentWillMount() {
      this.event.on(`OnFetchOptions:${this.OnFetchOptionsEventKey}`, this.fetchOptions);
      const { async = false, url = null } = this.props.template;
      this.fetchOptions(async, null, url);
    }

    componentWillUnmount(){
      this.event.off(`OnFetchOptions:${this.OnFetchOptionsEventKey}`);
    }

    triggerOptionsChangeEvent(eventTriggerFieldName) {
      const eventName = eventTriggerFieldName
        ? 'OptionsUpdated'
        : 'AsyncOptionsUpdated';

      const fieldName = eventTriggerFieldName
        ? eventTriggerFieldName
        : this.props.template.fieldName;

      this.event.emit(eventName, fieldName, { ...this.state });
    }

    fetchOptionsAsync(url, eventTriggerFieldName) {
      console.log(url);
      /* simulate getting options async */
      /* call api with url given && update options */
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
          this.triggerOptionsChangeEvent(eventTriggerFieldName);
        })
      }, 2000)
    }

    fetchOptions(async, eventTriggerFieldName, url = null) {
      if (async && url) {
        this.setState({
          loadingOptions: true,
        }, () => {
          this.event.emit('OptionsUpdated', eventTriggerFieldName, { options: null, loadingOptions: true });
        })
        this.fetchOptionsAsync(url, eventTriggerFieldName);
      } else {
        this.setState({
          options: this.props.template.options
        }, () => {
          this.event.emit('OptionsUpdated', eventTriggerFieldName, { ...this.state });
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