export interface TourDetail {
  id: number;
  city_id: number;
  city_name: string;
  name: string;
  address: string;
  description: string;
  thumbnail_url: string;
  images_url: string;
  longitude: number;
  latitude: number;
  map_top: number;
  map_left: number;
  is_show_on_map: boolean;
  created_at: string;
  updated_at: string;
  tour_category_id: number;
}
