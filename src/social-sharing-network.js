import Networks from './networks.json';
console.log("SOCIAL SHARING NETWORK...--;;");

export default {
  functional: true,

  props: {
    network: {
      type: String,
      default: ''
    }
  },

  render (createElement, context) {
    const network = Networks[context.props.network];
    var willrender = context.parent.willRender;
    if (!!willrender) {
      console.log("SOCIAL SHARING NETWORK RENDER...--;;");
      return createElement(context.parent.networkTag, {
        staticClass: context.data.staticClass || null,
        staticStyle: context.data.staticStyle || null,
        class: context.data.class || null,
        style: context.data.style || null,
        key: context.data.key || null,
        attrs: {
          id: context.data.attrs.id || null,
          'data-link': network.type === 'popup'
            ? '#share-' + context.props.network
            : context.parent.createSharingUrl(context.props.network),
          'data-action': network.type === 'popup' ? null : network.action
        },
        on: {
          click: network.type === 'popup' ? () => {
            context.parent.share(context.props.network);
          } : () => {
            context.parent.touch(context.props.network);
          }
        }
      }, context.children);
    }
  }
};
