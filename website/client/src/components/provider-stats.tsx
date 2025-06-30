import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, TrendingUp, Users, Shield, Zap, DollarSign } from "lucide-react";
import type { ApiProvider } from "@shared/schema";

export function ProviderStats() {
  const { t } = useLanguage();

  const { data: providers = [], isLoading } = useQuery<ApiProvider[]>({
    queryKey: ['/api/providers']
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 计算统计数据
  const totalProviders = providers.length;
  const freeProviders = providers.filter(p => p.tags.includes('🆓')).length;
  const freemiumProviders = providers.filter(p => p.tags.includes('🔓')).length;
  const claudeProviders = providers.filter(p => p.tags.includes('💪')).length;
  const openaiProviders = providers.filter(p => p.tags.includes('✌')).length;
  const verifiedProviders = providers.filter(p => p.tags.includes('✔')).length;
  const highConcurrencyProviders = providers.filter(p => p.tags.includes('🚀')).length;
  const recommendedProviders = providers.filter(p => p.isRecommended).length;

  const stats = [
    {
      title: "总提供商数量",
      value: totalProviders,
      icon: BarChart,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "免费服务",
      value: freeProviders + freemiumProviders,
      subtitle: `${freeProviders} 完全免费 + ${freemiumProviders} 有免费额度`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "已验证平台",
      value: verifiedProviders,
      subtitle: `${Math.round((verifiedProviders / totalProviders) * 100)}% 通过验证`,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "高并发支持",
      value: highConcurrencyProviders,
      subtitle: `${Math.round((highConcurrencyProviders / totalProviders) * 100)}% 支持高并发`,
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const modelStats = [
    {
      name: "OpenAI 支持",
      count: openaiProviders,
      percentage: Math.round((openaiProviders / totalProviders) * 100),
      color: "bg-blue-500"
    },
    {
      name: "Claude 支持", 
      count: claudeProviders,
      percentage: Math.round((claudeProviders / totalProviders) * 100),
      color: "bg-red-500"
    },
    {
      name: "推荐平台",
      count: recommendedProviders,
      percentage: Math.round((recommendedProviders / totalProviders) * 100),
      color: "bg-yellow-500"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            📊 平台统计分析
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            实时统计和分析当前收录的API提供商数据
          </p>
        </div>

        {/* 主要统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      {stat.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">
                          {stat.subtitle}
                        </p>
                      )}
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 模型支持统计 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              模型支持分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {modelStats.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {model.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {model.count} 个平台
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {model.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={model.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 标签统计 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              功能标签分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { tag: '🆓', name: '完全免费', count: freeProviders },
                { tag: '🔓', name: '有免费额度', count: freemiumProviders },
                { tag: '💪', name: 'Claude支持', count: claudeProviders },
                { tag: '✌', name: 'OpenAI支持', count: openaiProviders },
                { tag: '🚀', name: '高并发', count: highConcurrencyProviders },
                { tag: '✔', name: '已验证', count: verifiedProviders }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-2xl mb-2">{item.tag}</div>
                  <div className="text-lg font-semibold text-gray-900">{item.count}</div>
                  <div className="text-xs text-gray-600">{item.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}