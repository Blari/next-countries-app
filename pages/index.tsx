import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Country {
  name: string;
  flag: string;
  currencies: Currency[];
}

interface Props {
  countriesData: Country[];
}

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('https://restcountries.com/v2/all');
  if (!response.ok) {
    throw new Error('Problem fetching data');
  }
  const data: any[] = await response.json();
  return data.filter(
      (country) => country.currencies && country.currencies[0] && country.currencies[0].code
  );
};

const Home: React.FC<Props> = () => {
  const [activeCurrencies, setActiveCurrencies] = useState<{ [key: string]: boolean }>({});

  const { data: countriesData, isError, isLoading } = useQuery<Country[], Error>('countries', fetchCountries);

  useEffect(() => {
    // Загрузка состояния активных валют из localStorage при инициализации
    const saved = localStorage.getItem('activeCurrencies');
    if (saved) {
      setActiveCurrencies(JSON.parse(saved));
    }
  }, []);

  const handleCurrencyChange = (countryFlag: string, currencyCode: string): void => {
    setActiveCurrencies(prev => {
      const key = `${countryFlag}-${currencyCode}`;
      const newState = { ...prev, [key]: !prev[key] };
      localStorage.setItem('activeCurrencies', JSON.stringify(newState));
      return newState;
    });
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Country and Currency List
        </h1>
        {isLoading && (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
            </div>
        )}
        {isError && (
          <div className="text-center text-red-500">
            An error occurred while fetching the data...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countriesData?.map((country, index) => (
              <div
                  key={country.flag}
                  className="p-4 rounded shadow bg-white dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                        src={country.flag}
                        alt={`Flag of ${country.name}`}
                        className="w-8 h-5 mr-2"
                    />
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <label className="switch">
                    <input
                        type="checkbox"
                        checked={activeCurrencies[`${country.flag}-${country.currencies[0].code}`] || false}
                        onChange={() => handleCurrencyChange(country.flag, country.currencies[0].code)}
                        className="checked:bg-blue-500"
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  Currency code: {country.currencies[0].code}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Home;