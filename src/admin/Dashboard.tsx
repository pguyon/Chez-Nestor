import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '../context/UserContext';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';


const Dashboard: React.FC = () => {
  const { user } = useContext<AuthContextType>(AuthContext);
  const [appartments, setAppartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/")
  }, [user, navigate])



  useEffect(() => {
    axios.get("http://localhost:8000/appartments?_sort=name&_order=asc")
      .then(res => {
        setAppartments(res.data);
      })
  }, []);


  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8000/appartments/${id}`)
      .then(res => {
        setAppartments(prevState => prevState.filter(appartment => appartment.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des appartements</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left">Nom</th>            
            <th className="py-3 px-4 text-left">Prix</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appartments.map(appartment => (
            <tr key={appartment.id} className="border-b border-gray-300">
              <td className="py-3 px-4">{appartment.name}</td>              
              <td className="py-3 px-4">{appartment.price}€</td>
              <td className="py-3 px-4">
                <Link to={`/admin/editappartment/${appartment.id}`}  className="bg-lime-500 hover:bg-lime-600 mr-0.5 text-white py-2 px-4 rounded-md md:py-1 md:px-2">
                  Edit
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md md:py-1 md:px-2"
                  onClick={() => handleDelete(appartment.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  

};

export default Dashboard;
