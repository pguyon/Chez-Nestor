import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

interface IHomepageProps {
    appartments: any,
}

const Homepage: React.FC<IHomepageProps> = () => {
    const [appartments, setAppartments] = useState([]);

   
    useEffect(() => {
        axios.get("http://localhost:8000/appartments?_sort=name&_order=asc")
            .then(res => {
                setAppartments(res.data);
            })
    }, []);




    return (
        <div className="flex flex-wrap justify-center">
            {appartments.map(appartment => (
                <Link to={`/appartment/${appartment.id}`} key={appartment.id}>
                   <div  className="w-64 p-4 mx-2 my-4 border rounded-lg shadow-md hover:scale-[1.02] cursor-pointer">
                    <img src={appartment.img} alt={appartment.name} className="w-full h-48 object-cover rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">{appartment.name}</h2>
                        <p className="mt-2 text-gray-600 truncate truncate-overflow" >{appartment.description}</p>
                        <p className="mt-2 font-semibold text-gray-900">{appartment.price}€</p>
                    </div>
                </div>
                </Link>
             
            ))}
        </div>

    );
}

export default Homepage;