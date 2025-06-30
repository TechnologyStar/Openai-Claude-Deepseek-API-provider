import { useLanguage } from "@/hooks/use-language";
import { Key, Settings, Bot, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Key,
    titleKey: "getApiKey",
    title: "🔑 获取 API Key",
    description: "注册平台后，在用户中心复制您的API密钥"
  },
  {
    number: "2",
    icon: Settings,
    titleKey: "configEndpoint",
    title: "⚙ 配置 Endpoint",
    description: "填写 API 地址到支持的应用程序中"
  },
  {
    number: "3",
    icon: Bot,
    titleKey: "selectModel",
    title: "🤖 选择模型",
    description: "根据平台支持情况切换不同的AI模型"
  },
  {
    number: "4",
    icon: BarChart3,
    titleKey: "monitorUsage",
    title: "📊 用量监控",
    description: "推荐使用客户端自带的用量限制功能"
  }
];

export function UsageGuide() {
  const { t } = useLanguage();

  return (
    <section id="guide" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            📖 {t('guide.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('guide.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            
            return (
              <div key={step.number} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <IconComponent className="w-5 h-5 mr-2 text-blue-600" />
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
