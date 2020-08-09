# @ntix/binding

A small dom binder

[github.com/ntix/binding](https://github.com/ntix/binding/)

copied from
[github.com/MrAntix/bind](https://github.com/MrAntix/bind/)

and converted to Deno
[deno.land](https://deno.land/)

## example

<pre style="display:flex">
  <button bind [inner-text]="data.text" {click}="onClick" style="flex:1;padding:10px"></button>
</pre>

The button **innerText** property and **click** event are bound to a context as shown below, click the button to see it in action

<script type="module">
  import { bind } from './mod.js'

  const context = {
    data: { text: 'click me' },
    onClick: e => {
      e.stopPropagation();

      context.data.text = 'thanks!';
      setTimeout(() => {
        context.data.text = 'click me again';
      }, 2000);
    }
  }

  bind(document, context);
</script>

```html
<button bind [inner-text]="data.text" {click}="onClick"></button>

<script type="module">
  import { bind } from './bind.js';

  const context = {
    text: 'click me',
    onClick: e => {
      e.stopPropagation();

      context.data.text = 'thanks!';
      setTimeout(() => {
        context.data.text = 'click me again';
      }, 2000);
    }
  };

  bind(document, context);
</script>
```
