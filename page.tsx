import FlightDetails from "./flight-details"

const sampleFlightData: FlightData = {
  id: "0123456789",
  flyFrom: "JFK",
  flyTo: "LAX",
  cityFrom: "New York",
  cityCodeFrom: "NYC",
  cityTo: "Los Angeles",
  cityCodeTo: "LA",
  countryFrom: {
    code: "US",
    name: "United States"
  },
  countryTo: {
    code: "US",
    name: "United States"
  },
  local_departure: "2023-12-15T08:00:00.000Z",
  utc_departure: "2023-12-15T13:00:00.000Z",
  local_arrival: "2023-12-15T11:30:00.000Z",
  utc_arrival: "2023-12-15T19:30:00.000Z",
  nightsInDest: null,
  quality: 85.33359,
  distance: 3935.13,
  duration: {
    departure: 19800,
    return: 0,
    total: 19800
  },
  price: 199.99,
  conversion: {
    EUR: 185.99
  },
  fare: {
    adults: 199.99,
    children: 149.99,
    infants: 29.99
  },
  bags_price: {
    "1": 30,
    "2": 60
  },
  baglimit: {
    hand_height: 40,
    hand_length: 55,
    hand_weight: 10,
    hand_width: 20,
    hold_dimensions_sum: 158,
    hold_height: 52,
    hold_length: 78,
    hold_weight: 23,
    hold_width: 28,
    personal_item_height: 30,
    personal_item_length: 40,
    personal_item_weight: 2,
    personal_item_width: 15
  },
  availability: {
    seats: 9
  },
  airlines: ["AA"],
  route: [
    {
      id: "0123456789_0",
      combination_id: "0123456789",
      flyFrom: "JFK",
      flyTo: "LAX",
      cityFrom: "New York",
      cityCodeFrom: "NYC",
      cityTo: "Los Angeles",
      cityCodeTo: "LA",
      local_departure: "2023-12-15T08:00:00.000Z",
      utc_departure: "2023-12-15T13:00:00.000Z",
      local_arrival: "2023-12-15T11:30:00.000Z",
      utc_arrival: "2023-12-15T19:30:00.000Z",
      airline: "AA",
      flight_no: "123",
      operating_carrier: "AA",
      operating_flight_no: "123",
      fare_basis: "K",
      fare_category: "M",
      fare_classes: "K",
      return: 0,
      bags_recheck_required: false,
      vi_connection: false,
      guarantee: false,
      equipment: null,
      vehicle_type: "aircraft",
      following_technical_stop: false
    }
  ],
  booking_token: "booking_token_here",
  deep_link: "https://example.com/book-flight",
  facilitated_booking_available: true,
  pnr_count: 1,
  has_airport_change: false,
  technical_stops: 0,
  throw_away_ticketing: false,
  hidden_city_ticketing: false,
  virtual_interlining: false
}

export default function FlightBookingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Flight Details</h1>
        <FlightDetails flight={sampleFlightData} />
      </div>
    </div>
  )
}

