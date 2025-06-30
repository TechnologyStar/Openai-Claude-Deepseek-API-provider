import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Plus, Book, Code, Globe, Github, Bug } from "lucide-react";

const contributions = [
  {
    icon: Plus,
    titleKey: "addProvider",
    title: "✨ 添加新 API 提供商",
    description: "需稳定运行 ≥ 3 天，提供详细的功能说明和使用方法",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Book,
    titleKey: "addTutorial",
    title: "🧰 补充使用教程",
    description: "包括配置截图、录屏演示等详细的使用指导",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Code,
    titleKey: "developScript",
    title: "🧪 开发验证脚本",
    description: "自动检测失效平台，提高维护效率",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Globe,
    titleKey: "translate",
    title: "🌍 多语言翻译",
    description: "如：英文、日文、韩文等语言版本的翻译工作",
    color: "bg-orange-100 text-orange-600"
  }
];

export function ContributeSection() {
  const { t } = useLanguage();

  return (
    <section id="contribute" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🙌 {t('contribute.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('contribute.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contributions.map((contribution, index) => {
            const IconComponent = contribution.icon;
            
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${contribution.color}`}>
                  <IconComponent size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {contribution.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {contribution.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-lg p-6 inline-block">
            <p className="text-gray-700 mb-4">请提交 Pull Request 或 Issue，我们将尽快处理！</p>
            <div className="flex justify-center space-x-4">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={() => window.open('https://github.com/TechnologyStar/Openai-Claude-Deepseek-API-provider', '_blank')}
              >
                <Github className="mr-2" size={16} />
                GitHub
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => window.open('https://github.com/TechnologyStar/Openai-Claude-Deepseek-API-provider/issues', '_blank')}
              >
                <Bug className="mr-2" size={16} />
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
