import { useLanguage } from "@/hooks/use-language";

const tagData = [
  { emoji: "🆓", key: "free" },
  { emoji: "🔓", key: "freemium" },
  { emoji: "💰", key: "paid" },
  { emoji: "💪", key: "claude" },
  { emoji: "✌", key: "openai" },
  { emoji: "🎉", key: "other" },
  { emoji: "🌎", key: "vpn" },
  { emoji: "🎁", key: "bonus" },
  { emoji: "🚀", key: "concurrent" },
  { emoji: "😆", key: "daily" },
  { emoji: "🚩", key: "verified" },
  { emoji: "✔", key: "validated" }
];

export function TagsLegend() {
  const { t } = useLanguage();

  return (
    <section id="tags" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🎁 {t('tags.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tagData.map((tag) => (
            <div key={tag.key} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors duration-200">
              <div className="text-2xl mb-2">{tag.emoji}</div>
              <div className="text-sm font-medium text-gray-900">
                {t(`tags.${tag.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
