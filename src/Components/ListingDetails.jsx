import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  PlusIcon as PlusIconOutline,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon as PlusIconMini,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "Listings", href: "#", icon: PhotoIcon, current: true },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
const tabs = [
  { name: "All Listings", href: "#", current: true },
  { name: "Recently Added", href: "#", current: false },
  { name: "Favorited", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DetailsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const API = process.env.REACT_APP_API_URL;
  const [motorcycles, setMotorcycles] = useState([]);
  const [currentMotorcycle, setCurrentMotorcycle] = useState({});
  const [currentBids, setCurrentBids] = useState([]);
  const [open, setOpen] = useState(false);
  const [bidOpen, setBidOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const cancelButtonRef = useRef(null);

  const [newBid, setNewBid] = useState({
    bidder: "",
    price: 0,
    listing_id: 0,
  });

  const { id } = useParams();
  let navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`${API}/motorcycles/1`)
      .then((res) => {
        setCurrentMotorcycle(res.data);
        // console.log(motorcycles);
      })
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/bids/1`)
      .then((res) => {
        setCurrentBids(res.data);
        // console.log(motorcycles);
      })
      .catch((error) => console.error);
  }, []);

  const handleTextChange = (event) => {
    setNewBid({ ...newBid, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewBid({ ...newBid, listing_id: currentMotorcycle.id });
    axios
      .post(`${API}/bids`, newBid)
      .then(() => {
        setBidOpen(false);
        window.location.reload();
      })
      .catch((error) => console.error("catch", error));
  };

  const getSelectedMotorcycle = (event) => {
    console.log(event.target.id);
    axios
      .get(`${API}/motorcycles/${event.target.id}`)
      .then((res) => {
        setCurrentMotorcycle(res.data);
        console.log(currentMotorcycle);
      })
      .catch((error) => console.error);
  };

  const getBids = (event) => {
    console.log(event.target.id);
    axios
      .get(`${API}/bids/${event.target.id}`)
      .then((res) => {
        setCurrentBids(res.data);
        console.log(currentBids);
      })
      .catch((error) => console.error);
  };

  const getAllDetails = (event) => {
    getSelectedMotorcycle(event);
    getBids(event);
  };

  const handleDelete = (id, path) => {
    axios
      .delete(`${API}/${path}/${id}`)
      .then(
        () => {
          window.location.reload();
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  return (
    <>
      <div className="flex h-full">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between px-4 sm:px-6">
                <div className="flex flex-1">
                  <form className="flex w-full md:ml-0" action="#" method="GET">
                    <label htmlFor="desktop-search-field" className="sr-only">
                      Search all listings
                    </label>
                    <label htmlFor="mobile-search-field" className="sr-only">
                      Search all listings
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        name="mobile-search-field"
                        id="mobile-search-field"
                        className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:hidden"
                        placeholder="Search"
                        type="search"
                      />
                      <input
                        name="desktop-search-field"
                        id="desktop-search-field"
                        className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:block"
                        placeholder="Search all listings"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Add file</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">
                    Listings
                  </h1>
                  <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Use list view</span>
                    </button>
                    <button
                      type="button"
                      className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <Squares2X2IconMini
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Use grid view</span>
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-3 sm:mt-2">
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      defaultValue="All Listings"
                    >
                      <option>All Listings</option>
                      <option>Recently Added</option>
                      <option>Favorited</option>
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-200">
                      <nav
                        className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
                        aria-label="Tabs"
                      >
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? "page" : undefined}
                            className={classNames(
                              tab.current
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                      <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
                        <button
                          type="button"
                          className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                          <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Use list view</span>
                        </button>
                        <button
                          type="button"
                          className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                          <Squares2X2IconMini
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Use grid view</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <section
                  className="mt-8 pb-16"
                  aria-labelledby="gallery-heading"
                >
                  <h2 id="gallery-heading" className="sr-only">
                    All Listings
                  </h2>
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {motorcycles.map((motorcycle) => (
                      <li
                        key={motorcycle.id + motorcycle.make + motorcycle.model}
                        className="relative"
                        id={motorcycle.id}
                        onClick={getAllDetails}
                      >
                        <div
                          className={classNames(
                            motorcycle.current
                              ? "ring-2 ring-offset-2 ring-indigo-500"
                              : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                            "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                          )}
                        >
                          <img
                            src={motorcycle.img}
                            alt=""
                            className={classNames(
                              motorcycle.current
                                ? ""
                                : "group-hover:opacity-75",
                              "object-cover pointer-events-none"
                            )}
                          />
                          <button
                            type="button"
                            className="absolute inset-0 focus:outline-none"
                            id={motorcycle.id}
                            onClick={getSelectedMotorcycle}
                          >
                            <span className="sr-only">
                              View details for {motorcycle.year}{" "}
                              {motorcycle.make} {motorcycle.model}
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
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>

            {/* Motorcycle Details Right Sidebar */}
            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
              <div className="space-y-6 pb-16">
                <div>
                  <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
                    <img
                      src={currentMotorcycle.img}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        <span className="sr-only">Details for </span>
                        {currentMotorcycle.year} {currentMotorcycle.make}{" "}
                        {currentMotorcycle.model}
                      </h2>
                      <p className="text-sm font-medium text-gray-500">
                        {currentMotorcycle.is_new ? "New" : "Used"} •{" "}
                        {currentMotorcycle.odometer}{" "}
                        {currentMotorcycle.odomer === 1 ? "mile" : "miles"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <HeartIcon
                        className={isFav ? "h-6 w-6 fill-red-600" : "h-6 w-6"}
                        aria-hidden="true"
                        onClick={() => setIsFav(!isFav)}
                      />
                      <span className="sr-only">Favorite</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Information</h3>
                  <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                    <div
                      key={currentMotorcycle.id + "price"}
                      className="flex justify-between py-3 text-sm font-medium"
                    >
                      <dt className="text-gray-500">Asking Price</dt>
                      <dd className="whitespace-nowrap text-gray-900">
                        {priceFormat(currentMotorcycle.price)}
                      </dd>
                    </div>

                    <div
                      key={currentMotorcycle.id + "owner"}
                      className="flex justify-between py-3 text-sm font-medium"
                    >
                      <dt className="text-gray-500">Seller</dt>
                      <dd className="whitespace-nowrap text-gray-900">
                        {currentMotorcycle.owner}
                      </dd>
                    </div>

                    <div
                      key={currentMotorcycle.id + "location"}
                      className="flex justify-between py-3 text-sm font-medium"
                    >
                      <dt className="text-gray-500">Seller location</dt>
                      <dd className="whitespace-nowrap text-gray-900">
                        {currentMotorcycle.city}, {currentMotorcycle.state}
                      </dd>
                    </div>

                    <div
                      key={currentMotorcycle.id + "title"}
                      className="flex justify-between py-3 text-sm font-medium"
                    >
                      <dt className="text-gray-500">Title on Hand?</dt>
                      <dd className="whitespace-nowrap text-gray-900">
                        {currentMotorcycle.title_on_hand ? "Yes" : "No"}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Description</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm italic text-gray-500">
                      {currentMotorcycle.description}
                    </p>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() =>
                        navigate(`/motorcycles/${currentMotorcycle.id}/edit`)
                      }
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Add description</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Current Bids</h3>
                  <ul
                    role="list"
                    className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"
                  >
                    {currentBids.map((bid) => (
                      <li
                        key={bid.bidder + bid.id}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center">
                          <img
                            src={
                              "https://www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg"
                            }
                            alt=""
                            className="h-8 w-8 rounded-full"
                          />
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {bid.bidder}
                          </p>
                          <p
                            className={
                              bid.price >= currentMotorcycle.price
                                ? "text-green-500 ml-4 text-sm font-medium"
                                : bid.price < currentMotorcycle.price &&
                                  bid.price >= currentMotorcycle.price - 500
                                ? "text-orange-500 ml-4 text-sm font-medium"
                                : "text-red-600 ml-4 text-sm font-medium"
                            }
                          >
                            {priceFormat(bid.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => handleDelete(bid.id, "bids")}
                        >
                          Remove<span className="sr-only"> {bid.bidder}</span>
                        </button>
                      </li>
                    ))}
                    <li className="flex items-center justify-between py-2">
                      <button
                        type="button"
                        className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={() => setBidOpen(true)}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                          <PlusIconMini
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                          Add a Bid
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setBidOpen(true)}
                  >
                    Make a Bid
                  </button>
                  {/* <button
                    type="button"
                    className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Edit Listing
                  </button> */}
                  <button
                    type="button"
                    className="ml-3 flex-1 rounded-md border border-gray-300 bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(true)}
                  >
                    Delete Listing
                  </button>

                  {/* BID MODAL */}
                  <Transition.Root show={bidOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      initialFocus={cancelButtonRef}
                      onClose={setBidOpen}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                      Make A Bid
                                    </Dialog.Title>

                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        Please place your bid.
                                      </p>

                                      <label
                                        htmlFor="bidder"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        name="bidder"
                                        id="bidder"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Please enter your name"}
                                        value={newBid.bidder}
                                        onChange={handleTextChange}
                                        aria-describedby="seller-city"
                                      />
                                      <label
                                        htmlFor="bidder"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Bid
                                      </label>
                                      <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Please enter your bid"}
                                        value={newBid.price}
                                        onChange={handleTextChange}
                                        aria-describedby="seller-city"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-akira-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={handleSubmit}
                                >
                                  Submit Bid
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>

                  {/* DELETE MODAL */}
                  <Transition.Root show={open} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      initialFocus={cancelButtonRef}
                      onClose={setOpen}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                      className="h-6 w-6 text-red-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                      Delete Listing?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        Are you sure you want to delete this
                                        listing? All of its associated
                                        information will be removed. This action
                                        cannot be undone.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => {
                                    handleDelete(
                                      currentMotorcycle.id,
                                      "motorcycles"
                                    );
                                    setOpen(false);
                                    window.location.reload();
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
