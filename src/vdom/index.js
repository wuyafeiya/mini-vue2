export function createElementVNode(vm, tag, data, ...children) {
  if (data == null) {
    data = {}
  }

  let key = data.key

  if (key) {
    delete data.key
  }
  return vdom(vm, tag, key, data, children)
}

export function createTextVNode(vm, text) {
  return vdom(vm, undefined, undefined, undefined, undefined, text)
}

function vdom(vm, tag, key, data, children, text) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text
  }
}
