import React, { useState, useContext, useEffect } from 'react';
import { AuthContext, AuthContextType } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

interface Appartment {
  name: string;
  description: string;
  price: number;
  img: string;
}

const AddAppartment: React.FC = () => {
  const [appartment, setAppartment] = useState<Appartment>({
    name: '',
    description: '',
    price: 0,
    img: ''
  });
  const { user } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
      if(!user) return navigate("/")
  }, [user, navigate])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!appartment.name || !appartment.description || !appartment.price || !appartment.img) {
      alert('Please fill all the fields.');
      return;
    }

    if (typeof appartment.name !== 'string' || typeof appartment.description !== 'string' || typeof appartment.price !== 'number' || typeof appartment.img !== 'string') {
      alert('Please make sure all the fields are of correct type.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/appartments', appartment);
      alert('Appartment added successfully!');
      setAppartment({
        name: '',
        description: '',
        price: 0,
        img: ''
      });
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding appartment.');
    }
  };

  return (
    <div className="flex flex-col items-center">
    <h2 className="text-3xl font-bold mb-8">Add Apartment</h2>
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input type="text" id="name" value={appartment.name} onChange={(event) => setAppartment({ ...appartment, name: event.target.value })} required className="border rounded-md px-3 py-2 w-full"/>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
        <input type="text" id="description" value={appartment.description} onChange={(event) => setAppartment({ ...appartment, description: event.target.value })} required className="border rounded-md px-3 py-2 w-full"/>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
        <input type="number" id="price" value={appartment.price} onChange={(event) => setAppartment({ ...appartment, price: Number(event.target.value) })} required className="border rounded-md px-3 py-2 w-full"/>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
        <input type="text" id="image" value={appartment.img} onChange={(event) => setAppartment({ ...appartment, img: event.target.value })} required className="border rounded-md px-3 py-2 w-full"/>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Apartment</button>
    </form>
  </div>
  );
};

export default AddAppartment;
