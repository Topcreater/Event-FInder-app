// eventTypes.ts

export interface Image {
    fallback: boolean;
    height: number;
    ratio: string;
    url: string;
    width: number;
  }
  
  export interface Classification {
    family: boolean;
    genre: any[];
    primary: boolean;
    segment: any[];
    subGenre: any[];
    subType: any[];
    type: any[];
  }
  
  export interface DateStatus {
    code: string;
  }
  
  export interface StartDate {
    dateTBA: boolean;
    dateTBD: boolean;
    dateTime: string;
    localDate: string;
    localTime: string;
    noSpecificTime: boolean;
    timeTBA: boolean;
  }
  
  export interface Dates {
    spanMultipleDays: boolean;
    start: StartDate;
    status: DateStatus;
    timezone: string;
  }
  
  export interface Accessibility {
    ticketLimit: number;
  }
  
  export interface AgeRestrictions {
    legalAgeEnforced: boolean;
  }
  
  export interface Venue {
    address: {
      line1: string;
    };
    city?: {
      name: string;
    };
    state?: {
      name: string;
    };
    country?: {
      name: string;
    };
    location?: {
        latitude: any;
        longitude:any;
      };
      name?: string
  }
  
  export interface Embedded {
    attractions: any[][];
    venues: Venue[]; // Updated to include venues
  }
  
  export interface Links {
    attractions: any[][];
    self: {
      href: string;
    };
    venues: any[][];
  }
  
  export interface PriceRange {
    currency: string;
    max: number;
    min: number;
    type: string;
  }
  
  export interface Product {
    classifications: Classification[];
    id: string;
    name: string;
    type: string;
    url: string;
  }
  
  export interface Promoter {
    description: string;
    id: string;
    name: string;
  }
  
  export interface Sale {
    presales: any[][];
    public: {
      endDateTime: string;
      startDateTime: string;
      startTBA: boolean;
      startTBD: boolean;
    };
  }
  
  export interface Seatmap {
    staticUrl: string;
  }
  
  export interface TicketLimit {
    info: string;
  }
  
  export interface AllInclusivePricing {
    enabled: boolean;
  }
  
  export interface SafeTix {
    enabled: boolean;
  }
  
  export interface Ticketing {
    allInclusivePricing: AllInclusivePricing;
    safeTix: SafeTix;
  }
  
  export interface EventDetails {
    _embedded: Embedded;
    _links: Links;
    accessibility: Accessibility;
    ageRestrictions: AgeRestrictions;
    classifications: Classification[];
    dates: Dates;
    id: string;
    images: Image[];
    info: string;
    locale: string;
    name: string;
    pleaseNote: string;
    priceRanges: PriceRange[];
    products: Product[];
    promoter: Promoter;
    promoters: Promoter[];
    sales: Sale;
    seatmap: Seatmap;
    test: boolean;
    ticketLimit: TicketLimit;
    ticketing: Ticketing;
    type: string;
    url: string;
  }
  