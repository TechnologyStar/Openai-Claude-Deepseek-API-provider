import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Star, Scale, Code } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">🌐</span>
            <span className="ml-2">{t('hero.title')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          {/* Project Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-white shadow-sm">
              <Code className="w-4 h-4 mr-2 text-blue-600" />
              Last Commit
            </Badge>
            <Badge variant="secondary" className="bg-white shadow-sm">
              <Scale className="w-4 h-4 mr-2 text-green-500" />
              MIT License
            </Badge>
            <Badge variant="secondary" className="bg-white shadow-sm">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Free & Open Source
            </Badge>
          </div>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
              <div className="text-left">
                <h3 className="font-semibold text-yellow-800 mb-2">{t('warning.title')}</h3>
                <p className="text-yellow-700 text-sm mb-2">
                  {t('warning.content')}
                </p>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• 遵守 OpenAI 使用条款</li>
                  <li>• 遵守《生成式人工智能服务管理暂行办法》</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
