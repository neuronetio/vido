globalThis.itemsDestroyed = 0;
globalThis.actionsCreated = 0;
globalThis.actionsDestroyed = 0;
globalThis.itemChildDestroyed = 0;

function itemAction(element, data) {
  actionsCreated++;
  return {
    update() {},
    destroy() {
      actionsDestroyed++;
    },
  };
}

function ItemChild(vido, props = {}) {
  const { html, onDestroy, Actions } = vido;
  const actions = Actions.create([itemAction]);
  onDestroy(() => {
    itemChildDestroyed++;
  });
  return (templateProps) =>
    html` <div data-actions=${actions} class="item-child-${props.id}">child: ${props.id}</div> `;
}

function ItemChild2(vido, props = {}) {
  const { html } = vido;
  return (templateProps) => html`<span>item child2</span>`;
}

function ItemSlot(vido, props = {}) {
  const { html } = vido;
  return (templateProps) => html`<span id="slot-${props.id}">item slot</span>`;
}

class ItemActionClass {
  constructor(element, data) {
    const span = element.querySelector('.action');
    span.innerText = `action ${data.id}`;
  }
  update(element, data) {
    const span = element.querySelector('.action');
    span.innerText = `action ${data.id}`;
  }
  destroy(element, data) {
    const span = element.querySelector('.action');
    span.innerText = ``;
  }
}

function ItemAction(element, data) {
  const span = element.querySelector('.actionFn');
  span.innerText = `actionFn ${data.id}`;

  return {
    update(element, data) {
      const span = element.querySelector('.actionFn');
      span.innerText = `actionFn ${data.id}`;
    },
    destroy(element, data) {
      const span = element.querySelector('.actionFn');
      span.innerText = ``;
    },
  };
}

function Item(vido, props = {}) {
  const { html, reuseComponents, onDestroy, createComponent, Slots, Actions } = vido;

  if (typeof window.ItemInstance === 'undefined') {
    globalThis.ItemInstance = vido.instance;
  }

  const slots = new Slots(vido, props);
  slots.setComponents({ inside: [ItemSlot] });

  let itemChild2 = createComponent(ItemChild2);
  onDestroy(itemChild2.destroy);

  let childs = [];
  reuseComponents(childs, [1, 2, 3, 4, 5], (child) => ({ id: props.id + '.' + child }), ItemChild, false);
  onDestroy(() => {
    childs.forEach((child) => child.destroy());
  });
  onDestroy(() => {
    // noop
  });
  onDestroy(() => {
    itemsDestroyed++;
  });
  onDestroy(() => {
    // noop
  });

  const actions = Actions.create([ItemActionClass, ItemAction], { ...props });

  return (templateProps) =>
    html`
      <div class="item-${props.id}" data-actions=${actions}>
        ${props.id} {action:<span class="action action-${props.id}"></span> &
        <span class="actionFn actionFn-${props.id}"></span>} [slot:
        ${slots.html('inside', templateProps)}](${itemChild2.html()}): ${childs.map((child) => child.html())}
      </div>
    `;
}

function Main(vido, props) {
  const { html, onDestroy, onChange, reuseComponents, StyleMap, update } = vido;
  let items = [];
  const styleMap = new StyleMap({ width: '100px', height: '100px', background: 'red' });
  onChange((changedProps) => {
    props = changedProps;
    reuseComponents(items, props.components, (component) => ({ id: component }), Item, false);
  });

  onDestroy(() => {
    items.forEach((item) => item.destroy());
  });

  onDestroy(() => {
    globalThis.appDestroyed = true;
  });

  function remove() {
    props.components.length = 4;
    reuseComponents(items, props.components, (component) => ({ id: component }), Item, false);
  }

  function changeStyle() {
    styleMap.style.background = 'green';
    styleMap.style.color = 'white';
    update();
  }

  return (templateProps) =>
    html`
      <div class="test">Test text</div>
      <div id="red-box" style=${styleMap.directive()}><button @click=${changeStyle}>c</button></div>
      <div><button id="remove-one" @click=${remove}>remove one</button></div>
      <div class="items">${items.map((item) => item.html())}</div>
    `;
}

globalThis.vido = Vido({}, {});
globalThis.app = vido.createApp({
  component: Main,
  props: { components: [1, 2, 3, 4, 5] },
  element: document.querySelector('.app'),
});

function destroyMain() {
  globalThis.app.destroy();
}

function destroyItemInstance() {
  var i = window.vido._components.get(window.ItemInstance);
  i.destroy();
  globalThis.app.update();
}
