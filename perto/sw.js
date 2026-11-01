// Service worker do Perto.
//
// Ele existe por um motivo só: um app sem service worker não é instalável, e
// sem ser instalável não vira TWA nem .aab. Ele NÃO guarda nada em cache, de
// propósito — o Perto é dado ao vivo (deck, matches, mensagens), e cache aqui
// só serviria para mostrar perfil que já saiu e conversa que já mudou.
//
// O fetch abaixo não responde nada: deixa o navegador buscar na rede como
// sempre fez. É o mínimo que satisfaz o critério de instalação.

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", () => {
  // sem cache, de propósito
})
