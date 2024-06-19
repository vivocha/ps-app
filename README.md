# Vivocha Interaction App

- [Features](#features)
  - [Hide Text Input](#hide-text-input)
  - [Reactive Buttons On Templates](#reactive-buttons-on-templates)

## Features

### Hide Text Input

This feature hides the text input if no free text is allowed. It’s enabled by default with quick replies and can be configured in templates.

```
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

Please, keep in mind that both the quick replies and the templates need at least a button with a valid payload to continue the active conversation or users have no more chance to interact.

### Reactive Buttons On Templates

This feature makes buttons on both generic and list templates reactive to trace the first clicked and to make them unclickable after the first user choice in the same group just like quick replies do.
