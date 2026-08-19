# ⚡ Pokémon Microfrontends Challenge — Senior Frontend

Solución modular basada en **Microfrontends (Vite + Module Federation)** para la gestión y exploración de Pokémon consumiendo la PokeAPI oficial.

---

## 🚀 1. Arquitectura y Puertos

El proyecto está compuesto por 3 aplicaciones independientes empaquetadas con **Vite** y orquestadas con **Module Federation**:

| Aplicación | Puerto | Responsabilidad |
| :--- | :---: | :--- |
| **`shell` (Host)** | `http://localhost:3000` | Login/Sesión, Home con Categorías, Buscador Modal Fullscreen con Infinite Scroll, Tema Claro/Oscuro, Dropdown de Usuario y Toast al recargar. |
| **`mf-detail` (Remote 1)** | `http://localhost:3001` | Vista detallada del Pokémon (imágenes SVG sin fondo, tipos, stats, dimensiones y descripción). |
| **`mf-history` (Remote 2)** | `http://localhost:3002` | Historial cronológico de Pokémon visitados, conteo de visitas, navegación y limpieza de datos. |

---

## 🛠️ 2. Stack Tecnológico

* **Core**: React 19 + TypeScript + Vite 8
* **Microfrontends**: `@originjs/vite-plugin-federation` (con patrón Singleton para `react-router-dom`)
* **Estilos**: Tailwind CSS v4 (soporte nativo de Modo Claro / Modo Oscuro con `@variant dark (.dark &)`)
* **Manejo de Estado**: Zustand (Autenticación y Tema)
* **Data Fetching**: Axios con normalización de datos, skeletons y manejo robusto de estados (loading, error, empty)
* **Buscador**: Debounce (500ms) + `IntersectionObserver` para Infinite Scroll

---

## 📦 3. Instalación y Ejecución Local

### Prerrequisitos
* Node.js >= 18.x
* Yarn o NPM

### Instalación de dependencias
```bash
# 1. Instalar dependencias en cada módulo
cd mf-detail && yarn install
cd ../mf-history && yarn install
cd ../shell && yarn install
cd ..
```

### Levantar los 3 Proyectos

Para que el Shell pueda consumir los microfrontends mediante Module Federation, levanta los remotos con `build` + `preview` y el Shell en modo `dev`:

```bash
# Terminal 1 — Microfrontend Detalle (Puerto 3001)
cd mf-detail
yarn build && yarn preview

# Terminal 2 — Microfrontend Historial (Puerto 3002)
cd mf-history
yarn build && yarn preview

# Terminal 3 — Shell Principal (Puerto 3000)
cd shell
yarn dev
```

Abre tu navegador en **`http://localhost:3000`**.

---

## 🧠 4. Decisiones Técnicas

### 4.1 Estrategia de Persistencia de Historial (Requisito 8)
La persistencia se gestiona en `localStorage` bajo la clave `pokemon-visit-history`:
* **Sin duplicados**: Cada Pokémon se identifica de forma única por su `id`.
* **Incremento de visitas**: Si el usuario vuelve a ver un Pokémon, se incrementa su contador `visits += 1` y se reubica al inicio de la lista (orden cronológico inverso).
* **Estructura del item**:
  ```typescript
  interface HistoryItem {
    id: number | string;
    name: string;
    image: string;
    visits: number;
    lastVisited: string; // ISO Date string
  }
  ```

### 4.2 Lógica del Toast al Recargar (Requisito 9)
* Cuando el usuario visita un detalle, se actualiza la clave `last-visited-pokemon` y se limpia el flag `toast-dismissed` de `sessionStorage`.
* Al recargar la página (**F5**), el Shell detecta el último Pokémon y muestra el Toast flotante.
* Si el usuario cierra el Toast manualmente, se guarda `toast-dismissed: "true"` en `sessionStorage` para **no volver a mostrarlo en recargas sucesivas** hasta que ocurra una nueva visita a otro Pokémon.

### 4.3 Enrutamiento con Patrón Singleton
Se configuró `shared: ["react", "react-dom", "react-router-dom"]` en Module Federation para que los microfrontends compartan la misma instancia del Router en memoria. Esto permite usar `useNavigate()` directamente dentro de los remotos sin necesidad de acoplar rutas ni pasar múltiples callbacks por props.

### 4.4 Buscador e Infinite Scroll
* **Búsqueda Exacta (Exact Match)**: Normaliza el texto (`trim()`, minúsculas, sin acentos) y aplica un **Debounce de 500ms** antes de consultar `GET /pokemon/{name}`.
* **Infinite Scroll**: Utiliza la **`IntersectionObserver API`** nativa con un elemento centinela al pie del modal, paginando de 30 en 30 (`offset += 30`) con alto rendimiento y cero bloqueos de UI.

---

## 🌐 5. Despliegue en Vercel (Producción)

Los 3 proyectos están configurados para desplegarse de forma independiente en Vercel desde el mismo repositorio:
* **`mf-detail/vercel.json`** y **`mf-history/vercel.json`**: Incluyen cabeceras CORS (`Access-Control-Allow-Origin: *`) para permitir la federación de assets entre dominios.
* **`shell/vercel.json`**: Configura los rewrites para Single Page Application (SPA).
* **Variables de Entorno en el Shell**:
  * `VITE_MF_DETAIL_URL`: `https://<tu-dominio-mf-detail>.vercel.app/assets/remoteEntry.js`
  * `VITE_MF_HISTORY_URL`: `https://<tu-dominio-mf-history>.vercel.app/assets/remoteEntry.js`
