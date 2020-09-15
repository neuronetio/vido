export default function prepareGetElement(directive) {
  return function getElement(callback: (element: Element) => void) {
    return directive(() => (part) => {
      callback(part.committer.element);
    })();
  };
}
