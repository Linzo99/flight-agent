import React from "react";
import { format, parseISO } from "date-fns";
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Clock,
  Coffee,
  CreditCard,
  Luggage,
  MapPin,
  Plane,
  Wifi,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FlightData } from "@/lib/types";

// Utility functions moved out of component for better performance and readability
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const formatDateTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "MMM d, yyyy HH:mm");
};

// Header component for flight details
const FlightHeader = ({ flight }: { flight: FlightData }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
    <div className="flex items-center mb-4 md:mb-0">
      <h2 className="text-xl font-bold">
        {flight.cityFrom} to {flight.cityTo}
      </h2>
    </div>
    <div className="flex items-center">
      <Badge variant="secondary" className="mr-2">
        {flight.airlines?.join(", ") || "Unknown Airline"}
      </Badge>
      <Badge variant="outline">{flight.availability.seats} seats left</Badge>
    </div>
  </div>
);

// Flight Time Information Component
const FlightTimeInfo = ({ flight }: { flight: FlightData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground">Departure</span>
      <span className="font-semibold">
        {formatDateTime(flight.local_departure)}
      </span>
      <span className="text-sm">
        {flight.cityFrom} ({flight.flyFrom})
      </span>
    </div>
    <div className="flex flex-col items-center">
      <Clock className="text-primary mb-1" />
      <span className="font-semibold">
        {formatDuration(flight.duration.total)}
      </span>
      <span className="text-sm text-muted-foreground">Total Duration</span>
    </div>
    <div className="flex flex-col text-right">
      <span className="text-sm text-muted-foreground">Arrival</span>
      <span className="font-semibold">
        {formatDateTime(flight.local_arrival)}
      </span>
      <span className="text-sm">
        {flight.cityTo} ({flight.flyTo})
      </span>
    </div>
  </div>
);

// Detailed Flight Route Segment
const FlightRouteSegment = ({
  segment,
  index,
}: {
  segment: any;
  index: number;
}) => (
  <div className="bg-muted p-4 rounded-lg">
    <p className="font-medium mb-2">Segment {index + 1}</p>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <p>
        From: {segment.cityFrom} ({segment.flyFrom})
      </p>
      <p>
        To: {segment.cityTo} ({segment.flyTo})
      </p>
      <p>Departure: {formatDateTime(segment.local_departure)}</p>
      <p>Arrival: {formatDateTime(segment.local_arrival)}</p>
      <p>Airline: {segment.airline}</p>
      <p>Flight: {segment.flight_no}</p>
    </div>
  </div>
);

// Detailed Flight Information Dialog
const FlightDetailsDialog = ({ flight }: { flight: FlightData }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">
        View Details
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="py-8 w-full h-full sm:h-min md:max-w-2xl overflow-y-auto rounded-md no-scrollbar">
      <DialogHeader>
        <DialogTitle>Flight Details</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[80vh] no-scrollbar overflow-y-auto">
        <div className="space-y-8">
          {/* Flight Overview */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {flight.cityFrom} to {flight.cityTo}
              </h2>
              <p className="text-muted-foreground">
                {formatDateTime(flight.local_departure)}
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              ${flight.price.toFixed(2)}
            </Badge>
          </div>

          {/* Flight Route Overview */}
          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {formatDateTime(flight.local_departure)}
              </p>
              <p className="text-sm font-medium">{flight.cityFrom}</p>
              <p className="text-xs text-muted-foreground">{flight.flyFrom}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium mb-1">
                {formatDuration(flight.duration.total)}
              </p>
              <div className="w-32 h-px bg-primary my-2 relative">
                <Plane className="text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
              </div>
              <p className="text-xs text-muted-foreground">
                {flight.distance} km
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {formatDateTime(flight.local_arrival)}
              </p>
              <p className="text-sm font-medium">{flight.cityTo}</p>
              <p className="text-xs text-muted-foreground">{flight.flyTo}</p>
            </div>
          </div>

          {/* Flight Information Sections */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Flight Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Departure</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(flight.local_departure)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Arrival</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(flight.local_arrival)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDuration(flight.duration.total)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Plane className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Airline</p>
                  <p className="text-xs text-muted-foreground">
                    {flight.airlines?.join(", ") || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Baggage Information */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Baggage Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Luggage className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Cabin Baggage</p>
                  <p className="text-xs text-muted-foreground">
                    Up to {flight.baglimit?.hand_weight}kg
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Luggage className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Check-in Baggage</p>
                  <p className="text-xs text-muted-foreground">
                    Up to {flight.baglimit?.hold_weight}kg
                  </p>
                </div>
              </div>
            </div>
            {flight.bags_price && (
              <div className="mt-2">
                <p className="text-sm font-medium">Additional Baggage Fees:</p>
                <ul className="list-disc list-inside text-xs text-muted-foreground">
                  {Object.entries(flight.bags_price).map(([bags, price]) => (
                    <li key={bags}>
                      {bags} bag(s): ${price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Fare Details */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Fare Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm">Adult Fare</p>
                <p className="text-sm font-medium">
                  ${flight.fare.adults.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Child Fare</p>
                <p className="text-sm font-medium">
                  ${flight.fare.children.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Infant Fare</p>
                <p className="text-sm font-medium">
                  ${flight.fare.infants.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">Total Price</p>
                <p className="text-sm font-bold">${flight.price.toFixed(2)}</p>
              </div>
            </div>
          </section>

          {/* Flight Route */}
          {flight.route && flight.route.length > 1 && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Flight Route</h3>
              <div className="space-y-4">
                {flight.route.map((segment, index) => (
                  <FlightRouteSegment
                    key={segment.id}
                    segment={segment}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Additional Information */}
          <section>
            <h3 className="text-lg font-semibold mb-2">
              Additional Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Technical Stops</p>
                  <p className="text-xs text-muted-foreground">
                    {flight.technical_stops}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Airport Change</p>
                  <p className="text-xs text-muted-foreground">
                    {flight.has_airport_change ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Wifi className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Virtual Interlining</p>
                  <p className="text-xs text-muted-foreground">
                    {flight.virtual_interlining ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Coffee className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Quality Score</p>
                  <p className="text-xs text-muted-foreground">
                    {flight.quality.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Book Now Button */}
          <div className="flex justify-center">
            <a
              href={flight.deep_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Book Now
            </a>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
);

// Main Flight Details Component
export default function FlightDetails({ flight }: { flight: FlightData }) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-0">
        <FlightHeader flight={flight} />
      </CardHeader>
      <CardContent className="py-4 space-y-0">
        <FlightTimeInfo flight={flight} />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="mr-2 text-primary" />
            <span className="text-xl font-bold">
              ${flight.price.toFixed(2)}
            </span>
          </div>
          <FlightDetailsDialog flight={flight} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full">
          <a
            href={flight.deep_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Book Now
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
