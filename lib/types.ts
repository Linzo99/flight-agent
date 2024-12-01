export interface Message {
  role: string;
  content: any;
  isFinal?: boolean;
}

export interface Payload {
  input?: string;
  chat_history: Message[];
}

// #################### FLIGHT

export interface FlightData {
  id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  countryFrom: {
    code: string;
    name: string;
  };
  countryTo: {
    code: string;
    name: string;
  };
  local_departure: string; // ISO 8601 format (e.g., 2023-11-30T12:34:56.000Z)
  utc_departure: string; // ISO 8601 format
  local_arrival: string; // ISO 8601 format
  utc_arrival: string; // ISO 8601 format
  nightsInDest: number | null;
  quality: number;
  distance: number;
  duration: {
    departure: number; // Duration in seconds
    return: number; // Duration in seconds
    total: number; // Duration in seconds
  };
  price: number;
  conversion: {
    EUR: number;
  };
  fare: {
    adults: number;
    children: number;
    infants: number;
  };
  bags_price?: {
    [key: string]: number; // Key is the number of bags
  };
  baglimit?: {
    hand_dimensions_sum: number;
    hand_height: number;
    hand_length: number;
    hand_weight: number;
    hand_width: number;
    hold_dimensions_sum: number;
    hold_height: number;
    hold_length: number;
    hold_weight: number;
    hold_width: number;
    personal_item_dimensions_sum: number;
    personal_item_height: number;
    personal_item_length: number;
    personal_item_weight: number;
    personal_item_width: number;
  };
  availability: {
    seats: number;
  };
  airlines?: string[];
  route?: Route[];
  booking_token: string;
  deep_link: string;
  facilitated_booking_available: boolean;
  pnr_count?: number;
  has_airport_change: boolean;
  technical_stops: number;
  throw_away_ticketing: boolean;
  hidden_city_ticketing: boolean;
  virtual_interlining: boolean;
}

interface Route {
  id: string;
  combination_id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  local_departure: string; // ISO 8601 format
  utc_departure: string; // ISO 8601 format
  local_arrival: string; // ISO 8601 format
  utc_arrival: string; // ISO 8601 format
  airline: string;
  flight_no: string;
  operating_carrier: string;
  operating_flight_no: string;
  fare_basis: string;
  fare_category: string;
  fare_classes: string;
  return: number;
  bags_recheck_required: boolean;
  vi_connection: boolean;
  guarantee: boolean;
  equipment: null | string;
  vehicle_type: string;
  following_technical_stop: boolean;
}
