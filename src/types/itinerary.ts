export interface Itinerary {
  id: number;
  origin: string;
  destinations: string[];
  interests: string[];
  start_date: string;
  end_date: string;
  itinerary_data: string;
  duration: number;
}

export interface Activity {
  cost: string;
  time: string;
  address: string;
  activity: string;
  category: string;
  image_url: string;
  google_maps_url: string;
  place: string;
}

export interface Day {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Budget {
  food: number;
  attractions: number;
  accommodation: number;
  miscellaneous: number;
  transportation: number;
  total: number;
}
