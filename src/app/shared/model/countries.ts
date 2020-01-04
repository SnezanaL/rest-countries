export class Countries {
  id: string;
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
  subregion: string;
  topLevelDomain: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  };
  language: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  };
  borders: [];
}
