import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { Globe, Menu, X } from "lucide-react";

export function Header() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">API Directory</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('providers')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.providers')}
            </button>
            <button
              onClick={() => scrollToSection('apps')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.apps')}
            </button>
            <button
              onClick={() => scrollToSection('guide')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.guide')}
            </button>
            <button
              onClick={() => scrollToSection('contribute')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {t('nav.contribute')}
            </button>
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <button
              onClick={() => scrollToSection('providers')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t('nav.providers')}
            </button>
            <button
              onClick={() => scrollToSection('apps')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t('nav.apps')}
            </button>
            <button
              onClick={() => scrollToSection('guide')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t('nav.guide')}
            </button>
            <button
              onClick={() => scrollToSection('contribute')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t('nav.contribute')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
