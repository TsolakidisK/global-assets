import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Home,
  Coins,
  Bitcoin,
  Gem,
  Wheat,
  Building2,
  PieChart,
  Search,
  Filter
} from 'lucide-react';

interface AssetClass {
  id: string;
  name: string;
  value: number; // in trillions
  color: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

const assetClasses: AssetClass[] = [
  {
    id: 'real-estate',
    name: 'Global Real Estate',
    value: 280,
    color: 'from-emerald-600 to-emerald-800',
    icon: <Home className="w-6 h-6" />,
    description: 'Residential and commercial properties worldwide',
    category: 'Real Assets'
  },
  {
    id: 'bonds',
    name: 'Global Bonds',
    value: 130,
    color: 'from-blue-600 to-blue-800',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Government and corporate debt securities',
    category: 'Fixed Income'
  },
  {
    id: 'stocks',
    name: 'Global Stocks',
    value: 100,
    color: 'from-purple-600 to-purple-800',
    icon: <PieChart className="w-6 h-6" />,
    description: 'Public equity markets worldwide',
    category: 'Equity'
  },
  {
    id: 'commodities',
    name: 'Commodities',
    value: 20,
    color: 'from-orange-600 to-orange-800',
    icon: <Wheat className="w-6 h-6" />,
    description: 'Oil, metals, agricultural products',
    category: 'Commodities'
  },
  {
    id: 'gold',
    name: 'Gold',
    value: 12,
    color: 'from-yellow-500 to-yellow-700',
    icon: <Gem className="w-6 h-6" />,
    description: 'Physical gold reserves and ETFs',
    category: 'Precious Metals'
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    value: 10,
    color: 'from-slate-600 to-slate-800',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Private investment funds',
    category: 'Alternative'
  },
  {
    id: 'hedge-funds',
    name: 'Hedge Funds',
    value: 4,
    color: 'from-red-600 to-red-800',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Alternative investment vehicles',
    category: 'Alternative'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    value: 3.2,
    color: 'from-cyan-600 to-cyan-800',
    icon: <Bitcoin className="w-6 h-6" />,
    description: 'Digital currencies and tokens',
    category: 'Digital Assets'
  }
];

function App() {
  const [selectedAsset, setSelectedAsset] = useState<AssetClass | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(assetClasses.map(asset => asset.category))];
    return cats;
  }, []);

  const filteredAssets = useMemo(() => {
    return assetClasses.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const formatValue = (value: number) => {
    return `$${value.toLocaleString()}T`;
  };

  const getSquareCount = (value: number) => {
    return Math.round(value * 10); // Each square = $100B, so multiply by 10
  };

  const renderSquares = (count: number, color: string) => {
    const squares = [];
    const maxSquaresPerRow = 20;

    for (let i = 0; i < count; i++) {
      squares.push(
        <div
          key={i}
          className={`w-4 h-4 bg-gradient-to-br ${color} rounded-sm shadow-sm hover:scale-110 transition-transform duration-200`}
        />
      );
    }

    return (
      <div className="grid grid-cols-20 gap-1 max-w-full overflow-hidden">
        {squares}
      </div>
    );
  };

  const totalValue = assetClasses.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Global Asset Classes
              </h1>
              <p className="text-slate-300">
                Each square represents $100 billion • Total: {formatValue(totalValue)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${asset.color} shadow-lg`}>
                    {asset.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {asset.name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-1">
                      {asset.category}
                    </p>
                    <p className="text-slate-300 text-sm">
                      {asset.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatValue(asset.value)}
                  </div>
                  <div className="text-sm text-slate-400">
                    {getSquareCount(asset.value).toLocaleString()} squares
                  </div>
                </div>
              </div>

              {/* Visualization */}
              <div className="mt-6 p-4 bg-black/20 rounded-xl">
                <div className="flex flex-wrap gap-1">
                  {[...Array(getSquareCount(asset.value))].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 bg-gradient-to-br ${asset.color} rounded-sm shadow-sm hover:scale-125 transition-transform duration-200 hover:shadow-lg`}
                      title={`$100B (${i + 1}/${getSquareCount(asset.value)})`}
                    />
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedAsset?.id === asset.id && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-1">
                        Total Value
                      </h4>
                      <p className="text-lg font-semibold text-white">
                        ${(asset.value * 1000).toLocaleString()} Billion
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-1">
                        Percentage of Total
                      </h4>
                      <p className="text-lg font-semibold text-white">
                        {((asset.value / totalValue) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-1">
                        Squares Count
                      </h4>
                      <p className="text-lg font-semibold text-white">
                        {getSquareCount(asset.value).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">
              No assets found
            </div>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-slate-400 text-sm">
              Data represents approximate global asset values as of 2024
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-sm"></div>
              <span>= $100 Billion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;