import { useLanguage } from "@/hooks/use-language";
import { Globe, Github, Twitter } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">API Directory</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              精选的第三方API提供商目录，供学习研究使用。
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open('https://github.com/TechnologyStar/Openai-Claude-Deepseek-API-provider', '_blank')}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('providers')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('footer.providers')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('apps')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('footer.apps')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('guide')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('footer.guide')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contribute')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {t('footer.contribute')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 本项目不存储任何 API Key</li>
              <li>• 不提供代理或转发服务</li>
              <li>• 使用风险请自行评估</li>
              <li>• 遵守相关法律法规</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Made with ❤️ by{" "}
            <button
              onClick={() => window.open('https://github.com/TechnologyStar', '_blank')}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              TechnologyStar
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
