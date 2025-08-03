"use client";

import { useEffect, useState } from "react";

// 1. --- TYPE DEFINITION ---
// Defines the shape of a single Surah object for type safety.
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}


// 3. --- INDIVIDUAL SURAH CARD COMPONENT ---
// This component is responsible for displaying a single Surah's details.
// It receives a 'surah' object as a prop.
const SurahCard = ({ surah }: { surah: Surah }) => {
  return (
    <li className="list-none">
        <a href={`/surah/${surah.number}`} className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
                {/* Surah Number and English Name */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-gray-700 rounded-full font-bold text-lg">
                        {surah.number}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{surah.englishName}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{surah.englishNameTranslation}</p>
                    </div>
                </div>

                {/* Arabic Name */}
                <div className="text-right">
                     <h3 className="text-2xl font-serif text-gray-900 dark:text-gray-100" dir="rtl">{surah.name}</h3>
                </div>
            </div>

            {/* Divider and Additional Info */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                    <span>{surah.numberOfAyahs} Ayahs</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span>{surah.revelationType}</span>
                </div>
            </div>
        </a>
    </li>
  );
};


// 4. --- MAIN SURAH LIST COMPONENT ---
// This component maps over the list of surahs and renders a SurahCard for each one.
const SurahList = ({ surahs }: { surahs: Surah[] }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          The Holy Quran
        </h1>
        <ul className="grid grid-cols-1 gap-6">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </ul>
      </div>
    </div>
  );
};


// 5. --- APP ENTRY POINT ---
// This is the main component that would be rendered in your Next.js page.
// It fetches the data (or uses the mock data) and passes it to the SurahList.
export default function SurahComponent() {
  // In a real app, you'd use useEffect and useState to fetch data from your API endpoint.
  // For example:
  const [surahs, setSurahs] = useState<Surah[]>([]);
  useEffect(() => {
    fetch('http://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  return <SurahList surahs={surahs} />;
}
