import type { StoreLocationsProps } from './store-locations';

export const sample: StoreLocationsProps = {
  title: 'Våra butiker',
  text: 'Hämta din order, lämna in maskinen eller kom in och prata.',
  locations: [
    { name: 'Uppsala', address: ['Storgatan 12', '753 20 Uppsala'], phone: '018-12 34 56', email: 'uppsala@exempel.se', hours: ['Mån till fre 8 till 17', 'Lör 10 till 14'], mapHref: 'https://maps.google.com/?q=Storgatan+12+Uppsala' },
    { name: 'Västerås', address: ['Hamngatan 3', '722 10 Västerås'], phone: '021-12 34 56', hours: ['Mån till fre 9 till 17', 'Lör stängt'], note: 'Stängt midsommarafton.', mapHref: 'https://maps.google.com/?q=Hamngatan+3+Västerås' },
    { name: 'Lager och verkstad', address: ['Industrivägen 8', '754 50 Uppsala'], phone: '018-12 34 57', hours: ['Mån till fre 7 till 16'] },
  ],
  columns: 3,
};
