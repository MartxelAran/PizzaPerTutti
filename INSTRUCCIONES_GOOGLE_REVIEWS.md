# 📝 Cómo Integrar Reseñas de Google Maps

Tienes **3 opciones** para mostrar las reseñas de Google Maps en tu sitio web:

---

## ✅ **OPCIÓN 1: Widget de Google Maps** (RECOMENDADA - Gratis y Fácil)

### Ventajas:
- ✅ **100% Gratis**
- ✅ Sin necesidad de API Key
- ✅ Las reseñas se actualizan automáticamente
- ✅ Muestra el mapa, puntuación y reseñas
- ✅ Implementación en 5 minutos

### Pasos:

1. **Busca tu negocio en Google Maps**
   - Ve a [https://www.google.com/maps](https://www.google.com/maps)
   - Busca "Pizza Per Tutti Arrasate" (o tu nombre)

2. **Obtén el código de inserción**
   - Haz clic en **"Compartir"**
   - Selecciona **"Insertar un mapa"**
   - Copia el código `<iframe>` que aparece

3. **Reemplaza el iframe en `Reviews.astro`**
   - Busca la línea con `<iframe src="..."`
   - Pega tu código iframe de Google

4. **Obtén tu enlace de reseñas**
   - En Google Maps, con tu negocio abierto, copia la URL
   - Añade `/review` al final
   - Ejemplo: `https://g.page/r/ABC123/review`
   - Reemplaza el enlace del botón "Déjanos tu opinión"

### Código de ejemplo:

```astro
<section id="opiniones" class="container mx-auto px-6 py-12 bg-white rounded-lg">
  <h3 class="text-3xl font-title text-ppt-wood mb-6 text-center">
    Opiniones de Nuestros Clientes
  </h3>

  <div class="max-w-4xl mx-auto">
    <div class="bg-gray-50 p-6 rounded-lg shadow-md">
      <p class="text-center text-gray-600 mb-4">
        📍 Encuéntranos y lee más opiniones en Google Maps
      </p>
      
      <div class="aspect-video w-full">
        <!-- PEGA AQUÍ TU IFRAME DE GOOGLE MAPS -->
        <iframe
          src="TU_URL_DE_GOOGLE_MAPS_AQUI"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          class="rounded-lg"
        ></iframe>
      </div>
      
      <div class="text-center mt-4">
        <a
          href="https://g.page/r/TU_PLACE_ID/review"
          target="_blank"
          class="inline-block bg-[#C0392B] text-white px-6 py-3 rounded-full hover:bg-[#A93226] transition"
        >
          ⭐ Déjanos tu opinión en Google
        </a>
      </div>
    </div>
  </div>
</section>
```

---

## 🔧 **OPCIÓN 2: API de Google Places** (Automático pero de pago)

### Ventajas:
- ⚡ Totalmente automático
- 🎨 Control total sobre el diseño
- 📊 Puedes filtrar y ordenar reseñas

### Desventajas:
- 💰 Requiere API Key (cuesta después de 28,000 solicitudes/mes)
- 🔐 Necesita backend para proteger la API key
- 🛠️ Más complejo de implementar

### Pasos:

1. **Crear proyecto en Google Cloud Platform**
   - Ve a [console.cloud.google.com](https://console.cloud.google.com)
   - Crea un nuevo proyecto
   - Habilita "Places API"

2. **Obtener API Key**
   - Ve a "Credenciales"
   - Crea una API Key
   - Restringe la key solo a tu dominio

3. **Encontrar tu Place ID**
   - Ve a [developers.google.com/maps/documentation/javascript/examples/places-placeid-finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
   - Busca tu negocio
   - Copia el Place ID

4. **Implementar en Astro**
   - Crea un endpoint de API en Astro
   - Llama a Google Places API desde el servidor
   - Muestra las reseñas en tu componente

### Código de ejemplo (Backend):

```typescript
// src/pages/api/reviews.json.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const GOOGLE_API_KEY = import.meta.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = 'TU_PLACE_ID_AQUI';
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_API_KEY}`
    );
    
    const data = await response.json();
    
    return new Response(JSON.stringify(data.result.reviews || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching reviews' }), {
      status: 500
    });
  }
};
```

### Código de ejemplo (Frontend):

```astro
---
// src/components/GoogleReviews.astro
let reviews = [];
try {
  const response = await fetch('/api/reviews.json');
  reviews = await response.json();
} catch (error) {
  console.error('Error loading reviews:', error);
}
---

<section class="container mx-auto px-6 py-12">
  <h3 class="text-3xl font-title mb-6 text-center">Opiniones de Google</h3>
  
  <div class="grid md:grid-cols-3 gap-4">
    {reviews.slice(0, 6).map((review) => (
      <blockquote class="p-4 border rounded bg-white shadow-sm">
        <div class="flex items-center mb-2">
          <span class="text-yellow-500">
            {'⭐'.repeat(review.rating)}
          </span>
        </div>
        <p class="text-gray-700">{review.text}</p>
        <footer class="mt-3 text-sm text-gray-600">
          — {review.author_name}
        </footer>
      </blockquote>
    ))}
  </div>
</section>
```

---

## 🎯 **OPCIÓN 3: Servicio de Terceros** (Elfsight, Embed Social, etc.)

### Ventajas:
- 📦 Plug and play
- 🎨 Widgets bonitos prediseñados
- 🔄 Actualización automática

### Desventajas:
- 💰 Suscripción mensual (desde $5-20/mes)
- 🏷️ Pueden mostrar marca del servicio

### Servicios populares:

1. **Elfsight** - [elfsight.com/google-reviews-widget](https://elfsight.com/google-reviews-widget/)
2. **Embed Social** - [embedsocial.com](https://embedsocial.com)
3. **Powr.io** - [powr.io/plugins/reviews](https://www.powr.io/plugins/reviews)

---

## 🏆 **RECOMENDACIÓN**

Para tu caso, **OPCIÓN 1 (Widget de Google Maps)** es la mejor porque:

✅ Es gratis  
✅ No requiere código complejo  
✅ Se actualiza automáticamente  
✅ Muestra también tu ubicación en el mapa  
✅ Los usuarios pueden ver todas las reseñas haciendo clic  

---

## 📞 Necesitas ayuda?

Si tienes problemas para obtener el código del widget, avísame y te guío paso a paso! 🍕
