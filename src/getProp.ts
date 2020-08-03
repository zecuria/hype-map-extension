

function searchReactParents(node: any, predicate:any, maxDepth = 15, depth = 0) :any {
    try {
        if (predicate(node)) {
            return node;
        }
    } catch (_) {}

    if (!node || depth > maxDepth) {
        return null;
    }

    const {'return': parent} = node;
    if (parent) {
        return searchReactParents(parent, predicate, maxDepth, depth + 1);
    }

    return null;
}

function getReactInstance(element: any) {
    for (const key in element) {
        if (key.startsWith('__reactInternalInstance$')) {
            return element[key];
        }
    }

    return null;
}

export const getCurrentPlayer = () => {
    let player: any;
    const element = document.querySelector('[data-test-selector="seekbar-interaction-area__interactionArea"]');
    try {
        const node = searchReactParents(
            getReactInstance(element),
            (n:any) => n.stateNode && (n.stateNode.props.onThumbLocationChange),
            30
        );
        player = node.stateNone.props;
    } catch (e) {}

    return player && player.core ? player.core : player;
}