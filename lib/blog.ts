// Blog articles. Adapted from the posts on eapremiumtransportation.com (same business), rewritten for
// One World Limousine; near-duplicate posts there are combined here. Add a post by appending to `posts`.
import { images, type SiteImage } from "./images";

/** One piece of an article body, rendered in order. */
export type Block = { h2: string } | { p: string } | { list: string[] };

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: SiteImage;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "business-travel-chauffeur",
    title: "Make every business trip count with a chauffeur",
    category: "Corporate travel",
    excerpt:
      "In business the details add up, and how you arrive is one of them. Here is what a chauffeur adds to a working day on the road.",
    image: images.services.corporate,
    body: [
      {
        p: "In business, every detail adds up, and how you arrive is one of them. Stepping out of a clean black car at a meeting, a conference or a client dinner sets the tone before you say a word. It tells people you take the day seriously.",
      },
      { h2: "A car that works as hard as you do" },
      {
        p: "Our fleet runs from executive sedans to roomy vans, each kept immaculate and quiet inside. That makes the drive useful time: go over your presentation, take a call in private, or simply rest between meetings so you arrive fresh.",
      },
      { h2: "On time, without the stress" },
      {
        p: "Your time is the one thing a business trip cannot waste. Our chauffeurs know the roads, plan the route ahead and leave room for traffic, so you reach every appointment on schedule and can put your attention on the work instead of the journey.",
      },
      { h2: "Built around your itinerary" },
      {
        p: "Tell us how your day runs and we plan the rides around it. We handle:",
      },
      {
        list: [
          "Airport transfers at either end of the trip",
          "Multi-stop days with a chauffeur who waits between meetings",
          "Client pickups, so your guests arrive as well looked after as you do",
          "Regular weekly rides, with package rates for clients who pre-book",
        ],
      },
      { h2: "Book your next trip" },
      {
        p: "A chauffeured car is more than a ride from A to B. It is comfort, reliability and a professional first impression, every time. Book your next business trip online, or call us and we will plan it with you.",
      },
    ],
  },
  {
    slug: "airport-limousine-service",
    title: "Airport transfers without the rush",
    category: "Airport transfers",
    excerpt:
      "Flights run to the minute, so your ride to and from the airport should too. How we take the stress out of the airport run.",
    image: images.services.airport,
    body: [
      {
        p: "Airports are where trips go wrong: a late taxi, a crowded kerb, a long wait at arrivals after a long flight. A chauffeured transfer takes all of that off your hands, in both directions.",
      },
      { h2: "To the airport on time" },
      {
        p: "We plan your pickup around your flight, not the other way round. Your chauffeur arrives early, loads your luggage and takes the best route of the day, so you reach the terminal with time to spare for check-in and security.",
      },
      { h2: "Collected the moment you land" },
      {
        p: "When you fly in, your chauffeur is already waiting. Add your flight number when you book so we know when to expect you, and the first 20 minutes of waiting at arrivals are free.",
      },
      { h2: "Every logistic handled" },
      {
        list: [
          "Help with luggage from the kerb to the car and back",
          "Commercial and private airports, for travellers, pilots and jet passengers",
          "Reminders and notifications before every pre-booked transfer",
          "Sedans for one or two, SUVs and vans for families and groups",
        ],
      },
      {
        p: "Booking an airport transfer with us means choosing reliability, comfort and a calm start or end to your trip. Reserve your next transfer online, or call us if your flight is today.",
      },
    ],
  },
  {
    slug: "black-car-service",
    title: "Why choose a black car service",
    category: "Black car service",
    excerpt:
      "Elegant, dependable and personal. What sets a professional black car service apart from an ordinary ride.",
    image: images.services.point,
    body: [
      {
        p: "Choosing the right car service is the difference between a ride you endure and one you enjoy. A black car service brings together three things: elegance, dependability and service that is built around you.",
      },
      { h2: "A fleet that looks the part" },
      {
        p: "Our all-black fleet runs from sleek sedans to spacious SUVs. Every vehicle is maintained to a high standard and cleaned daily, with comfortable modern interiors that make any trip feel considered.",
      },
      { h2: "Chauffeurs, not just drivers" },
      {
        p: "Our chauffeurs are carefully selected, trained and experienced. They know the area well, drive smoothly and put your comfort and safety first from pickup to drop-off.",
      },
      { h2: "Punctual by habit" },
      {
        p: "We know what your time is worth. Your chauffeur arrives ahead of schedule, picks the most efficient route and keeps you informed, so you can plan your day with confidence.",
      },
      { h2: "Shaped around your requests" },
      {
        p: "Whether it is corporate travel, an airport transfer or a special occasion, tell us what you need. We do our best to accommodate particular requests, from a quiet ride to a specific vehicle.",
      },
      {
        p: "A black car service is more than transportation. It is a seamless, reliable experience that goes beyond what you expect. Book your ride and see the difference.",
      },
    ],
  },
  {
    slug: "st-louis-limousine-service",
    title: "Limousine service for St. Louis professionals",
    category: "St. Louis",
    excerpt:
      "From downtown meetings to evening events, a local chauffeur team that knows Greater St. Louis and arrives on time.",
    image: images.hero,
    body: [
      {
        p: "Based in St. Charles, we drive professionals and business owners across Greater St. Louis every day. If you value doing things properly, our limousine service is built for you.",
      },
      { h2: "Comfort in every detail" },
      {
        p: "Our vehicles are carefully maintained and finished for comfort, with leather seating and a calm, quiet cabin. Every detail is chosen to make the ride as pleasant as the destination.",
      },
      { h2: "Chauffeurs who know the city" },
      {
        p: "Our chauffeurs know St. Louis, its traffic and its shortcuts. They take care of the details so you can sit back, and they focus on one thing: getting you there comfortably.",
      },
      { h2: "Wherever the day takes you" },
      {
        list: [
          "Business meetings downtown and across the metro area",
          "Special events, dinners and nights out",
          "Flights from STL and the airports beyond it",
          "Regular commutes, with package rates for weekly bookings",
        ],
      },
      {
        p: "We tailor every booking to what you need and make punctuality the rule, every time. Book today and see why clients across St. Louis ride with us.",
      },
    ],
  },
  {
    slug: "party-vehicle-events",
    title: "Host an unforgettable event on the move",
    category: "Events",
    excerpt:
      "Birthdays, weddings, team nights and holidays: when the ride is part of the party, your guests remember it.",
    image: images.fleet.van,
    body: [
      {
        p: "Some occasions deserve more than a car to the venue. With a party vehicle the journey becomes part of the celebration, and your guests travel together from the first stop to the last.",
      },
      { h2: "Made for celebrations" },
      {
        p: "Birthdays, weddings, corporate gatherings and holiday parties all work well on wheels. Comfortable seating and good sound set the mood, and everyone arrives together and on time.",
      },
      { h2: "Safe from start to finish" },
      {
        p: "Safety comes first. Our vehicles are mechanically inspected on a regular schedule, and our experienced chauffeurs drive smoothly so your guests can relax and enjoy the evening.",
      },
      { h2: "Simple to book" },
      {
        p: "Tell us about your event and we handle the logistics. To quote, we need:",
      },
      {
        list: [
          "The date and how long you need the vehicle",
          "The number of guests",
          "Pickup, drop-off and any stops along the way",
          "Any special requests for the occasion",
        ],
      },
      {
        p: "Book party vehicles at least 72 hours ahead so we can plan your itinerary properly. Do not settle for an ordinary ride; contact us and we will make it an occasion your guests remember.",
      },
    ],
  },
  {
    slug: "wedding-prom-limousine",
    title: "Elegance for weddings, proms and big nights",
    category: "Special occasions",
    excerpt:
      "Leather seating, soft light and a chauffeur at the door. How we make a special occasion feel special from the moment you step in.",
    image: images.cabin,
    body: [
      {
        p: "For the days that matter most, how you travel is part of the memory. A chauffeured car brings calm and a sense of occasion to weddings, proms, anniversaries and formal evenings.",
      },
      { h2: "Comfort with a refined finish" },
      {
        p: "Step into plush leather seating and soft ambient lighting. Our vehicles are meticulously kept, and every detail of the cabin is chosen so the ride feels first class.",
      },
      { h2: "Looked after at every step" },
      {
        p: "Your chauffeur opens the door, takes care of bags and dresses, and makes sure everyone is settled before the car moves. On a day with a tight schedule, we arrive promptly so photos, ceremonies and dinners start on time.",
      },
      { h2: "Privacy when you want it" },
      {
        p: "Many of our vehicles have privacy screens, so you can share a quiet moment, have a private conversation or simply enjoy the ride undisturbed.",
      },
      { h2: "Tailored to your day" },
      {
        list: ["Weddings, for the couple, family and guests", "Proms and formal dances", "Corporate events and galas", "Airport transfers for visiting family"],
      },
      {
        p: "Tell us about your occasion and we tailor the booking to it. Reserve your ride and arrive in style.",
      },
    ],
  },
  {
    slug: "luxury-and-safety",
    title: "Luxury and safety, in the same ride",
    category: "Our standards",
    excerpt:
      "Comfort should never come at the cost of peace of mind. The standards behind every One World ride.",
    image: images.fleet.suv,
    body: [
      {
        p: "A luxury ride should feel effortless, and that only happens when you also feel safe. At One World Limousine, comfort and safety are the same commitment.",
      },
      { h2: "Luxury you can feel" },
      {
        p: "Our fleet is made up of carefully maintained, high-end vehicles with plush interiors and up-to-date technology that makes every trip more comfortable.",
      },
      { h2: "Safety as the first priority" },
      {
        p: "Every chauffeur is experienced and trained to a high standard. Vehicles are mechanically inspected on a regular schedule and disinfected daily, so you can relax and trust the ride from start to finish.",
      },
      { h2: "Reliable every time" },
      {
        p: "Busy professionals heading to important meetings and business owners looking after their clients rely on us to be on time. We plan ahead so you get there when you need to, every time.",
      },
      { h2: "Personal by design" },
      {
        p: "Each trip is different, so we tailor the service to yours: an airport transfer, a corporate event or a night out. Book your ride and see the difference for yourself.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Reading time in minutes, at about 200 words a minute. */
export function readMinutes(post: Post) {
  const text = post.body.map((b) => ("list" in b ? b.list.join(" ") : "h2" in b ? b.h2 : b.p)).join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
