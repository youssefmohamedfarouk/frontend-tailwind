import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  // More files...
];

export default function Index() {
  const API = process.env.REACT_APP_API_URL;
  const numOfColumns = 4;
  const [motorcycles, setMotorcycles] = useState([]);
  const priceFormat = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  useEffect(() => {
    axios
      .get(`${API}/motorcycles`)
      .then((res) => {
        setMotorcycles(res.data);
        // console.log(motorcycles);
      })
      .catch((error) => console.error);
  }, []);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {motorcycles.map((motorcycle) => (
        <Link to={`/motorcycles/${motorcycle.id}`}>
          <li key={motorcycle.id} className="relative">
            <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                src={motorcycle.img}
                alt={motorcycle.make + " " + motorcycle.model}
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">
                  View details for {motorcycle.year} {motorcycle.make}{" "}
                  {motorcycle.model}
                </span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {motorcycle.year} {motorcycle.make} {motorcycle.model}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {motorcycle.is_new ? "New" : "Used"} •{" "}
              {priceFormat(motorcycle.price)}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {motorcycle.city}, {motorcycle.state}{" "}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
