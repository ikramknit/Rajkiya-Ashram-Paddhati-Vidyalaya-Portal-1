import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { UI_LABELS } from '../constants';
import type { Language, YearResult } from '../types';

interface ResultChartProps {
  lang: Language;
  results: YearResult[];
}

const ResultChart: React.FC<ResultChartProps> = ({ lang, results }) => {
  const data = results.map((r) => ({
    name: r.year.replace('20', "'"), // Shorten year label
    Class10: r.class10.passPercentage === 'NA' ? 0 : Number(r.class10.passPercentage),
    Class12: r.class12.passPercentage === 'NA' ? 0 : Number(r.class12.passPercentage),
  }));

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">{UI_LABELS.passTrend[lang]} (2012-2024)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis domain={[0, 100]} stroke="#6b7280" unit="%" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            formatter={(value: number) => [`${value}%`, UI_LABELS.rate[lang]]}
          />
          <Legend verticalAlign="top" height={36}/>
          <Line type="monotone" dataKey="Class10" name="Class 10" stroke="#ea580c" strokeWidth={3} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Class12" name="Class 12" stroke="#15803d" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;