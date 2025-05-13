"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Coin } from "../types/coin";
import axios from "axios";



const api_url = process.env.NEXT_PUBLIC_COINGECKO_API_URL
const key = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
const coins = [
  "bitcoin",
  "ethereum",
  "solana",
  "dogecoin",
  "polygon-ecosystem-token",
];

const CoinsComponent = () => {
  const { data, isLoading, error } = useQuery<Coin[]>({
    queryKey: ["coinsData"],
    queryFn: async () => {
      try {
        const api = axios.create({
          baseURL: api_url,
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            "x-cg-demo-api-key": key,
          },
        });

        const response = await api.get<Coin[]>("/coins/markets", {
          params: {
            vs_currency: "usd",
            ids: coins.join(","),
          },
        });

        console.log(response)
        return response.data;
      } catch (error) {
        console.error("Error Fetching Coins Data", error);
        throw error;
      }
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-blue-500">Loading crypto data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading crypto data: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Crypto Price Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((coin: Coin) => (
          <div
            key={coin.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="font-bold text-lg text-black">{coin.name}</h2>
                <p className="text-black">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-black font-bold">
                ${coin.current_price.toLocaleString()}
              </p>
              <div
                className={`mt-2 flex items-center ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span className="text-lg font-medium">
                  {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
                <span className="text-sm ml-1 text-gray-500">(24h)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500 flex items-center justify-between">
        <span>Data from CoinGecko API</span>
        <span>Auto-refreshes every 30 seconds</span>
      </div>
    </div>
  );
};

export default CoinsComponent;