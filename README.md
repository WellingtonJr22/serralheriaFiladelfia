# Serralheria Filadélfia — Site Institucional V2

Landing page estática em HTML, CSS e JavaScript, com galeria responsiva em carrossel usando as fotos e vídeos reais enviados.

## Estrutura

- `index.html` — estrutura da página
- `styles.css` — visual premium, carrossel e responsividade
- `script.js` — WhatsApp, menu mobile, animações e carrossel
- `assets/images/` — fotos e capas dos vídeos
- `assets/videos/` — vídeos dos projetos

## WhatsApp

No `script.js`, altere apenas:

```js
const WHATSAPP_NUMBER = "5562999999999";
```

Use DDI + DDD + número, somente dígitos.

## Carrossel

- 3 projetos por vez em telas grandes
- 2 em notebooks/tablets
- 1 no celular
- Fotos e vídeos mantêm exatamente a mesma proporção visual
- Navegação por setas, teclado e gesto de arrastar
- Vídeos reproduzem dentro do próprio card
- Ao iniciar um vídeo, outro vídeo em reprodução é pausado automaticamente

## Responsividade

Foram incluídos ajustes extras para notebooks de menor resolução e telas de pouca altura, além dos breakpoints de tablet e celular.


## Ampliação das fotos

Clique ou toque em qualquer foto do carrossel para abrir uma visualização ampliada. Para fechar, clique no X, no fundo escuro ou pressione Esc.


## Atualização V4

- 2 novos vídeos adicionados ao carrossel.
- Total de 10 trabalhos no carrossel (5 fotos + 5 vídeos).
- Capas dos novos vídeos geradas para carregamento mais agradável.
- Vídeos compactados para reduzir o peso do site.
