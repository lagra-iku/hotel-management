import { useEffect, useState } from "react";

export default function CountrySelect() {
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("https://api.first.org/data/v1/countries")
      .then((res) => res.json())
      .then((data) => {
        // Convert the object to an array for easy mapping
        const formatted = Object.entries(data.data).map(([code, info]: any) => ({
          code,
          name: info.country,
        }));
        setCountries(formatted);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="space-y-2">
      <label htmlFor="country" className="block font-semibold text-gray-700">
        Select Country
      </label>

      <select
        id="country"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tealGreen bg-ivory"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">-- Choose Country --</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <p className="text-gray-600 text-sm">
          You selected: <span className="font-medium">{selectedCountry}</span>
        </p>
      )}
    </div>
  );
}
