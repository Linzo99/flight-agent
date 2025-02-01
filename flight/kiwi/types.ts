import { z } from "zod";

// ===================== ENUMS =====================
const CabinClass = z.enum(["M", "W", "C", "F"]); // ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS
const FlightDaysType = z.enum(["departure", "arrival"]);
const Currency = z.enum(["USD", "EUR"]); // Add more currencies as needed
const Locale = z.enum(["en", "es", "fr"]); // Add more locales as needed
const Sorting = z.enum(["date", "price", "duration", "quality"]);

// ===================== FLIGHT SEARCH PARAMS =====================
const FlightSearchParams = z
  .object({
    // Required Parameters
    fly_from: z
      .string()
      .describe("Kiwi ID for the departure location, e.g., 'FRA'"),
    date_from: z
      .string()
      .describe("Departure date in dd/mm/yyyy format, e.g., '01/04/2021'"),
    date_to: z
      .string()
      .describe(
        "End of departure date range in dd/mm/yyyy format, e.g., '03/04/2021'",
      ),

    // Optional Location Parameters
    fly_to: z
      .string()
      .optional()
      .describe("Kiwi ID of the arrival location, e.g., 'PRG'"),

    // Passenger Details
    adults: z
      .number()
      .int()
      .min(0)
      .max(9)
      .default(1)
      .describe("Number of adult passengers, e.g., 1"),
    children: z
      .number()
      .int()
      .min(0)
      .max(9)
      .default(0)
      .describe("Number of child passengers, e.g., 0"),
    infants: z
      .number()
      .int()
      .min(0)
      .max(9)
      .default(0)
      .describe("Number of infant passengers, e.g., 0"),

    // Return Flight Parameters
    return_from: z
      .string()
      .optional()
      .describe(
        "Start of return date range in dd/mm/yyyy format, e.g., '04/04/2021'",
      ),
    return_to: z
      .string()
      .optional()
      .describe(
        "End of return date range in dd/mm/yyyy format, e.g., '06/04/2021'",
      ),

    // Stay Duration
    nights_in_dst_from: z
      .number()
      .int()
      .optional()
      .describe("Minimum nights at the destination, e.g., 2"),
    nights_in_dst_to: z
      .number()
      .int()
      .optional()
      .describe("Maximum nights at the destination, e.g., 3"),

    // Time-based Filters
    dtime_from: z
      .string()
      .optional()
      .describe("Minimum departure time (HH:MM format), e.g., '11:00'"),
    dtime_to: z
      .string()
      .optional()
      .describe("Maximum departure time (HH:MM format), e.g., '23:00'"),
    atime_from: z
      .string()
      .optional()
      .describe("Minimum arrival time (HH:MM format), e.g., '11:00'"),
    atime_to: z
      .string()
      .optional()
      .describe("Maximum arrival time (HH:MM format), e.g., '23:00'"),

    // Return Flight Time Filters
    ret_dtime_from: z
      .string()
      .optional()
      .describe("Minimum departure time for return flight, e.g., '11:00'"),
    ret_dtime_to: z
      .string()
      .optional()
      .describe("Maximum departure time for return flight, e.g., '23:00'"),
    ret_atime_from: z
      .string()
      .optional()
      .describe("Minimum arrival time for return flight, e.g., '11:00'"),
    ret_atime_to: z
      .string()
      .optional()
      .describe("Maximum arrival time for return flight, e.g., '23:00'"),

    // Stopover Filters
    stopover_from: z
      .string()
      .optional()
      .describe("Minimum stopover duration (HH:MM format), e.g., '02:00'"),
    stopover_to: z
      .string()
      .optional()
      .describe("Maximum stopover duration (HH:MM format), e.g., '10:00'"),
    max_stopovers: z
      .number()
      .int()
      .optional()
      .describe("Maximum number of stopovers, 0 if direct flight, e.g., 2"),
    max_sector_stopovers: z
      .number()
      .int()
      .optional()
      .describe("Maximum number of stopovers per sector, e.g., 1"),

    // Flight Preferences
    selected_cabins: CabinClass.default("M").describe(
      "Preferred cabin class, e.g., 'M' (Economy)",
    ),
    mix_with_cabins: CabinClass.optional().describe(
      "Additional cabin class to mix, e.g., 'W' (Premium Economy)",
    ),

    // Baggage
    adult_hold_bag: z
      .string()
      .optional()
      .describe("Number of adult hold bags, comma-separated, e.g., '1,0'"),
    adult_hand_bag: z
      .string()
      .optional()
      .describe("Number of adult hand bags, comma-separated, e.g., '1,1'"),
    child_hold_bag: z
      .string()
      .optional()
      .describe("Number of child hold bags, comma-separated, e.g., '2,1'"),
    child_hand_bag: z
      .string()
      .optional()
      .describe("Number of child hand bags, comma-separated, e.g., '1,1'"),

    // Flight Day Restrictions
    fly_days: z
      .array(z.number().int().min(0).max(6))
      .optional()
      .describe(
        "List of departure days (0=Sunday, 6=Saturday), e.g., [1, 3, 5]",
      ),
    fly_days_type: FlightDaysType.optional().describe(
      "Specify if fly_days refer to arrival or departure, e.g., 'departure'",
    ),
    ret_fly_days: z
      .array(z.number().int().min(0).max(6))
      .optional()
      .describe("List of return days (0=Sunday, 6=Saturday), e.g., [0, 2, 4]"),
    ret_fly_days_type: z
      .string()
      .optional()
      .describe(
        "Specify if ret_fly_days refer to arrival or departure, e.g., 'arrival'",
      ),

    // Additional Flight Restrictions
    only_working_days: z
      .boolean()
      .optional()
      .describe("Search for flights on working days only, e.g., false"),
    only_weekends: z
      .boolean()
      .optional()
      .describe("Search for flights on weekends only, e.g., false"),

    // Airline and Airport Preferences
    select_airlines: z
      .string()
      .optional()
      .describe(
        "Comma-separated IATA codes of airlines to include/exclude, e.g., 'LH,AA'",
      ),
    select_airlines_exclude: z
      .boolean()
      .optional()
      .describe("Whether to exclude selected airlines, e.g., false"),
    select_stop_airport: z
      .string()
      .optional()
      .describe(
        "Comma-separated IATA codes of stopover airports, e.g., 'LHR,CDG'",
      ),
    select_stop_airport_exclude: z
      .boolean()
      .optional()
      .describe("Whether to exclude selected stopover airports, e.g., true"),

    // Filtering Options
    price_from: z
      .number()
      .int()
      .optional()
      .describe("Minimum price filter, e.g., 50"),
    price_to: z
      .number()
      .int()
      .optional()
      .describe("Maximum price filter, e.g., 500"),
    max_fly_duration: z
      .number()
      .int()
      .optional()
      .describe("Maximum itinerary duration in hours, e.g., 5"),

    // Miscellaneous
    curr: Currency.optional().describe("Currency for pricing, e.g., 'USD'"),
    locale: Locale.optional().describe("Language for response, e.g., 'en'"),
    partner_market: z
      .string()
      .optional()
      .describe(
        "Country code for the request origin (ISO 3166-1 alpha-2), e.g., 'us'",
      ),
    enable_vi: z
      .boolean()
      .default(false)
      .describe("Include virtually interlined content, e.g., false"),
    sort: z
      .string()
      .optional()
      .describe(
        "Sort results by price, duration, quality, or date, e.g., 'price'",
      ),
    limit: z
      .number()
      .int()
      .max(1000)
      .default(3)
      .describe("Limit number of results (max 1000), e.g., 3"),
  })
  .refine((data) => data.adults + data.children + data.infants <= 9, {
    message: "Total passengers cannot exceed 9",
  })
  .refine(
    (data) =>
      !data.mix_with_cabins ||
      (data.selected_cabins && data.mix_with_cabins <= data.selected_cabins),
    {
      message:
        "mix_with_cabins must be a lower cabin class than selected_cabins",
    },
  );

