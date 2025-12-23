import { useCallback } from "react";
import { createContext, useEffect, useContext, useReducer } from "react";

const STORAGE_KEY = "worldwise-cities";
const CitiesContext = createContext();

// Default cities data to initialize localStorage if empty
const DEFAULT_CITIES = [
  {
    id: "716f",
    cityName: "Rome",
    country: "Italy",
    emoji: "🇮🇹",
    date: "2025-07-19T01:00:26.000Z",
    notes: "Such a beautiful city with a deep history!",
    position: {
      lat: "41.88592102814744",
      lng: "12.496948242187502",
    },
  },
  {
    id: "c7b7",
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2025-06-06T01:01:26.000Z",
    notes: "",
    position: {
      lat: "52.506191342034604",
      lng: "13.425292968750002",
    },
  },
  {
    id: "c846",
    cityName: "Guadalupe",
    country: "Mexico",
    emoji: "🇲🇽",
    date: "2025-05-22T01:02:40.000Z",
    notes: "",
    position: {
      lat: "22.755920681486405",
      lng: "-102.49145507812501",
    },
  },
  {
    id: "5695",
    cityName: "Paris",
    country: "France",
    emoji: "🇫🇷",
    date: "2025-04-12T02:04:00.149Z",
    notes: "",
    position: {
      lat: "48.850258199721495",
      lng: "2.3620605468750004",
    },
  },
  {
    id: "8e44",
    cityName: "Fellbach",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2024-04-07T02:04:50.891Z",
    notes: "",
    position: {
      lat: "48.785151998043155",
      lng: "9.316406250000002",
    },
  },
  {
    id: "1d37",
    cityName: "Peixoto de Azevedo",
    country: "Brazil",
    emoji: "🇧🇷",
    date: "2023-08-12T02:05:21.828Z",
    notes: "",
    position: {
      lat: "-10.250059987303004",
      lng: "-53.19580078125001",
    },
  },
  {
    id: "57f6",
    cityName: "Illapel",
    country: "Chile",
    emoji: "🇨🇱",
    date: "2023-07-28T02:05:49.297Z",
    notes: "",
    position: {
      lat: "-31.84023266790935",
      lng: "-71.14746093750001",
    },
  },
  {
    id: "eab4",
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2023-06-16T02:06:41.587Z",
    notes: "",
    position: {
      lat: "40.404607828492516",
      lng: "-3.7051391601562504",
    },
  },
  {
    id: "088e",
    cityName: "In Salah",
    country: "Algeria",
    emoji: "🇩🇿",
    date: "2023-05-06T02:06:56.841Z",
    notes: "",
    position: {
      lat: "28.07198030177986",
      lng: "2.7246093750000004",
    },
  },
  {
    id: "f296",
    cityName: "Gourma Rharous",
    country: "Mali",
    emoji: "🇲🇱",
    date: "2023-04-02T02:07:03.337Z",
    notes: "",
    position: {
      lat: "16.13026201203477",
      lng: "-2.1972656250000004",
    },
  },
];

// LocalStorage utility functions
function getCitiesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data if storage is empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CITIES));
    return DEFAULT_CITIES;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return DEFAULT_CITIES;
  }
}

function saveCitiesToStorage(cities) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw new Error("Failed to save cities to storage");
  }
}

function generateId() {
  return Math.random().toString(36).substring(2, 6);
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    function fetchCities() {
      try {
        dispatch({ type: "loading" });
        // Simulate async operation for consistency
        setTimeout(() => {
          const data = getCitiesFromStorage();
          dispatch({ type: "cities/loaded", payload: data });
        }, 100);
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    function getCity(id) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        // Simulate async operation for consistency
        setTimeout(() => {
          // First check if city is in current state
          const cityInState = cities.find(c => c.id === id);
          if (cityInState) {
            dispatch({ type: "city/loaded", payload: cityInState });
            return;
          }

          // Otherwise, get from localStorage
          const allCities = getCitiesFromStorage();
          const city = allCities.find(c => c.id === id);
          if (city) {
            dispatch({ type: "city/loaded", payload: city });
          } else {
            dispatch({
              type: "rejected",
              payload: "City not found...",
            });
          }
        }, 100);
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id, cities]
  );

  const createCity = useCallback(
    async function createCity(newCity) {
      try {
        dispatch({ type: "loading" });
        // Simulate async operation for consistency
        await new Promise(resolve => setTimeout(resolve, 200));

        // Generate ID if not provided
        const cityWithId = {
          ...newCity,
          id: newCity.id || generateId(),
        };

        // Use current state to ensure consistency, add new city, and save
        const updatedCities = [...cities, cityWithId];
        saveCitiesToStorage(updatedCities);

        dispatch({ type: "cities/created", payload: cityWithId });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error creating the city...",
        });
      }
    },
    [cities]
  );

  const deleteCity = useCallback(
    async function deleteCity(id) {
      try {
        dispatch({ type: "loading" });
        // Simulate async operation for consistency
        await new Promise(resolve => setTimeout(resolve, 100));

        // Use current state to ensure consistency, remove city, and save
        const updatedCities = cities.filter(city => city.id !== id);
        saveCitiesToStorage(updatedCities);

        dispatch({ type: "cities/deleted", payload: id });
      } catch (error) {
        alert("There was an error deleting the city...");
      }
    },
    [cities]
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
