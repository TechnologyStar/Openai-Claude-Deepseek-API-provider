import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { GitCompare, ExternalLink, Plus, Minus, Star } from "lucide-react";
import type { ApiProvider } from "@shared/schema";

export function ProviderComparison() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedProviders, setSelectedProviders] = useState<Set<number>>(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const { data: providers = [], isLoading } = useQuery<ApiProvider[]>({
    queryKey: ['/api/providers']
  });

  const recommendedProviders = useMemo(() => 
    providers.filter(p => p.isRecommended).slice(0, 6),
    [providers]
  );

  const selectedProviderData = useMemo(() => 
    providers.filter(p => selectedProviders.has(p.id)),
    [providers, selectedProviders]
  );

  const handleProviderToggle = (providerId: number, checked: boolean) => {
    const newSelected = new Set(selectedProviders);
    
    if (checked) {
      if (newSelected.size >= 4) {
        toast({
          title: "最多只能选择4个提供商进行比较",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      newSelected.add(providerId);
    } else {
      newSelected.delete(providerId);
    }
    
    setSelectedProviders(newSelected);
  };

  const clearSelection = () => {
    setSelectedProviders(new Set());
    setShowComparison(false);
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      "🆓": "bg-green-100 text-green-800",
      "🔓": "bg-blue-100 text-blue-800",
      "💰": "bg-yellow-100 text-yellow-800",
      "💪": "bg-red-100 text-red-800",
      "✌": "bg-blue-100 text-blue-800",
      "🎉": "bg-purple-100 text-purple-800",
      "🌎": "bg-cyan-100 text-cyan-800",
      "🎁": "bg-pink-100 text-pink-800",
      "🚀": "bg-orange-100 text-orange-800",
      "😆": "bg-yellow-100 text-yellow-800",
      "🚩": "bg-green-100 text-green-800",
      "✔": "bg-gray-100 text-gray-800",
      "🌹": "bg-pink-100 text-pink-800"
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <GitCompare className="inline w-8 h-8 mr-2" />
            提供商对比分析
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            选择最多4个API提供商进行详细对比，帮助您做出最佳选择
          </p>
        </div>

        {/* 选择控制面板 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                选择提供商进行比较
              </h3>
              <p className="text-sm text-gray-600">
                已选择 {selectedProviders.size}/4 个提供商
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={selectedProviders.size === 0}
              >
                <Minus className="w-4 h-4 mr-2" />
                清空选择
              </Button>
              <Button
                onClick={() => setShowComparison(!showComparison)}
                disabled={selectedProviders.size < 2}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                {showComparison ? "隐藏对比" : "开始对比"}
              </Button>
            </div>
          </div>
        </div>

        {/* 推荐提供商快选 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">推荐提供商</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedProviders.has(provider.id)}
                        onCheckedChange={(checked) => 
                          handleProviderToggle(provider.id, checked as boolean)
                        }
                      />
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      推荐
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{provider.displayName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      {provider.url.replace(/^https?:\/\//, '')}
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                    
                    <div className="flex flex-wrap gap-1">
                      {provider.tags.map((tag, index) => (
                        <Badge key={index} className={`text-xs ${getTagColor(tag)}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {provider.notes && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {provider.notes}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 详细对比表 */}
        {showComparison && selectedProviderData.length >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitCompare className="w-5 h-5 mr-2" />
                详细对比分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">
                        对比项目
                      </th>
                      {selectedProviderData.map((provider) => (
                        <th key={provider.id} className="text-left py-3 px-4 font-semibold text-gray-900">
                          {provider.displayName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-700">网站链接</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          <a
                            href={provider.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            访问
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-700">功能标签</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {provider.tags.map((tag, index) => (
                              <Badge key={index} className={`text-xs ${getTagColor(tag)}`}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-700">免费额度</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          {provider.tags.includes('🆓') ? (
                            <Badge className="bg-green-100 text-green-800">完全免费</Badge>
                          ) : provider.tags.includes('🔓') ? (
                            <Badge className="bg-blue-100 text-blue-800">有免费额度</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">付费服务</Badge>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-700">模型支持</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          <div className="space-y-1">
                            {provider.tags.includes('✌') && (
                              <Badge className="bg-blue-100 text-blue-800 mr-1">OpenAI</Badge>
                            )}
                            {provider.tags.includes('💪') && (
                              <Badge className="bg-red-100 text-red-800 mr-1">Claude</Badge>
                            )}
                            {provider.tags.includes('🎉') && (
                              <Badge className="bg-purple-100 text-purple-800 mr-1">其他模型</Badge>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-700">高级功能</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          <div className="space-y-1">
                            {provider.tags.includes('🚀') && (
                              <div className="text-sm text-green-600">✓ 高并发支持</div>
                            )}
                            {provider.tags.includes('🎁') && (
                              <div className="text-sm text-purple-600">✓ 充值优惠</div>
                            )}
                            {provider.tags.includes('😆') && (
                              <div className="text-sm text-yellow-600">✓ 每日签到</div>
                            )}
                            {provider.tags.includes('🌎') && (
                              <div className="text-sm text-blue-600">⚠ 需要国际网络</div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-700">可信度</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          <div className="space-y-1">
                            {provider.tags.includes('✔') && (
                              <Badge className="bg-green-100 text-green-800">已验证</Badge>
                            )}
                            {provider.tags.includes('🚩') && (
                              <Badge className="bg-blue-100 text-blue-800">已备案</Badge>
                            )}
                            {provider.isRecommended && (
                              <Badge className="bg-yellow-100 text-yellow-800">推荐</Badge>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700">备注说明</td>
                      {selectedProviderData.map((provider) => (
                        <td key={provider.id} className="py-3 px-4">
                          <p className="text-sm text-gray-600">
                            {provider.notes || "暂无备注"}
                          </p>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 选择提示 */}
        {selectedProviders.size === 0 && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-12">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                开始选择提供商
              </h3>
              <p className="text-gray-600">
                选择2-4个API提供商进行详细对比分析
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}