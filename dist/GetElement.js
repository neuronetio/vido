export default function prepareGetElement(directive) {
    return function getElement(callback) {
        return directive(() => (part) => {
            callback(part.committer.element);
        })();
    };
}
