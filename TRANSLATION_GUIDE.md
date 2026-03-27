# Translation System Implementation Guide

## ✅ What's Already Set Up

1. **Language Store** (`lib/stores/languageStore.ts`)
   - Manages current language state (en/de)
   - Persists to localStorage
   - Provides `toggle()` and `setLanguage()` methods

2. **Translation Files**
   - `locales/en/common.json` - English translations
   - `locales/de/common.json` - German translations

3. **Components Already Updated**
   - ✅ ClientInit - Sets HTML lang attribute dynamically
   - ✅ Footer - All text uses translations
   - ✅ DualLayerHeader - Language toggle button (🇬🇧/🇩🇪) added

4. **Root Layout**
   - ✅ Dynamic lang attribute on `<html>` tag

## 🔧 How to Add Translations to a Component

### ✅ OPTIMIZED METHOD (Use This - Instant & Cached)

```typescript
'use client';
import { useInstantTranslations } from '@/lib/utils/translations';

export default function MyComponent() {
  const t = useInstantTranslations(); // ✨ Pre-cached, instant access

  return (
    <div>
      <h1>{t.nav.home}</h1>
      <button>{t.buttons.submit}</button>
    </div>
  );
}
```

**Why this method?**
- ✅ Translations loaded **once at startup**
- ✅ **Instant switching** - zero lag between languages
- ✅ **Simplest code** - just one hook
- ✅ **Best performance** - cached results, no processing

---

### Alternative (Legacy Pattern)

```typescript
'use client';
import { useLanguageStore } from '@/lib/stores/languageStore';
import enTranslations from '@/locales/en/common.json';
import deTranslations from '@/locales/de/common.json';

export default function MyComponent() {
  const { language } = useLanguageStore();
  const t = (language === 'de' ? deTranslations : enTranslations).common;

  return (
    <div>
      <h1>{t.nav.home}</h1>
      <button>{t.buttons.submit}</button>
    </div>
  );
}
```

Works but slightly slower. **Use the OPTIMIZED method above instead.**

## 📋 Components Awaiting Translation Updates

### Tier 1: Navigation & Layout
- [ ] SubHeader
- [ ] MainNav
- [ ] BottomNav (update labels)
- [ ] NotificationCenter (update labels)

### Tier 2: Authentication Pages
- [ ] app/login/page.tsx
- [ ] app/register/page.tsx
- [ ] app/forgot-password/page.tsx
- [ ] app/reset-password/[token]/page.tsx

### Tier 3: Settings Pages
- [ ] app/settings/page.tsx
- [ ] app/settings/security/page.tsx

### Tier 4: Platform Pages (Major)
- [ ] app/(platform)/home/page.tsx
- [ ] app/(platform)/gaming/page.tsx
- [ ] app/(platform)/music/page.tsx
- [ ] app/(platform)/live/page.tsx
- [ ] app/(platform)/videos/page.tsx
- [ ] app/(platform)/sports/page.tsx
- [ ] app/(platform)/shorts/page.tsx

### Tier 5: Content & Discovery
- [ ] app/search/page.tsx
- [ ] app/marketplace/page.tsx
- [ ] app/movies/[id]/page.tsx
- [ ] app/watch/[id]/page.tsx
- [ ] components/content/PremiumContentCard.tsx
- [ ] components/content/ReportButton.tsx

### Tier 6: Special Pages
- [ ] app/methodology/page.tsx
- [ ] app/sustainability/page.tsx
- [ ] app/meetings/page.tsx
- [ ] app/ztube/page.tsx
- [ ] components/impact/ImpactDashboard.tsx

## 🔄 Using DeepL API for Accurate Translations

To update translations using DeepL's professional translation engine:

```bash
# 1. Get a DeepL Free API key from https://www.deepl.com/pro-api
# 2. Set environment variable (Windows):
set DEEPL_API_KEY=your_key_here

# 3. Run the translation script:
node scripts/translate-deepl.js
```

The script will:
- Read all English strings from `locales/en/common.json`
- Translate them to German using DeepL API
- Save to `locales/de/common.json`
- Handle rate limiting automatically

## 📊 Translation Keys Available

All translations are nested under `common` key:

### Navigation
- `nav.home` - "Startseite"
- `nav.gaming` - "Gaming"
- `nav.music` - "Musik"
- `nav.videos` - "Videos"
- `nav.live` - "Live"
- `nav.sports` - "Sport"
- `nav.shorts` - "Shorts"
- `nav.search` - "Suche"
- `nav.settings` - "Einstellungen"
- `nav.logout` - "Abmelden"
- `nav.profile` - "Profil"
- `nav.notifications` - "Benachrichtigungen"

### Authentication
- `auth.login.title` - "Willkommen zurück"
- `auth.login.email` - "E-Mail"
- `auth.login.password` - "Passwort"
- `auth.login.signin` - "Anmelden"
- `auth.register.title` - "Erstellen Sie Ihr Konto"
- etc. (see locales/de/common.json for full list)

### Buttons
- `buttons.next` - "Weiter"
- `buttons.previous` - "Zurück"
- `buttons.submit` - "Absenden"
- `buttons.cancel` - "Abbrechen"
- `buttons.save` - "Speichern"
- etc.

## 🚀 Quick Implementation Checklist

For each component that needs translation:

1. [ ] Add import:
   ```typescript
   import { useInstantTranslations } from '@/lib/utils/translations';
   ```

2. [ ] Add hook (single line):
   ```typescript
   const t = useInstantTranslations();
   ```

3. [ ] Replace hardcoded strings with `t.category.key`
   - Before: `<h1>Welcome Home</h1>`
   - After: `<h1>{t.nav.home}</h1>`

4. [ ] Test both languages work (click 🇬🇧/🇩🇪 button)

5. [ ] Build and verify: `npm run build`

✨ Done! Instant translations with zero lag.

## 🧪 Testing Language Switching

1. Navigate to http://localhost:3001
2. Look for language toggle button (🇬🇧/🇩🇪) in top right
3. Click to switch between English and German
4. Verify all visible text changes instantly
5. Refresh page - language should persist (localStorage)
6. Open new tab - should remember last selected language

## 📝 Adding New Translations

If you need to add new text to translations:

1. Add to both `locales/en/common.json` and `locales/de/common.json`:
   ```json
   {
     "common": {
       "myFeature": {
         "title": "Feature Title",
         "description": "Feature description"
       }
     }
   }
   ```

2. Use in component:
   ```typescript
   <h2>{t.myFeature.title}</h2>
   <p>{t.myFeature.description}</p>
   ```

3. Or translate via DeepL:
   - Add to English JSON
   - Run `node scripts/translate-deepl.js`
   - Verify German translations

## 🎯 Current Status

- ✅ Foundation: Language store + translation files + helper utils
- ✅ Infrastructure: HTML lang attribute + localStorage persistence
- ✅ Navigation: Language toggle button added to header
- ✅ Components: Footer, ClientInit, DualLayerHeader
- 🔄 In Progress: Auth pages + Settings
- ⏳ Pending: Platform pages, Content pages, Special pages

## 🆘 Troubleshooting

### Language toggle not working
- Check browser console for errors
- Verify `useLanguageStore` is imported correctly
- Confirm all 'use client' directives are in place

### Translations not updating
- Check translation file JSON syntax
- Verify translation keys match between en and de files
- Rebuild project: `npm run build`

### localStorage not persisting
- Check browser dev tools → Application → localStorage
- Verify `language-store` entry exists
- Clear localStorage and try again

---

**Total Estimated Time to Complete:** 3-4 hours
**Priority:** Complete Tier 1-2 for full user experience, then Tier 3+ as time permits
