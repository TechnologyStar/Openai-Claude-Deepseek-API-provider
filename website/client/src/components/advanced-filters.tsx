import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, RefreshCw, Bookmark, TrendingUp } from "lucide-react";

interface AdvancedFiltersProps {
  providers: any[];
  onFiltersChange: (filteredProviders: any[]) => void;
}

export function AdvancedFilters({ providers, onFiltersChange }: AdvancedFiltersProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    tags: new Set<string>(),
    pricing: 'all', // all, free, freemium, paid
    models: new Set<string>(),
    features: new Set<string>(),
    verification: 'all', // all, verified, unverified
    sortBy: 'recommended' // recommended, name, newest
  });

  const tagOptions = [
    { value: '🆓', label: '完全免费', color: 'bg-green-100 text-green-800' },
    { value: '🔓', label: '有免费额度', color: 'bg-blue-100 text-blue-800' },
    { value: '💰', label: '需要充值', color: 'bg-yellow-100 text-yellow-800' },
    { value: '💪', label: 'Claude支持', color: 'bg-red-100 text-red-800' },
    { value: '✌', label: 'OpenAI支持', color: 'bg-blue-100 text-blue-800' },
    { value: '🎉', label: '其他模型', color: 'bg-purple-100 text-purple-800' },
    { value: '🌎', label: '需要国际网络', color: 'bg-cyan-100 text-cyan-800' },
    { value: '🎁', label: '充值优惠', color: 'bg-pink-100 text-pink-800' },
    { value: '🚀', label: '高并发', color: 'bg-orange-100 text-orange-800' },
    { value: '😆', label: '每日签到', color: 'bg-yellow-100 text-yellow-800' },
    { value: '🚩', label: '已备案', color: 'bg-green-100 text-green-800' },
    { value: '✔', label: '已验证', color: 'bg-gray-100 text-gray-800' }
  ];

  const applyFilters = () => {
    let filtered = [...providers];

    // 标签过滤
    if (filters.tags.size > 0) {
      filtered = filtered.filter(provider => 
        Array.from(filters.tags).some(tag => provider.tags.includes(tag))
      );
    }

    // 定价模式过滤
    if (filters.pricing !== 'all') {
      switch (filters.pricing) {
        case 'free':
          filtered = filtered.filter(provider => provider.tags.includes('🆓'));
          break;
        case 'freemium':
          filtered = filtered.filter(provider => provider.tags.includes('🔓'));
          break;
        case 'paid':
          filtered = filtered.filter(provider => provider.tags.includes('💰'));
          break;
      }
    }

    // 模型支持过滤
    if (filters.models.size > 0) {
      filtered = filtered.filter(provider => {
        if (filters.models.has('openai') && !provider.tags.includes('✌')) return false;
        if (filters.models.has('claude') && !provider.tags.includes('💪')) return false;
        if (filters.models.has('other') && !provider.tags.includes('🎉')) return false;
        return true;
      });
    }

    // 功能特性过滤
    if (filters.features.size > 0) {
      filtered = filtered.filter(provider => {
        if (filters.features.has('highConcurrency') && !provider.tags.includes('🚀')) return false;
        if (filters.features.has('dailyCheckin') && !provider.tags.includes('😆')) return false;
        if (filters.features.has('bonus') && !provider.tags.includes('🎁')) return false;
        return true;
      });
    }

    // 验证状态过滤
    if (filters.verification !== 'all') {
      switch (filters.verification) {
        case 'verified':
          filtered = filtered.filter(provider => 
            provider.tags.includes('✔') || provider.tags.includes('🚩')
          );
          break;
        case 'unverified':
          filtered = filtered.filter(provider => 
            !provider.tags.includes('✔') && !provider.tags.includes('🚩')
          );
          break;
      }
    }

    // 排序
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.displayName.localeCompare(b.displayName));
        break;
      case 'newest':
        filtered.sort((a, b) => b.sortOrder - a.sortOrder);
        break;
      case 'recommended':
      default:
        filtered.sort((a, b) => {
          if (a.isRecommended && !b.isRecommended) return -1;
          if (!a.isRecommended && b.isRecommended) return 1;
          return a.sortOrder - b.sortOrder;
        });
        break;
    }

    onFiltersChange(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, providers]);

  const handleTagToggle = (tag: string, checked: boolean) => {
    const newTags = new Set(filters.tags);
    if (checked) {
      newTags.add(tag);
    } else {
      newTags.delete(tag);
    }
    setFilters(prev => ({ ...prev, tags: newTags }));
  };

  const handleModelToggle = (model: string, checked: boolean) => {
    const newModels = new Set(filters.models);
    if (checked) {
      newModels.add(model);
    } else {
      newModels.delete(model);
    }
    setFilters(prev => ({ ...prev, models: newModels }));
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    const newFeatures = new Set(filters.features);
    if (checked) {
      newFeatures.add(feature);
    } else {
      newFeatures.delete(feature);
    }
    setFilters(prev => ({ ...prev, features: newFeatures }));
  };

  const resetFilters = () => {
    setFilters({
      tags: new Set(),
      pricing: 'all',
      models: new Set(),
      features: new Set(),
      verification: 'all',
      sortBy: 'recommended'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.tags.size > 0) count++;
    if (filters.pricing !== 'all') count++;
    if (filters.models.size > 0) count++;
    if (filters.features.size > 0) count++;
    if (filters.verification !== 'all') count++;
    return count;
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            高级筛选
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} 个筛选条件
              </Badge>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重置
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 功能标签筛选 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">功能标签</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tagOptions.map(({ value, label, color }) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.tags.has(value)}
                  onCheckedChange={(checked) => handleTagToggle(value, checked as boolean)}
                />
                <Badge className={`text-xs ${color}`}>
                  {value} {label}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 定价模式 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">定价模式</h4>
          <Select value={filters.pricing} onValueChange={(value) => 
            setFilters(prev => ({ ...prev, pricing: value }))
          }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择定价模式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="free">完全免费</SelectItem>
              <SelectItem value="freemium">有免费额度</SelectItem>
              <SelectItem value="paid">付费服务</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 模型支持 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">模型支持</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.models.has('openai')}
                onCheckedChange={(checked) => handleModelToggle('openai', checked as boolean)}
              />
              <span className="text-sm">OpenAI 模型</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.models.has('claude')}
                onCheckedChange={(checked) => handleModelToggle('claude', checked as boolean)}
              />
              <span className="text-sm">Claude 模型</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.models.has('other')}
                onCheckedChange={(checked) => handleModelToggle('other', checked as boolean)}
              />
              <span className="text-sm">其他模型</span>
            </div>
          </div>
        </div>

        {/* 特殊功能 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">特殊功能</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.features.has('highConcurrency')}
                onCheckedChange={(checked) => handleFeatureToggle('highConcurrency', checked as boolean)}
              />
              <span className="text-sm">高并发支持</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.features.has('dailyCheckin')}
                onCheckedChange={(checked) => handleFeatureToggle('dailyCheckin', checked as boolean)}
              />
              <span className="text-sm">每日签到</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.features.has('bonus')}
                onCheckedChange={(checked) => handleFeatureToggle('bonus', checked as boolean)}
              />
              <span className="text-sm">充值优惠</span>
            </div>
          </div>
        </div>

        {/* 验证状态和排序 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">验证状态</h4>
            <Select value={filters.verification} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, verification: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="选择验证状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="verified">已验证</SelectItem>
                <SelectItem value="unverified">未验证</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">排序方式</h4>
            <Select value={filters.sortBy} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, sortBy: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="选择排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">
                  <div className="flex items-center">
                    <Bookmark className="w-4 h-4 mr-2" />
                    推荐优先
                  </div>
                </SelectItem>
                <SelectItem value="name">按名称排序</SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    最新添加
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}