// ===================== RESULT TYPES =====================
const Country = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
});

const Duration = z.object({
  departure: z.number().int().optional(),
  return: z.number().int().optional(),
  total: z.number().int().optional(),
});

const Fare = z.object({
  adults: z.number().int().optional(),
  children: z.number().int().optional(),
  infants: z.number().int().optional(),
});

const BagPrice = z.object({
  "1": z.number().optional(),
  "2": z.number().optional(),
});

const BagLimit = z.object({
  hand_dimensions_sum: z.number().int().optional(),
  hand_height: z.number().int().optional(),
  hand_length: z.number().int().optional(),
  hand_weight: z.number().int().optional(),
  hand_width: z.number().int().optional(),
  hold_dimensions_sum: z.number().int().optional(),
  hold_height: z.number().int().optional(),
  hold_length: z.number().int().optional(),
  hold_weight: z.number().int().optional(),
  hold_width: z.number().int().optional(),
  personal_item_dimensions_sum: z.number().int().optional(),
  personal_item_height: z.number().int().optional(),
  personal_item_length: z.number().int().optional(),
  personal_item_weight: z.number().int().optional(),
  personal_item_width: z.number().int().optional(),
});

const Availability = z.object({
  seats: z.number().int().optional(),
});

const Route = z.object({
  id: z.string().optional(),
  combination_id: z.string().optional(),
  flyFrom: z.string().optional(),
  flyTo: z.string().optional(),
  cityFrom: z.string().optional(),
  cityCodeFrom: z.string().optional(),
  cityTo: z.string().optional(),
  cityCodeTo: z.string().optional(),
  local_departure: z.string().optional(),
  utc_departure: z.string().optional(),
  local_arrival: z.string().optional(),
  utc_arrival: z.string().optional(),
  airline: z.string().optional(),
  flight_no: z.number().int().optional(),
  operating_carrier: z.string().optional(),
  operating_flight_no: z.string().optional(),
  fare_basis: z.string().optional(),
  fare_category: z.string().optional(),
  fare_classes: z.string().optional(),
  return: z.number().int().optional(),
  bags_recheck_required: z.boolean().optional(),
  vi_connection: z.boolean().optional(),
  guarantee: z.boolean().optional(),
  equipment: z.string().optional(),
  vehicle_type: z.string().optional(),
});

