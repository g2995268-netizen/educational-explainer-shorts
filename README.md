# Educational Explainer Shorts

Репозиторий для создания вертикальных educational explainer shorts в стиле flat-vector (bold outlines, крупные глаза, метафорические визуализации, инфографика).

Стиль выведен из 8 референсных видео. Контент, персонажи и сценарии всегда оригинальные — референсы используются только для визуального языка.

## Структура

```
├── SKILL.md
├── references/
│   ├── STYLE_BIBLE.md
│   ├── reports/
│   ├── frames/
│   └── sheets/
└── templates/
    ├── bridge/
    ├── scripts/
    └── audio/
```

## Быстрый старт

### 1. Подготовка окружения
Нужен Remotion-проект (Node.js).  
Тяжёлые рендеры лучше делать в **Cursor Cloud Agents** (особенно если работаешь с телефона).

### 2. Новый шорт
```bash
cp -r templates/bridge src/videos/my-short
```
Зарегистрировать композицию в `src/Root.tsx`.

### 3. Пайплайн
1. Тема + факты → SCRIPT.md
2. Скрипт (55–75 с)
3. Голос + words.json
4. Shot plan в story.ts
5. Сцены в Explainer.tsx
6. Stills → сравнение с references/frames/
7. Звук
8. Финальный рендер

Подробные правила — в **SKILL.md**.

## Важные правила
- Стиль берётся из STYLE_BIBLE и reports.
- Контент всегда свой.
- Вертикаль 9:16.
- Длительность 55–75 секунд.
- Реакция на экране приходит на 0–3 кадра раньше слова.
