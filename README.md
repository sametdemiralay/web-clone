## İlk kurulum;

- Nodejs v18+ önerilir

```bash
npm i
```
## Dev ortamını ayağa kaldırmak için;

```bash
npm run dev
```
komutu çalıştırılıp, [http://localhost:3000](http://localhost:3000) linki browserda açılır


## Prod buildi almak için;

```bash
npm run build
```


## Proje detayı;

Projenin entrypointi `/app` klasörüdür. Bu klasörün içindeki her `layout.tsx` ve `page.tsx` dosyası bulunduğu dizindeki sayfanın kodlarını içerir. Yani browswerdaki urlde görünen pathe karşılık gelir. (nextjs özelliği)

Ana dizindeki sayfa(/) websitenin giriş sayfasıdır. (ana dizinin sayfa kodları: `/app/page.tsx` ve varsa layout kodları `/app/layout.tsx`)

Örnek olarak `/app` dizinindeki `page.tsx` ve `layout.tsx` ele alalım;

Browserda ana("/") dizine karşılık gelir,

`page.tsx` dosyası sadece bu sayfanın kodlarını/viewlarını içerir.

`layout.tsx` dosyası bu dizinin layout kodlarını içerir. (ve eğer alt dizinlerde `layout.tsx` dosyası yoksa onlarda default olarak bu layout dosyasını kullanacaktır)

 - örnek olarak; `/app/detail/page.tsx` dosyası var ama `/app/detail/layout.tsx` dosyası yoksa(!) bu dizinin layout kodları otomatik olarak bir üst dizindeki `/app/layout.tsx` dosyasını kullanacaktır.

Sonuç olarak her dizinin kendi `page.tsx` dosyası olması zorunlu ama `layout.tsx` dosyası zorunlu değildir.


## Dikkat edilmesi gerekenler;

- Nextjs build alırken `/app` dizinindeki(ve alt dizinlerdeki) `page.tsx` ve `layout.tsx` dosyalarını kaale alır, diğer herhangi dosya bu 2 dosya tarafından import edilmediyse builde dahil olmayacaktır.

- `/src/components/` klasöründe paylaşımlı kullanılacak componentler yazılmalıdır.


- `/src/layouts/` klasöründe `/app` dizini altında kullanılacak layoutlar tanımlanmalı ve `layout.tsx` lerde import edlmelidir.

- proje genelinde `i18n` kullanılmaktadır, dil tanımlamaları `/src/locale/` klasöründe yapılmalıdır.

- viewlarda datalar direkt kullanılmamalı! ilk önce aynı dizinde bir `data.json` dosyası oluşturulup bu json `page.tsx`lerde import edilerek kullanılmalıdır.

> yukarıdaki maddelere örnek için `/app/urunler/` içeriği kontrol edilebilir.
