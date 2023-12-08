

// mediaQuery.addEventListener('change', mediaQueryFunc);

export const getData = (type, title) => {  
  return fetch('./data/menuCategoriesData.json')                  
    .then(response => response.json())
    .then(data => {      
      const [{ types }] = data.filter(item => item.name === type);      
      const itemData = types.find(item => item.title === title);            
      const { size: sizeArray, add: addArray } = data.find(item => item.name === type);
            
      return { types, itemData, sizeArray, addArray };
    });
}