// import { assertEquals } from "../deps.ts";
// import jsdom from "https://dev.jspm.io/jsdom";

// import { bind } from './bind.ts';

// const document: Document = new jsdom
//   .JSDOM('', { url: "https://localhost" })
//   .window.document;
//console.log('XXXXX', document)

// Deno.test('binds attributes', () => {
//   document.documentElement.innerHTML = `
//     <div bind [inner-html]="html"></div>
//     <div bind [inner-html]="html"></div>
//   `;

//   const context = {
//     html: '<span>inserted</span>'
//   };

//   bind(document, context);

//   const els = document.querySelectorAll<HTMLElement>('[bind]');

//   assertEquals(els[0].innerHTML, context.html);
//   assertEquals(els[1].innerHTML, context.html);

//   const update = '<span>updated</span>';
//   context.html = update;

//   assertEquals(els[0].innerHTML, update);
//   assertEquals(els[1].innerHTML, update);
// });

  // Deno.test('binds attributes to sub-objects', () => {

//   document.documentElement.innerHTML = `
//     <div bind [inner-html]="data.html"></div>
//   `;

//   const context = {
//     data: {
//       html: '<span>inserted</span>'
//     }
//   };

//   bind(document, context);

//   const el = document.querySelector<HTMLElement>('[bind]')!;

//   assertEquals(el.innerHTML, context.data.html);

//   const update = '<span>updated</span>';
//   context.data.html = update;

//   assertEquals(el.innerHTML, update);
// });

// Deno.test('binds attributes when no context property', () => {

//   document.documentElement.innerHTML = `
//     <div bind [title]="title"></div>
//     <div bind [title]="title"></div>
//   `;

//   const context: any = {};

//   bind(document, context);

//   const els = document.querySelectorAll<HTMLElement>('[bind]');

//   assertEquals(els[0].innerHTML, '');
//   assertEquals(els[1].innerHTML, '');

//   const update = 'update';
//   context.title = update;

//   assertEquals(els[0].title, update);
//   assertEquals(els[1].title, update);
// });

// Deno.test('binds events', () => {

//   document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

//   let recievedEvent: Event | null = null;
//   const context = {
//     onClick: (e: Event) => (recievedEvent = e)
//   };

//   bind(document, context);

//   const el = document.querySelector<HTMLElement>('[bind]')!;
//   el.click();

//   assertNotEquals(recievedEvent, null);
// });

// Deno.test('this is bound to element in function properties', () => {

//   document.documentElement.innerHTML = `
//     <div data-id="one" bind [inner-html]="html"></div>
//     <div data-id="two" bind [inner-html]="html"></div>
//   `;

//   const els = document.querySelectorAll<HTMLElement>('[bind]');

//   const context = {
//     html(this: any): string {
//       return `<span>inserted ${this.dataset.id}</span>`;
//     }
//   };

//   bind(document, context);

//   assertEquals(els[0].innerHTML, '<span>inserted one</span>');
//   assertEquals(els[1].innerHTML, '<span>inserted two</span>');

//   els[0].dataset.id = 'three';
//   context.html();

//   assertEquals(els[0].innerHTML, '<span>inserted three</span>');
//   assertEquals(els[1].innerHTML, '<span>inserted two</span>');
// });

// Deno.test('this is bound to element in event handlers', () => {

//   document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

//   const el = document.querySelector<HTMLElement>('[bind]')!;
//   let elThis: HTMLElement | null = null;

//   const context = {
//     onClick: function () {
//       elThis = this as any;
//     }
//   };

//   bind(document, context);

//   el.click();

//   assertEquals(elThis, el);
// });
