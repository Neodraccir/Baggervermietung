function reorderItemsInDOM(parentString, newOrderArray, grandparent){
    let parent = grandparent?.[parentString],
        items = parent?.children,
        newItemOrder = newOrderArray,
        elements = document.createDocumentFragment();
        logThis(items)
                     
    newItemOrder.forEach(function(index){
        elements?.appendChild(items?.[index]?.cloneNode(true));
    });
    parent.innerHTML = null;
    parent.appendChild(elements);
                    
    };


export {reorderItemsInDOM}