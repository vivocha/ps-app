# Vivocha Interaction App

- [Features](#features)
  - [Hide Text Input](#hide-text-input)
  - [Reactive Buttons On Templates](#reactive-buttons-on-templates)
  - [Adobe After Effects Support](#adobe-after-effecs-support)
  - [Custom Actions](#custom-actions)
    - [Set Agent](#set-agent)

## Features

### Hide Text Input

This feature hides the text input if no free text is allowed. It’s enabled by default with quick replies and can be configured in templates.

```javascript
{
  code: 'message',
  type: 'text',
  body: '',
  template: {
    type: 'generic',
    hide_text_input: 'true',
    [...]
  }
}
```

Please, keep in mind that both the quick replies and the templates need at least a button with a valid payload to continue the active conversation or users have no more chances to interact.

### Reactive Buttons On Templates

This feature makes buttons on both generic and list templates reactive to run the action of the first clicked and to make them unclickable after the first user choice in the same group pretty like the way quick replies do.

### Adobe After Effects Support

This feature has been developed for lastminute.com and adds support for Adobe After Effects animation exported in JSON via Lottie: a library created and maintained by Airbnb.

Please, compile the [lastminute](https://github.com/vivocha/ps-app/tree/lastminute) branch to get it working as expected by the customer. You’ll need to manually add:

```javascript
<script src="lottie-web-es2015.js" type="module"></script><script src="lottie-web-es5.js" nomodule defer></script>
```

inline in `./dist/assets/index.html` and:

```javascript
</script><script src="lottie-web.js" defer></script>
```

inline in `./dist/assets/ie/index.html` before pushing to Vivocha.

### Custom Actions

#### Set Agent

This custom action has been developed for **Smile.CX Gaia** to let [Rocket.Chat](https://www.rocket.chat/) change the agent details via Vivocha Bot SDK.

The action itself consist of two sides:

1. A message of type `action` from a bot built with the Vivocha Bot SDK.

You should send a message like the following.

```javascript
{
  code: 'message',
  type: 'action',
  action_code: 'setAgent',
  args: [
    {
      avatar: '/path/to/fmoretti/avatar.png',
      nickname: 'Federico Moretti',
      status: 'Online'
    }
  ]
} as ActionMessage
```

All of the keys are of type `string` and the `avatar` key must be a valid image URL.

2. A `postMessage` from a `contact-established` event handler in the Vivocha Campaign Builder

You should set an event like the following.

```javascript
try {
  vivocha.contact.on('action', async (action_code, args) => {
    if (action_code === 'setAgent') {
      const message = {
        avatar: args[0]['avatar'],
        nickname: args[0]['nickname'],
        status: args[0]['status']
      };
      const target = document.querySelector('#vvc-interaction-app').contentWindow;
      target.postMessage(message, '*');
    }
  });
}
catch (err) {
  console.error(err);
}
```

Both are mandatory.
