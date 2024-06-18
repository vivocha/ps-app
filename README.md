# Vivocha Interaction App

- [Features](#features)
  - [Hide Text Input](#hide-text-input)

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
