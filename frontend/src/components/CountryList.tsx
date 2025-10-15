import { useEffect, useState } from "react";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);

  useEffect(() => {
    fetch("https://api.first.org/data/v1/countries")
      .then((res) => res.json())
      .then((data) => {
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

      <select
        id="country"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tealGreen bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choose Country --</option>
        {countries.map((c) => (
          <option key={c.code} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {value && (
        <p className="text-gray-600 text-sm">
          You selected: <span className="font-medium">{value}</span>
        </p>
      )}
    </div>
  );
}
