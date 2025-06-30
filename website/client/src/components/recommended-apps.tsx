import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Monitor, Globe, MessageSquare, Smartphone, MessageCircle, Zap } from "lucide-react";
import type { RecommendedApp } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<any>> = {
  desktop: Monitor,
  globe: Globe,
  comments: MessageSquare,
  mobile: Smartphone,
  "message-square": MessageCircle,
  zap: Zap
};

const tagColors: Record<string, string> = {
  "开源": "bg-green-100 text-green-800",
  "跨平台": "bg-blue-100 text-blue-800",
  "网页端": "bg-purple-100 text-purple-800",
  "多模态": "bg-red-100 text-red-800",
  "移动端": "bg-indigo-100 text-indigo-800",
  "语音": "bg-orange-100 text-orange-800",
  "现代界面": "bg-cyan-100 text-cyan-800",
  "企业级": "bg-gray-100 text-gray-800",
  "知识库": "bg-yellow-100 text-yellow-800"
};

export function RecommendedApps() {
  const { t } = useLanguage();

  const { data: apps = [], isLoading } = useQuery<RecommendedApp[]>({
    queryKey: ['/api/apps']
  });

  if (isLoading) {
    return (
      <section id="apps" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading apps...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apps" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            📱 {t('apps.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('apps.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => {
            const IconComponent = iconMap[app.icon] || Monitor;
            
            return (
              <div key={app.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {app.name}
                      </h3>
                      <div className="flex space-x-2 ml-2">
                        {app.githubUrl && (
                          <a
                            href={app.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <Github size={16} />
                          </a>
                        )}
                        {app.websiteUrl && (
                          <a
                            href={app.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {app.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className={`text-xs ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
