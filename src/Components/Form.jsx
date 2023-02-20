import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const motorcycleMakes = [
  "BMW",
  "Ducati",
  "Harley Davidson",
  "Honda",
  "Kawasaki",
  "Suzuki",
  "Triumph",
  "Yamaha",
  "Aprilia",
  "Beta",
  "Husqvarna",
  "Indian",
  "KTM",
  "Moto Guzzi",
  "MV Agusta",
  "Royal Enfield",
  "Stark",
  "Vespa",
  "Arch",
];

const usStates = {
  AK: "AK - Alaska",
  AL: "AL - Alabama",
  AR: "AR - Arkansas",
  AS: "AS - American Samoa",
  AZ: "AZ - Arizona",
  CA: "CA - California",
  CO: "CO - Colorado",
  CT: "CT - Connecticut",
  DC: "DC - District of Columbia",
  DE: "DE - Delaware",
  FL: "FL - Florida",
  GA: "GA - Georgia",
  GU: "GU - Guam",
  HI: "HI - Hawaii",
  IA: "IA - Iowa",
  ID: "ID - Idaho",
  IL: "IL - Illinois",
  IN: "IN - Indiana",
  KS: "KS - Kansas",
  KY: "KY - Kentucky",
  LA: "LA - Louisiana",
  MA: "MA - Massachusetts",
  MD: "MD - Maryland",
  ME: "ME - Maine",
  MI: "MI - Michigan",
  MN: "MN - Minnesota",
  MO: "MO - Missouri",
  MS: "MS - Mississippi",
  MT: "MT - Montana",
  NC: "NC - North Carolina",
  ND: "ND - North Dakota",
  NE: "NE - Nebraska",
  NH: "NH - New Hampshire",
  NJ: "NJ - New Jersey",
  NM: "NM - New Mexico",
  NV: "NV - Nevada",
  NY: "NY - New York",
  OH: "OH - Ohio",
  OK: "OK - Oklahoma",
  OR: "OR - Oregon",
  PA: "PA - Pennsylvania",
  PR: "PR - Puerto Rico",
  RI: "RI - Rhode Island",
  SC: "SC - South Carolina",
  SD: "SD - South Dakota",
  TN: "TN - Tennessee",
  TX: "TX - Texas",
  UT: "UT - Utah",
  VA: "VA - Virginia",
  VI: "VI - Virgin Islands",
  VT: "VT - Vermont",
  WA: "WA - Washington",
  WI: "WI - Wisconsin",
  WV: "WV - West Virginia",
  WY: "WY - Wyoming",
};

// const motorcycleMakes = [
//   { id: 1, name: "BMW" },
//   { id: 2, name: "Ducati" },
//   { id: 3, name: "Harley Davidson" },
//   { id: 4, name: "Honda" },
//   { id: 5, name: "Kawasaki" },
//   { id: 6, name: "Suzuki" },
//   { id: 7, name: "Triumph" },
//   { id: 8, name: "Yamaha" },
//   { id: 9, name: "Aprilia" },
//   { id: 10, name: "Beta" },
//   { id: 11, name: "Husqvarna" },
//   { id: 12, name: "Indian" },
//   { id: 13, name: "KTM" },
//   { id: 14, name: "Moto Guzzi" },
//   { id: 15, name: "MV Agusta" },
//   { id: 16, name: "Royal Enfield" },
//   { id: 17, name: "Stark" },
//   { id: 18, name: "Vespa" },
//   { id: 19, name: "Arch" },
// ];

