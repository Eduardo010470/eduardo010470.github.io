// Service worker do Perto.
//
// Existe por dois motivos.
//
// Um: sem service worker o app nao e instalavel, e sem ser instalavel nao
// vira TWA nem .aab.
//
// Dois: o Chrome guarda a pagina em cache, e dentro do TWA isso significa
// que uma mudanca publicada no site demora a aparecer no app. Aqui a pagina
// e sempre buscada na rede, com no-store, para que o que esta no ar seja o
// que o usuario ve. Se a rede falhar, cai no fetch normal, que pode usar o
// cache do navegador como ultimo recurso.
//
// Nada e guardado por este arquivo. O Perto e dado ao vivo: deck, matches e
// mensagens em cache so mostrariam perfil que ja saiu e conversa que mudou.

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", e => {
  const r = e.request
  if (r.method !== "GET") return
  if (r.mode !== "navigate" && r.destination !== "document") return
  e.respondWith(
    fetch(new Request(r.url, { cache: "no-store", credentials: "same-origin" }))
      .catch(() => fetch(r))
  )
})
