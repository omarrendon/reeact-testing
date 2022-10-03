import React, { useEffect, useState } from 'react';

const foodList = ['Pizza', 'Tacos', 'Hamburgesa'];

const fakeAPI = () => new Promise((resolve) => setTimeout(resolve(foodList), 2000));

export default function AsyncList () {
  const [data, setData] = useState([]);

  useEffect(() => {
    fakeAPI().then((data) => setData(data));
  }, []);
  
  return data.map((element) => <p key={element}>{element}</p>)
}
