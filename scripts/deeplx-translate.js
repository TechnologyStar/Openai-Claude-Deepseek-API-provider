const axios = require('axios');

class DeepLXTranslator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://api.deeplx.org';
  }

  async translate(text, targetLang) {
    try {
      const response = await axios.post(
        `${this.endpoint}/${this.apiKey}/translate`,
        {
          text: text,
          target_lang: targetLang.toUpperCase()
        },
        { timeout: 5000 }
      );
      return response.data.data || text;
    } catch (error) {
      console.log(`[Translation Failed] Keeping original text: ${text}`);
      return text;
    }
  }
}

module.exports = DeepLXTranslator;
