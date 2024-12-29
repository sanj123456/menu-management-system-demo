export  function filterMenuTreeOptions(nodes) {
    const result = [];
    function traverse(node) {
        result.push({ label: node.title, value: node.parent_id || -1 });
        if (node.children && node.children.length > 0) {
            node.children.forEach((child) => traverse(child));
        }
    }
    nodes.forEach((rootNode) => traverse(rootNode));
    return result;
    
}

export const transformParentData = (nodes) =>
    nodes.map(({ id, title }) => ({ id, label: title }));

export const transformData = (data) => {
    console.log(data);
    const transform = (menu) => {
        return {
            depth: menu.depth,
            id: menu.id,
            name: menu.title,
            parent: menu.parent_id,
            children: menu.children
                ? Object.values(menu.children).map(transform)
                : [],
        };
    };

    const dataArray = Array.isArray(data) ? data : Object.values(data);

    return dataArray.map(transform);
};