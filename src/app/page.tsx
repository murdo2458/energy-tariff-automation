'use client';
import { useEffect, useState } from 'react';
import { TariffResponse } from '@/app/types/tariff';

//src/app/types/tariff.ts

export default function Home() {
  const [tariffData, setTariffData] = useState<TariffResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTariff = async () => {
      try {
        const response = await fetch('/api/tariff');

        if (!response.ok) {
          throw new Error('Failed to fetch tariff data');
        }

        const data = await response.json();
        setTariffData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTariff();
    const interval = setInterval(fetchTariff, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-4">Loading tariff data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Current Tariff Rates</h1>
      <div className="grid gap-4">
        {tariffData?.results.map((rate, index) => (
          <div key={index} className="border p-4 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold">Price (inc. VAT)</p>
                <p>{(rate.value_inc_vat).toFixed(2)}p/kWh</p>
              </div>
              <div>
                <p className="font-semibold">Price (exc. VAT)</p>
                <p>{(rate.value_exc_vat).toFixed(2)}p/kWh</p>
              </div>
              <div>
                <p className="font-semibold">Valid From</p>
                <p>{new Date(rate.valid_from).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Valid To</p>
                <p>{new Date(rate.valid_to).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
