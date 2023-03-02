
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface IAppartment {
  name: string;
  description: string;
  price: number;
  img: string;
}

interface IAppartmentProps {
  appartment: IAppartment;
}

const Appartment: React.FC<IAppartmentProps> = ({ appartment }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center">
    <div className="md:w-1/2 md:pr-8">
      <h1 className="text-4xl font-bold mb-4">{appartment.name}</h1>
      <h2 className="text-lg mb-4">{appartment.description}</h2>
      <p className="text-2xl mb-4">{appartment.price}€</p>
    </div>
    <div className="md:w-1/2">
      <div className="overflow-hidden rounded-tl-3xl rounded-bl-full ">
        <img src={appartment.img} alt={appartment.name} className="w-full h-full object-cover " />
      </div>
    </div>
  </div>
  
  

  );
};

const AppartmentContainer: React.FC = () => {
  const [appartment, setAppartment] = useState<IAppartment>({ name: '', description: '', price: 0, img: '' });
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get<IAppartment>(`http://localhost:8000/appartments/${id}`).then((res) => {
      setAppartment(res.data);
    });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Appartment appartment={appartment} />
    </div>
  );
};

export default AppartmentContainer;
