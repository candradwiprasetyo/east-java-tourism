export interface CityDetail {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  description: string;
  created_at: string;
  updated_at: string;
  images_url: string;
  thumbnail_url: string;
  is_show_on_gallery: boolean;
  weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
    icon: string;
    humidity?: number;
    precipitation?: number;
    cloudcover?: number;
    uv_index?: number;
  };
}
