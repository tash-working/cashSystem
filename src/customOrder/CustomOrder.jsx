import React, { useState } from 'react';

const CustomOrder = ({item, getfco, index}) => {
    const ingredients = item.ingredients
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleCheckboxChange = (ingredient) => {
        let newItems = []
      if (selectedIngredients.includes(ingredient)) {
        newItems = selectedIngredients.filter((item) => item !== ingredient)
        setSelectedIngredients(newItems);

      } else {
        newItems = [...selectedIngredients, ingredient]
        setSelectedIngredients(newItems);   
        // console.log(newItems);
        
  
      }
      getfco({newItems, index })
    };
    return (
        <div>
             <div key={item.name} style={{ padding: "10px", margin: "30px" }}>
            {/* <button>{item.totalPrice + "tk"}</button> */}
            <p>{item.name}</p>
            <div>
              {ingredients.map((ingredient) => (
                <div key={ingredient.name}>
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => handleCheckboxChange(ingredient)}
                  />
                  <label>{ingredient.name}</label>
                </div>
              ))}
              <p>Selected Ingredients: {selectedIngredients.map((ingredient) => ingredient.name).join(', ')}</p>
            </div>

          </div>
        </div>
    );
};

export default CustomOrder;