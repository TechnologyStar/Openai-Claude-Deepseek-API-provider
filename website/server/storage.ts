import { apiProviders, recommendedApps, type ApiProvider, type InsertApiProvider, type RecommendedApp, type InsertRecommendedApp } from "@shared/schema";

export interface IStorage {
  getApiProviders(): Promise<ApiProvider[]>;
  getApiProvider(id: number): Promise<ApiProvider | undefined>;
  createApiProvider(provider: InsertApiProvider): Promise<ApiProvider>;
  updateApiProvider(id: number, provider: Partial<InsertApiProvider>): Promise<ApiProvider | undefined>;
  deleteApiProvider(id: number): Promise<boolean>;
  
  getRecommendedApps(): Promise<RecommendedApp[]>;
  getRecommendedApp(id: number): Promise<RecommendedApp | undefined>;
  createRecommendedApp(app: InsertRecommendedApp): Promise<RecommendedApp>;
  updateRecommendedApp(id: number, app: Partial<InsertRecommendedApp>): Promise<RecommendedApp | undefined>;
  deleteRecommendedApp(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private apiProviders: Map<number, ApiProvider>;
  private recommendedApps: Map<number, RecommendedApp>;
  private currentApiProviderId: number;
  private currentRecommendedAppId: number;

  constructor() {
    this.apiProviders = new Map();
    this.recommendedApps = new Map();
    this.currentApiProviderId = 1;
    this.currentRecommendedAppId = 1;
    
    // Initialize with real data from the design reference
    this.initializeData();
  }

  private initializeData() {
    // API Providers data
    const providersData = [
      {
        name: "chat01",
        displayName: "chat01（推荐）(含邀请码)",
        url: "https://chat01.ai/?ref=j45ikbTa",
        tags: ["🔓", "✌", "🎁", "💰", "✔"],
        notes: "支持pro,解决降智问题，每天免费2积分，聊天+api同站",
        isRecommended: true,
        sortOrder: 1
      },
      {
        name: "siliconflow",
        displayName: "cloud.siliconflow.cn(推荐/企业级)",
        url: "https://cloud.siliconflow.cn/i/ZKV30bdG",
        tags: ["🔓", "💪", "✌", "🎉", "🚀", "🚩", "✔"],
        notes: "华为云昇腾服务，实名送14元，每日最多请求100次",
        isRecommended: true,
        sortOrder: 2
      },
      {
        name: "voapi",
        displayName: "VoAPI",
        url: "https://demo.voapi.top",
        tags: ["🆓", "😆", "💪", "✌"],
        notes: "【全公益网站】余额每日清零",
        sortOrder: 3
      },
      {
        name: "burn-hair",
        displayName: "头顶冒火",
        url: "https://burn.hair",
        tags: ["✌", "🎉", "😆", "🚀"],
        notes: "赠 $0.3，每日签到得额度，支持高并发",
        sortOrder: 4
      },
      {
        name: "v3-api-mixed",
        displayName: "V3 API（混合版）",
        url: "https://api.v3.cm",
        tags: ["🚀", "🔓", "💪", "🎁", "🎉", "✌"],
        notes: "赠 $0.2，高并发，3折充值，超多模型",
        sortOrder: 5
      },
      {
        name: "v3-api-official",
        displayName: "V3 API（官转版）",
        url: "https://gf.gpt.ge",
        tags: ["🚀", "🌹", "🔓", "💪"],
        notes: "赠 $0.2，高并发，6折充值",
        sortOrder: 6
      },
      {
        name: "openai-hk",
        displayName: "openai-hk",
        url: "https://openai-hk.com/",
        tags: ["🆓", "🔓", "🎉", "✌", "💪", "🚀"],
        notes: "赠1元，超高并发，含GPT3.5公益版",
        sortOrder: 7
      },
      {
        name: "faucet-openkey",
        displayName: "ChatGPT API 水龙头",
        url: "https://faucet.openkey.cloud/",
        tags: ["🆓"],
        notes: "免费$1额度，3天有效期",
        sortOrder: 8
      },
      {
        name: "free-chatgpt-api",
        displayName: "公益免费的ChatGPT API",
        url: "https://github.com/popjane/free_chatgpt_api",
        tags: ["🆓"],
        notes: "公益免费",
        sortOrder: 9
      },
      {
        name: "gpt-api-free",
        displayName: "GPT-API-free",
        url: "https://github.com/chuyuewei/ChatGPT-API",
        tags: ["🆓", "💪"],
        notes: "支持 GPT-4，每天3次",
        sortOrder: 10
      },
      {
        name: "openkey",
        displayName: "openkey",
        url: "https://openkey.cloud/",
        tags: ["🔓", "💪", "✌", "🚀"],
        notes: "赠$0.2，支持多并发",
        sortOrder: 11
      },
      {
        name: "gptgod",
        displayName: "gptgod.online",
        url: "https://gptgod.online/",
        tags: ["💪", "✌", "🎁", "💰", "🎉", "😆"],
        notes: "按次计费，积分额度",
        sortOrder: 12
      },
      {
        name: "m3-ckit",
        displayName: "m3.ckit.gold",
        url: "https://m3.ckit.gold/",
        tags: ["💰", "💪", "✌"],
        notes: "3元/刀，注册送$0.1",
        sortOrder: 13
      },
      {
        name: "xiaotu-api",
        displayName: "小兔api",
        url: "https://api.aischat.xy",
        tags: ["🆓", "💪", "✌"],
        notes: "",
        sortOrder: 14
      },
      {
        name: "goapi-gptnb",
        displayName: "goapi.gptnb.ai",
        url: "https://goapi.gptnb.ai/",
        tags: ["💪", "✌", "🎁", "💰", "🎉"],
        notes: "",
        sortOrder: 15
      },
      {
        name: "api-aigc369",
        displayName: "api.aigc369.com",
        url: "https://api.aigc369.com/pricing",
        tags: ["💪", "✌", "🎁", "💰", "🎉"],
        notes: "",
        sortOrder: 16
      },
      {
        name: "api-mjdjourney",
        displayName: "api.mjdjourney.cn",
        url: "https://api.mjdjourney.cn/",
        tags: ["💪", "✌", "🎁", "💰", "🎉"],
        notes: "",
        sortOrder: 17
      },
      {
        name: "api-bltcy",
        displayName: "api.bltcy.ai",
        url: "https://api.bltcy.ai/",
        tags: ["💪", "✌", "🎁", "💰", "🎉"],
        notes: "",
        sortOrder: 18
      },
      {
        name: "4z-api",
        displayName: "4Z API 中转站",
        url: "https://zzzzapi.com/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "华为云昇腾服务，支持GPT-4o、Claude 3.5，新用户赠100元额度，适合企业级高并发场景。",
        sortOrder: 19
      },
      {
        name: "jeniya-api",
        displayName: "简易API中转站",
        url: "https://jeniya.top/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "聚合多模型，国内直连无限制，注册送100元测试额度。",
        sortOrder: 20
      },
      {
        name: "closeai",
        displayName: "CloseAI",
        url: "https://closeai-asia.com/",
        tags: ["💰", "✌", "💪", "🎉", "🚀"],
        notes: "企业级代理，支持GPT-4o、Claude 3.5，提供中文技术支持。",
        sortOrder: 21
      },
      {
        name: "yunjiang-ai",
        displayName: "云鲸AI",
        url: "https://api.atalk-ai.com/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "聚合ChatGPT、Claude、文心一言，注册赠5元体验券。",
        sortOrder: 22
      },
      {
        name: "model-bridge",
        displayName: "ModelBridge",
        url: "https://model-bridge.okeeper.com/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "国内免费代理，兼容OpenAI接口和国产模型（如文心一言）。",
        sortOrder: 23
      },
      {
        name: "uiui-api",
        displayName: "UiUi API",
        url: "https://sg.uiuiapi.com/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "支持Claude 4、Gemini等模型，兼容OpenAI接口格式。",
        sortOrder: 24
      },
      {
        name: "laozhang-api",
        displayName: "老张API中转服务",
        url: "https://api.laozhang.ai/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "支持Claude 3和GPT-4o，新用户赠20元额度，支持支付宝/微信支付。",
        sortOrder: 25
      },
      {
        name: "haijing-ai",
        displayName: "海鲸AI聚合平台",
        url: "https://ai.atalk-ai.com/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "国内备案平台，支持多模型统一API接入。",
        sortOrder: 26
      },
      {
        name: "one-api",
        displayName: "One API",
        url: "https://one-api.ai/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "开源接口管理系统，支持多模型分发和私有化部署。",
        sortOrder: 27
      },
      {
        name: "openrouter",
        displayName: "OpenRouter",
        url: "https://openrouter.ai/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "支持293个模型（含OpenAI、Claude、Gemini），提供免费额度。",
        sortOrder: 28
      },
      {
        name: "gemini-proxy",
        displayName: "Gemini API代理",
        url: "https://gemini-proxy.com/",
        tags: ["🔓", "✌", "🎉", "🚀"],
        notes: "支持Google Gemini模型，兼容OpenAI接口，提供免费额度。",
        sortOrder: 29
      },
      {
        name: "deepseek-aggregator",
        displayName: "DeepSeek API聚合",
        url: "https://deepseek-aggregator.com/",
        tags: ["🔓", "💪", "🎉", "🚀"],
        notes: "聚合DeepSeek系列模型，提供免费测试额度。",
        sortOrder: 30
      },
      {
        name: "huggingface-api",
        displayName: "Hugging Face模型代理",
        url: "https://huggingface.co/inference-api/",
        tags: ["🔓", "💪", "🎉", "🚀"],
        notes: "支持开源模型（如Llama 3），提供免费额度和企业级服务。",
        sortOrder: 31
      },
      {
        name: "ai21-labs",
        displayName: "AI21 Labs官方代理",
        url: "https://studio.ai21.com/",
        tags: ["💰", "✌", "💪", "🎉"],
        notes: "支持Jurassic-2模型，适合自然语言处理任务。",
        sortOrder: 32
      },
      {
        name: "cohere-api",
        displayName: "Cohere API代理",
        url: "https://cohere.ai/",
        tags: ["💰", "✌", "💪", "🎉"],
        notes: "支持文本生成和分类模型，提供企业级API。",
        sortOrder: 33
      },
      {
        name: "ai-aggregator",
        displayName: "AI API聚合平台",
        url: "https://api.ai-aggregator.com/",
        tags: ["🔓", "✌", "💪", "🎉", "🚀"],
        notes: "聚合多模型，提供统一接口和负载均衡。",
        sortOrder: 34
      },
      {
        name: "ai-ls",
        displayName: "AI.LS",
        url: "https://ai.ls/",
        tags: ["🆓", "✌"],
        notes: "极简接口，GPT-3.5免费匿名使用",
        sortOrder: 35
      },
      {
        name: "openai120",
        displayName: "OpenAI120",
        url: "https://openai120.com/",
        tags: ["🔓", "✌", "🎁"],
        notes: "新用户送$3额度，单价同官方",
        sortOrder: 36
      },
      {
        name: "duckagi",
        displayName: "DuckAGI",
        url: "https://duckagi.com/",
        tags: ["💰", "✌", "🎉", "🚀"],
        notes: "多模态支持GPT-4o/Sora，适合AI绘图",
        sortOrder: 37
      },
      {
        name: "aihubmix",
        displayName: "Aihubmix",
        url: "https://aihubmix.com/",
        tags: ["💰", "🎉"],
        notes: "国产模型聚合（文心一言/通义千问）",
        sortOrder: 38
      },
      {
        name: "wokaai",
        displayName: "WokaAI",
        url: "https://wokaai.com/",
        tags: ["✌", "🚩", "✔"],
        notes: "上海企业运营，ICP备案双线路",
        sortOrder: 39
      },
      {
        name: "azapi",
        displayName: "azapi",
        url: "https://azapi.com.cn/",
        tags: ["💰", "🚩", "✔"],
        notes: "杭州企业备案，长期使用优惠",
        sortOrder: 40
      },
      {
        name: "claudeapi",
        displayName: "ClaudeAPI",
        url: "https://claudeapi.io/",
        tags: ["💪", "🚀", "✔"],
        notes: "Anthropic官方合作，支持文件解析",
        sortOrder: 41
      },
      {
        name: "gala-api",
        displayName: "Gala API",
        url: "https://galaapi.com/",
        tags: ["🎉", "🚀", "✔"],
        notes: "谷歌Gemini专用高速通道",
        sortOrder: 42
      },
      {
        name: "ai-ls",
        displayName: "AI.LS",
        url: "https://ai.ls/",
        tags: ["🆓", "✌"],
        notes: "极简接口，GPT-3.5免费匿名使用",
        sortOrder: 35
      },
      {
        name: "openai120",
        displayName: "OpenAI120",
        url: "https://openai120.com/",
        tags: ["🔓", "✌", "🎁"],
        notes: "新用户送$3额度，单价同官方",
        sortOrder: 36
      },
      {
        name: "duckagi",
        displayName: "DuckAGI",
        url: "https://duckagi.com/",
        tags: ["💰", "✌", "🎉", "🚀"],
        notes: "多模态支持GPT-4o/Sora，适合AI绘图",
        sortOrder: 37
      },
      {
        name: "aihubmix",
        displayName: "Aihubmix",
        url: "https://aihubmix.com/",
        tags: ["💰", "🎉"],
        notes: "国产模型聚合（文心一言/通义千问）",
        sortOrder: 38
      },
      {
        name: "wokaai",
        displayName: "WokaAI",
        url: "https://wokaai.com/",
        tags: ["✌"],
        notes: "优惠多，支持chatgpt",
        sortOrder: 39
      },
      {
        name: "azapi",
        displayName: "azapi",
        url: "https://azapi.com.cn/",
        tags: ["💰"],
        notes: "长期使用优惠",
        sortOrder: 40
      },
      {
        name: "claudeapi",
        displayName: "ClaudeAPI",
        url: "https://claudeapi.io/",
        tags: ["💪", "🚀"],
        notes: "Anthropic官方合作，支持文件解析",
        sortOrder: 41
      },
      {
        name: "gala-api",
        displayName: "Gala API",
        url: "https://galaapi.com/",
        tags: ["🎉", "🚀"],
        notes: "谷歌Gemini专用高速通道",
        sortOrder: 42
      }
    ];

    providersData.forEach(data => {
      this.createApiProvider({
        ...data,
        isActive: true,
        isRecommended: data.isRecommended || false
      });
    });

    // Recommended Apps data
    const appsData = [
      {
        name: "Cherry Studio",
        description: "跨平台桌面端 + 移动端，集成主流 AI 云服务 + 本地模型。",
        githubUrl: "https://github.com/CherryHQ/cherry-studio",
        icon: "desktop",
        tags: ["开源", "跨平台"],
        sortOrder: 1
      },
      {
        name: "ChatGPT-Next-Web",
        description: "开源网页端 ChatGPT 前端，支持 API Key 与多用户协作。",
        githubUrl: "https://github.com/Yidadaa/ChatGPT-Next-Web",
        icon: "globe",
        tags: ["开源", "网页端"],
        sortOrder: 2
      },
      {
        name: "LobeChat",
        description: "支持视觉、语音交互和多模型切换，网页端 AI 会话框架。",
        githubUrl: "https://github.com/lobehub/lobe-chat",
        icon: "comments",
        tags: ["开源", "多模态"],
        sortOrder: 3
      },
      {
        name: "BotGem",
        description: "移动端优先设计，支持语音交流与 AI 好友系统。",
        websiteUrl: "https://botgem.com/",
        icon: "mobile",
        tags: ["移动端", "语音"],
        sortOrder: 4
      },
      {
        name: "ChatBox",
        description: "支持 iOS、Android 和桌面端，界面现代，功能完整。",
        githubUrl: "https://github.com/Bin-Huang/chatbox",
        icon: "message-square",
        tags: ["跨平台", "现代界面"],
        sortOrder: 5
      },
      {
        name: "FastGPT",
        description: "知识库 + 工作流集成，企业内训/客服场景首选。",
        githubUrl: "https://github.com/labring/FastGPT",
        icon: "zap",
        tags: ["企业级", "知识库"],
        sortOrder: 6
      }
    ];

    appsData.forEach(data => {
      this.createRecommendedApp({
        ...data,
        isActive: true
      });
    });
  }

  async getApiProviders(): Promise<ApiProvider[]> {
    return Array.from(this.apiProviders.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getApiProvider(id: number): Promise<ApiProvider | undefined> {
    return this.apiProviders.get(id);
  }

  async createApiProvider(insertProvider: InsertApiProvider): Promise<ApiProvider> {
    const id = this.currentApiProviderId++;
    const provider: ApiProvider = { ...insertProvider, id };
    this.apiProviders.set(id, provider);
    return provider;
  }

  async updateApiProvider(id: number, updates: Partial<InsertApiProvider>): Promise<ApiProvider | undefined> {
    const existing = this.apiProviders.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.apiProviders.set(id, updated);
    return updated;
  }

  async deleteApiProvider(id: number): Promise<boolean> {
    return this.apiProviders.delete(id);
  }

  async getRecommendedApps(): Promise<RecommendedApp[]> {
    return Array.from(this.recommendedApps.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getRecommendedApp(id: number): Promise<RecommendedApp | undefined> {
    return this.recommendedApps.get(id);
  }

  async createRecommendedApp(insertApp: InsertRecommendedApp): Promise<RecommendedApp> {
    const id = this.currentRecommendedAppId++;
    const app: RecommendedApp = { ...insertApp, id };
    this.recommendedApps.set(id, app);
    return app;
  }

  async updateRecommendedApp(id: number, updates: Partial<InsertRecommendedApp>): Promise<RecommendedApp | undefined> {
    const existing = this.recommendedApps.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.recommendedApps.set(id, updated);
    return updated;
  }

  async deleteRecommendedApp(id: number): Promise<boolean> {
    return this.recommendedApps.delete(id);
  }
}

export const storage = new MemStorage();
