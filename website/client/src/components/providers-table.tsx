import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AdvancedFilters } from "@/components/advanced-filters";
import { Search, Copy, Heart, ExternalLink, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import type { ApiProvider } from "@shared/schema";

const tagColors: Record<string, string> = {
  "🆓": "bg-green-100 text-green-800",
  "🔓": "bg-green-100 text-green-800",
  "💰": "bg-yellow-100 text-yellow-800",
  "💪": "bg-red-100 text-red-800",
  "✌": "bg-blue-100 text-blue-800",
  "🎉": "bg-indigo-100 text-indigo-800",
  "🌎": "bg-cyan-100 text-cyan-800",
  "🎁": "bg-purple-100 text-purple-800",
  "🚀": "bg-orange-100 text-orange-800",
  "😆": "bg-yellow-100 text-yellow-800",
  "🚩": "bg-green-100 text-green-800",
  "✔": "bg-gray-100 text-gray-800",
  "🌹": "bg-pink-100 text-pink-800"
};

export function ProvidersTable() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filteredByAdvanced, setFilteredByAdvanced] = useState<ApiProvider[]>([]);

  const { data: providers = [], isLoading } = useQuery<ApiProvider[]>({
    queryKey: ['/api/providers']
  });

  const filteredProviders = useMemo(() => {
    const baseProviders = showAdvancedFilters ? filteredByAdvanced : providers;
    
    return baseProviders.filter(provider => {
      const matchesSearch = searchTerm === '' || 
        provider.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = activeFilter === 'all' ||
        (activeFilter === 'free' && provider.tags.includes('🆓')) ||
        (activeFilter === 'claude' && provider.tags.includes('💪')) ||
        (activeFilter === 'openai' && provider.tags.includes('✌')) ||
        (activeFilter === 'verified' && provider.tags.includes('✔'));

      return matchesSearch && matchesFilter;
    });
  }, [providers, filteredByAdvanced, searchTerm, activeFilter, showAdvancedFilters]);

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t('toast.copied'),
        description: url,
        duration: 3000,
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: t('toast.copied'),
        description: url,
        duration: 3000,
      });
    }
  };

  const handleFavorite = (providerId: number) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(providerId)) {
      newFavorites.delete(providerId);
      toast({
        title: t('toast.favoriteRemoved'),
        duration: 2000,
      });
    } else {
      newFavorites.add(providerId);
      toast({
        title: t('toast.favoriteAdded'),
        duration: 2000,
      });
    }
    setFavorites(newFavorites);
  };

  const filterButtons = [
    { key: 'all', label: t('providers.filter.all') },
    { key: 'free', label: `🆓 ${t('providers.filter.free')}` },
    { key: 'claude', label: `💪 ${t('providers.filter.claude')}` },
    { key: 'openai', label: `✌ ${t('providers.filter.openai')}` },
    { key: 'verified', label: `✔ ${t('providers.filter.verified')}` }
  ];

  if (isLoading) {
    return (
      <section id="providers" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading providers...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="providers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🌐 {t('providers.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('providers.description')}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder={t('providers.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={showAdvancedFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="transition-colors duration-200"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                高级筛选
              </Button>
              {filterButtons.map((button) => (
                <Button
                  key={button.key}
                  variant={activeFilter === button.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(button.key)}
                  className="transition-colors duration-200"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <AdvancedFilters 
            providers={providers} 
            onFiltersChange={setFilteredByAdvanced}
          />
        )}

        {/* API Providers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.index')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.website')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.link')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.tags')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.notes')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProviders.map((provider, index) => (
                  <tr key={provider.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {provider.displayName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        {provider.url.replace(/^https?:\/\//, '')}
                        <ExternalLink size={12} className="ml-1" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {provider.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            className={`text-xs ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      {provider.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyLink(provider.url)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Copy size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFavorite(provider.id)}
                          className={favorites.has(provider.id) 
                            ? "text-red-500 hover:text-red-600" 
                            : "text-gray-400 hover:text-red-500"
                          }
                        >
                          <Heart size={16} fill={favorites.has(provider.id) ? "currentColor" : "none"} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            {filteredProviders.map((provider, index) => (
              <div key={provider.id} className="border-b border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {provider.displayName}
                    </h3>
                    <p className="text-sm text-gray-500">#{index + 1}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyLink(provider.url)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Copy size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavorite(provider.id)}
                      className={favorites.has(provider.id) 
                        ? "text-red-500 hover:text-red-600" 
                        : "text-gray-400 hover:text-red-500"
                      }
                    >
                      <Heart size={16} fill={favorites.has(provider.id) ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    {provider.url.replace(/^https?:\/\//, '')}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {provider.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      className={`text-xs ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {provider.notes && (
                  <p className="text-sm text-gray-600">
                    {provider.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No providers found matching your criteria.</p>
          </div>
        )}

        {/* Load More Button (placeholder for future pagination) */}
        <div className="text-center mt-8">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            <ChevronDown className="mr-2" size={16} />
            {t('providers.loadMore')}
          </Button>
        </div>
      </div>
    </section>
  );
}
