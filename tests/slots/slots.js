function ItemSlot(vido, props = {}) {
  const { html, onChange, update } = vido;

  onChange((changedProps) => {
    props = changedProps;
    update();
  });

  return (templateProps) => html`<span class="slot-${props.id}">slot ${props.text}</span>`;
}

function Item(vido, props = {}) {
  const { html, Slots, onChange } = vido;

  function getSlotProps(id) {
    return { id, text: id };
  }

  const slots = new Slots(vido, getSlotProps(props.id));
  slots.setComponents({ inside: [ItemSlot] });

  onChange((changedProps) => {
    props = changedProps;
    slots.change(getSlotProps(props.id));
  });

  let additional = '';
  function add() {
    additional += '!';
    slots.change({ id: props.id, text: props.id + additional });
  }

  return (templateProps) =>
    html`<div class="item-${props.id}">
      <span class="item-${props.id}-text">item ${props.id}</span> (${slots.html('inside', templateProps)})
      <button @click="${add}" id="btn-${props.id}">add</button>
    </div>`;
}

function Main(vido, props) {
  const { html, onDestroy, onChange, reuseComponents } = vido;
  let items = [];

  onChange((changedProps) => {
    props = changedProps;
    reuseComponents(items, props.components, (component) => ({ id: component }), Item, false);
  });

  onDestroy(() => {
    items.forEach((item) => item.destroy());
  });

  return (templateProps) => html`<div class="items">${items.map((item) => item.html())}</div>`;
}

// @ts-ignore
var vido = Vido({}, {});
var app = vido.createApp({
  component: Main,
  props: { components: [1, 2, 3, 4, 5] },
  element: document.querySelector('.app'),
});

function changeProps(count = 2) {
  const components = [];
  for (let i = 0; i < count; i++) {
    components.push(i + 6);
  }
  app.change({ components });
}
