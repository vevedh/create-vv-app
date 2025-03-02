import { createHighlighter } from 'shiki';

export async function highlightJson() {
  const highlighter = await createHighlighter({
    langs: ['json'],
    themes: ['vitesse-dark', 'vitesse-light'],
  });

  return function renderHighlightedText(text: any, isDark: boolean) {
    return highlighter.codeToHtml(JSON.stringify(text, null, 2), {
      lang: 'json',
      theme: isDark ? 'vitesse-dark' : 'vitesse-light',
      colorReplacements: {
        'vitesse-dark': {
          '#121212': '#1D1D1D',
        },
      },
    });
  };
}