// const usStates = [
//   { AK: "AK - Alaska" },
//   { AL: "AL - Alabama" },
//   { AR: "AR - Arkansas" },
//   { AS: "AS - American Samoa" },
//   { AZ: "AZ - Arizona" },
//   { CA: "CA - California" },
//   { CO: "CO - Colorado" },
//   { CT: "CT - Connecticut" },
//   { DC: "DC - District of Columbia" },
//   { DE: "DE - Delaware" },
//   { FL: "FL - Florida" },
//   { GA: "GA - Georgia" },
//   { GU: "GU - Guam" },
//   { HI: "HI - Hawaii" },
//   { IA: "IA - Iowa" },
//   { ID: "ID - Idaho" },
//   { IL: "IL - Illinois" },
//   { IN: "IN - Indiana" },
//   { KS: "KS - Kansas" },
//   { KY: "KY - Kentucky" },
//   { LA: "LA - Louisiana" },
//   { MA: "MA - Massachusetts" },
//   { MD: "MD - Maryland" },
//   { ME: "ME - Maine" },
//   { MI: "MI - Michigan" },
//   { MN: "MN - Minnesota" },
//   { MO: "MO - Missouri" },
//   { MS: "MS - Mississippi" },
//   { MT: "MT - Montana" },
//   { NC: "NC - North Carolina" },
//   { ND: "ND - North Dakota" },
//   { NE: "NE - Nebraska" },
//   { NH: "NH - New Hampshire" },
//   { NJ: "NJ - New Jersey" },
//   { NM: "NM - New Mexico" },
//   { NV: "NV - Nevada" },
//   { NY: "NY - New York" },
//   { OH: "OH - Ohio" },
//   { OK: "OK - Oklahoma" },
//   { OR: "OR - Oregon" },
//   { PA: "PA - Pennsylvania" },
//   { PR: "PR - Puerto Rico" },
//   { RI: "RI - Rhode Island" },
//   { SC: "SC - South Carolina" },
//   { SD: "SD - South Dakota" },
//   { TN: "TN - Tennessee" },
//   { TX: "TX - Texas" },
//   { UT: "UT - Utah" },
//   { VA: "VA - Virginia" },
//   { VI: "VI - Virgin Islands" },
//   { VT: "VT - Vermont" },
//   { WA: "WA - Washington" },
//   { WI: "WI - Wisconsin" },
//   { WV: "WV - West Virginia" },
//   { WY: "WY - Wyoming" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Form() {
  const API = process.env.REACT_APP_API_URL;
  let { id } = useParams();
  let navigate = useNavigate();

  const [selected, setSelected] = useState(motorcycleMakes[0]);
  const [selectedSt, setSelectedSt] = useState(usStates[0]);

  const [motorcycle, setMotorcycle] = useState({
    img: "https://i.ytimg.com/vi/GlhkzHT0iJE/hqdefault.jpg",
    owner: "",
    make: "BMW",
    model: "",
    year: 1885,
    odometer: 0,
    is_new: false,
    description: "",
    title_on_hand: false,
    price: 0,
    city: "",
    state: "AK",
  });

  const handleTextChange = (event) => {
    setMotorcycle({ ...motorcycle, [event.target.id]: event.target.value });
  };

  const handleSelect = (event) => {
    if (event.target.id === "state") {
      setMotorcycle({
        ...motorcycle,
        [event.target.id]: event.target.value.substring(0, 2),
      });
    } else {
      setMotorcycle({ ...motorcycle, [event.target.id]: event.target.value });
    }
  };

  const handleCheckboxChange = (event) => {
    setMotorcycle({
      ...motorcycle,
      [event.target.id]: !motorcycle[event.target.id],
    });
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API}/motorcycles/${id}`)
      .then((response) => {
        console.log(response.data);
        setMotorcycle(response.data);
      })
      .catch((error) => console.error("catch", error));
  }, [id, API]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!id) {
      axios
        .post(`${API}/motorcycles`, motorcycle)
        .then(() => {
          navigate(`/motorcycles`);
        })
        .catch((error) => console.error("catch", error));
    } else {
      console.log(motorcycle);
      axios
        .put(`${API}/motorcycles/${id}`, motorcycle)
        .then(() => {
          navigate(`/motorcycles`);
        })
        .catch((error) => console.error("catch", error));
    }
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          {/*------Owner------*/}
          <div className="flex justify-between">
            <label
              htmlFor="owner"
              className="block text-sm font-medium text-gray-700"
            >
              Owner
            </label>
            <span className="text-sm text-gray-500" id="owner-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="text"
              name="owner"
              id="owner"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={id ? motorcycle.owner : "Please enter your name"}
              value={motorcycle.owner}
              onChange={handleTextChange}
              aria-describedby="owner-required"
            />
          </div>

          {/*------Year------*/}
          <div className="flex justify-between pt-5">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <span className="text-sm text-gray-500" id="year-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="number"
              name="year"
              id="year"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              min={1885}
              max={2024}
              placeholder={id ? motorcycle.year : 1885}
              value={motorcycle.year}
              onChange={handleTextChange}
              aria-describedby="year-required"
            />
          </div>

          {/*------Make------*/}
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <div className="flex justify-between pt-5">
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700"
              >
                Make
              </label>
              <span className="text-sm text-gray-500" id="make-required">
                Required
              </span>
            </div>
            <select
              id="make"
              name="make"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
              value={motorcycle.make}
              onChange={handleSelect}
            >
              {motorcycleMakes.map((make) => {
                return <option value={make}>{make}</option>;
              })}
            </select>
          </div>

          {/*------Model------*/}
          <div className="flex justify-between pt-5 ">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <span className="text-sm text-gray-500" id="model-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="text"
              name="model"
              id="model"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={
                id ? motorcycle.model : "Please enter a motorcycle model"
              }
              value={motorcycle.model}
              onChange={handleTextChange}
              aria-describedby="model-required"
            />
          </div>

          {/*------Image Link------*/}
          <div className="flex justify-between pt-5 ">
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700"
            >
              Image Link
            </label>
            <span className="text-sm text-gray-500" id="model-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="text"
              name="img"
              id="img"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={
                id
                  ? motorcycle.img
                  : "Please enter an image url for the motorcycle"
              }
              value={motorcycle.img}
              onChange={handleTextChange}
              aria-describedby="img-required"
            />
          </div>

          {/*------Odometer------*/}
          <div className="flex justify-between pt-5">
            <label
              htmlFor="odometer"
              className="block text-sm font-medium text-gray-700"
            >
              Miles
            </label>
            <span className="text-sm text-gray-500" id="year-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="number"
              name="odometer"
              id="odometer"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              min={0}
              placeholder={id ? motorcycle.odometer : 0}
              value={motorcycle.odometer}
              onChange={handleTextChange}
              aria-describedby="odometer-required"
            />
          </div>
          {/* <br /> */}

          {/*------Is New------*/}
          <fieldset className="space-y-5">
            <legend className="sr-only">New</legend>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="is_new"
                  aria-describedby="is_new"
                  name="is_new"
                  type="checkbox"
                  value={motorcycle.is_new}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={motorcycle.is_new}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="is_new" className="font-medium text-gray-700">
                  New or Used
                </label>
                <p id="is_new-description" className="text-gray-500">
                  Check the box if the motorcyle you're listing is new.
                </p>
              </div>
            </div>
          </fieldset>

          {/*------Title on Hand------*/}
          <fieldset className="space-y-5 border-b-2 border-gray-400 pb-5">
            <legend className="sr-only">Title On Hand</legend>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="title_on_hand"
                  aria-describedby="title_on_hand"
                  name="title_on_hand"
                  type="checkbox"
                  value={motorcycle.title_on_hand}
                  checked={motorcycle.title_on_hand}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="title_on_hand"
                  className="font-medium text-gray-700"
                >
                  Title on Hand
                </label>
                <p id="is_new-description" className="text-gray-500">
                  Check the box if you have the title on hand.
                </p>
              </div>
            </div>
          </fieldset>

          {/*------Description------*/}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 pt-5"
            >
              Add a short description for the motorcycle you're listing.
            </label>
            <div className="mt-1 border-b-2 border-gray-400 pb-5">
              <textarea
                rows={4}
                name="description"
                id="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={
                  id ? motorcycle.description : "Please enter a description"
                }
                value={motorcycle.description}
                onChange={handleTextChange}
              />
            </div>
          </div>

          {/*------Seller City------*/}
          <div className="flex justify-between pt-5">
            <label
              htmlFor="seller-city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <span className="text-sm text-gray-500" id="seller-city-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="text"
              name="seller-city"
              id="city"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={
                id
                  ? motorcycle.city
                  : "Please enter the city the motorcyle is located in"
              }
              value={motorcycle.city}
              onChange={handleTextChange}
              aria-describedby="seller-city"
            />
          </div>

          {/*------Seller State------*/}
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <div className="flex justify-between pt-5">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <span className="text-sm text-gray-500" id="make-required">
                Required
              </span>
            </div>
            <select
              id="state"
              name="state"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
              value={motorcycle.state}
              onChange={handleSelect}
            >
              {Object.keys(usStates).map((stateAbbrv) => {
                return (
                  <option key={usStates[stateAbbrv]} value={stateAbbrv}>
                    {usStates[stateAbbrv]}
                  </option>
                );
              })}
            </select>
          </div>

          {/*------Asking Price------*/}
          <div className="flex justify-between pt-5">
            <label
              htmlFor="asking-price"
              className="block text-sm font-medium text-gray-700"
            >
              Asking Price
            </label>
            <span className="text-sm text-gray-500" id="year-required">
              Required
            </span>
          </div>
          <div className="mt-1 border-b-2 border-gray-400 pb-5">
            <input
              type="number"
              name="asking-price"
              id="price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              min={0}
              placeholder={id ? motorcycle.price : 0}
              value={motorcycle.price}
              onChange={handleTextChange}
              aria-describedby="asking-price"
            />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
