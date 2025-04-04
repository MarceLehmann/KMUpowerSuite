# Bildoptimierungs-Leitfaden für die KMUpower Suite Website

## Warum Bilder optimieren?

Die Optimierung von Bildern auf der Website ist entscheidend für:
- Schnellere Ladezeiten der Seite
- Bessere Benutzererfahrung
- Verbesserte SEO-Rankings
- Reduzierter Bandbreitenverbrauch
- Bessere Erfahrung auf Mobilgeräten

## Schritte zur Bildoptimierung

### 1. Bilder auf passende Dimensionen zuschneiden

Passen Sie die Grösse Ihrer Bilder vor dem Hochladen an die Dimensionen an, in denen sie auf der Website angezeigt werden. Verlassen Sie sich nicht auf die Skalierung im Browser.

**Empfohlene Grössen:**
- Hero-Bilder: 1920px × 1080px (maximale Breite)
- Feature-Icons: 60px × 60px
- Team-/Profilfotos: 400px × 400px
- Logo: 180px × 60px

### 2. Das richtige Format wählen

- **JPEG/JPG**: Am besten für Fotografien mit vielen Farben
- **PNG**: Am besten für Bilder mit Transparenz oder einfache Grafiken mit wenigen Farben
- **SVG**: Am besten für Icons, Logos und einfache Illustrationen (skalierbar)
- **WebP**: Modernes Format, das eine bessere Komprimierung als JPEG und PNG mit Transparenzunterstützung bietet

### 3. Bilder komprimieren

Verwenden Sie Tools wie TinyPNG, ImageOptim oder Squoosh, um Bilder ohne signifikanten Qualitätsverlust zu komprimieren.

### 4. Responsive Bilder implementieren

Verwenden Sie das HTML `<picture>`-Element oder das srcset-Attribut, um je nach Bildschirmgrösse des Geräts unterschiedlich grosse Bilder bereitzustellen:

```html
<picture>
  <source media="(max-width: 768px)" srcset="small-image.jpg">
  <source media="(max-width: 1200px)" srcset="medium-image.jpg">
  <img src="large-image.jpg" alt="Beschreibung des Bildes">
</picture>
```

### 5. Lazy Loading verwenden

Die Website hat bereits Lazy Loading implementiert. Verwenden Sie das folgende Muster für Bilder:

```html
<img class="lazy-load" data-src="image.jpg" data-srcset="image.jpg 1x, image@2x.jpg 2x" src="placeholder.jpg" alt="Beschreibender Alternativtext">
```

### 6. Immer Alt-Text hinzufügen

Fügen Sie immer beschreibenden Alt-Text für alle Bilder hinzu, um die Zugänglichkeit und SEO-Vorteile zu verbessern:

```html
<img src="crm-dashboard.jpg" alt="KMUpower CRM Dashboard mit Kundenkontaktliste und Interaktionsverlauf">
```

## Tools zur Bildoptimierung

- [TinyPNG](https://tinypng.com/) - Komprimiert PNG und JPEG
- [Squoosh](https://squoosh.app/) - Fortgeschrittene Komprimierung mit mehreren Formaten
- [SVG OMG](https://jakearchibald.github.io/svgomg/) - Optimiert SVG-Dateien
- [WebP Converter](https://cloudconvert.com/webp-converter) - Konvertiert Bilder in das WebP-Format

## Checkliste für Best Practices

- [ ] Bilder haben die richtige Grösse für ihre Anzeige-Dimensionen
- [ ] Alle Bilder sind komprimiert
- [ ] WebP-Versionen sind für moderne Browser verfügbar
- [ ] Alle Bilder haben beschreibenden Alt-Text
- [ ] Hero- und wichtige Bilder haben responsive Versionen
- [ ] Icons und Logos verwenden wenn möglich das SVG-Format
- [ ] Lazy Loading ist für Bilder unterhalb des sichtbaren Bereichs implementiert
