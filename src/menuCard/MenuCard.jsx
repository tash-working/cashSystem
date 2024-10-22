import React, { useState } from 'react';

const MenuCard = ({ item, getItems}) => {
    const [items, setItems] = useState([]);
    const addItem = (i) => {
    
        getItems(i)

    }
    return (
        <div>
            <button onClick={() => addItem(item)}><h1>{item.item_name}</h1></button>
    
            {/* <button onClick={() => addOrder(item)}>{item.price+"tk"}</button> */}
        </div>
    );
};

export default MenuCard;