const FlightSummary = z.object({
  flyFrom: z.string().optional(),
  flyTo: z.string().optional(),
  local_departure: z.string().optional(),
  local_arrival: z.string().optional(),
  duration: Duration.optional(),
  price: z.number().int().optional(),
  airlines: z.array(z.string()).optional(),
  deep_link: z.string().optional(),
  pnr_count: z.number().int().optional(),
});

const FlightData = z.object({
  id: z.string().optional(),
  flyFrom: z.string().optional(),
  flyTo: z.string().optional(),
  cityFrom: z.string().optional(),
  cityCodeFrom: z.string().optional(),
  cityTo: z.string().optional(),
  cityCodeTo: z.string().optional(),
  countryFrom: z.any().optional(),
  countryTo: z.any().optional(),
  local_departure: z.string().optional(),
  utc_departure: z.string().optional(),
  local_arrival: z.string().optional(),
  utc_arrival: z.string().optional(),
  nightsInDest: z.any().optional(),
  quality: z.number().optional(),
  distance: z.number().optional(),
  duration: z.any().optional(),
  price: z.number().int().optional(),
  conversion: z.record(z.number()).optional(),
  fare: z.any().optional(),
  bags_price: z.any().optional(),
  baglimit: z.any().optional(),
  availability: Availability.optional(),
  airlines: z.array(z.string()).optional(),
  route: z.array(z.any()).optional(),
  booking_token: z.string().optional(),
  deep_link: z.string().optional(),
  facilitated_booking_available: z.boolean().optional(),
  pnr_count: z.number().int().optional(),
  has_airport_change: z.boolean().optional(),
  technical_stops: z.number().int().optional(),
  throw_away_ticketing: z.boolean().optional(),
  hidden_city_ticketing: z.boolean().optional(),
  virtual_interlining: z.boolean().optional(),
});

const FlightSearchResult = z.object({
  search_id: z.string().optional(),
  currency: z.string().optional(),
  fx_rate: z.number().optional(),
  data: z.array(FlightData).optional(),
  _results: z.number().int().optional(),
});

// Export all schemas
export {
  CabinClass,
  FlightDaysType,
  Currency,
  Locale,
  Sorting,
  FlightSearchParams,
  Country,
  Duration,
  Fare,
  BagPrice,
  BagLimit,
  Availability,
  Route,
  FlightSummary,
  FlightData,
  FlightSearchResult,
};
