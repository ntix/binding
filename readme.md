# @ntix/bind

A small dom binder

[github.com/ntix/binding](https://github.com/ntix/binding/)

copied from
[github.com/MrAntix/bind](https://github.com/MrAntix/bind/)

and converted to Deno
[deno.land](https://deno.land/)

## example

```html
<button bind [inner-text]="text" {click}="onClick"></button>

<script type="module">
  import { bind } from './bind.js';

  const context = {
    text: 'click me',
    onClick: e => {
      e.stopPropagation();

      context.text = 'thanks!';
      setTimeout(() => {
        context.text = 'click me again';
      }, 2000);
    }
  };

  bind(document, context);
</script>
```
