<!-- @format -->

name: styling-system
description: Detailed guidance for CSS/SCSS design-system work in this workspace. Use when deciding style ownership, token placement, BEM naming, SCSS authoring patterns, or when translating repeated Tailwind usage into shared styling assets.

---

# Styling System

Use this skill when styling work goes beyond a short one-off styling tweak.

This skill explains:

- where shared styling assets belong
- when values should become tokens
- when a repeated pattern should become a class, recipe, mixin, or function
- how BEM naming works in this workspace
- how to keep `.vue` templates from becoming Tailwind-heavy design sources
- how Nuxt app-local classes should default to SCSS assets in `{projectRoot}/app/assets/scss`
- where to find the final styling policy versus explanatory references

## Core idea

The workspace does not treat styling as page-local taste.

Styling is a shared system with:

- ownership in `./layers/base`
- consumption in components, layouts, and pages

## Detailed rules

1. Name with classes, not tags or IDs.
2. Name by responsibility, not appearance.
3. Name by meaning, not implementation detail.
4. A block must make sense on its own.
5. A block is the styling root.
6. Use lowercase kebab-case for block names.
7. Use `__` only for true block-owned parts.
8. If something is reusable on its own, make it a block instead of an element.
9. Use `--` only for controlled variation.
10. Keep the base block class when applying a modifier.
11. Element modifiers keep the full chain.
12. A modifier must not style unrelated descendants by accident.
13. Shared blocks use `ui-*`.
14. Theme-owned blocks use `{theme}-*`.
15. Keep namespace stable across the whole block family.
16. Avoid location-based names unless location is the real responsibility.
17. Avoid one-off page naming for reusable patterns.
18. Prefer domain language over filler words like `box` or `wrapper`.
19. Keep selectors low-specificity and single-purpose.
20. Do not encode DOM depth into the class name.
21. Do not create deep pseudo-BEM chains like `block__element__child`.
22. Use modifiers for stable options such as `--dense`, `--subtle`, `--primary`, `--danger`.
23. Do not use throwaway modifiers such as `--special`, `--new`, `--test`, or `--v2`.
24. Keep names understandable directly in HTML.
25. Treat shared names as long-lived public API.

## Good examples

- `ui-panel`
- `ui-panel__header`
- `ui-panel--dense`
- `admin-filter-bar`
- `admin-filter-bar__actions`
- `admin-filter-bar--compact`

## Bad examples

- `blue-button`
- `rounded-card`
- `left-box`
- `text-sm-title`
- `button--primary` without `button`
