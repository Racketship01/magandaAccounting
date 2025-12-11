<!-- @format -->

<template>
  <div class="logo-container flex items-center">
    <!-- Horizontal "next" portion -->
    <span class="logo-text horizontal">next</span>

    <!-- Apostrophe -->
    <span class="logo-text apostrophe">'</span>

    <!-- Stylized "1" or "i" with dot -->
    <div class="logo-text stylized-one">
      <span class="one-dot">●</span>
      <span class="one-stem">1</span>
    </div>

    <!-- Vertical "one" portion -->
    <div class="logo-text vertical-one">
      <span class="vertical-letter">o</span>
      <span class="vertical-letter">n</span>
      <span class="vertical-letter">e</span>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  letter-spacing: -0.02em;
  display: inline-flex;
  align-items: baseline;
}

.logo-text {
  color: currentColor;
  line-height: 1;
}

.horizontal {
  font-size: 1.125rem;
  font-weight: 500;
  display: inline-block;
}

.apostrophe {
  font-size: 1.125rem;
  margin-left: -0.05em;
  display: inline-block;
  vertical-align: baseline;
}

.stylized-one {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.125rem;
  margin-left: -0.05em;
  height: 1.125rem;
  vertical-align: baseline;
}

.one-dot {
  font-size: 0.35rem;
  line-height: 1;
  display: block;
  margin-bottom: 0.05em;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background-color: currentColor;
}

.one-stem {
  font-size: 1.125rem;
  line-height: 1;
  font-weight: 500;
  display: block;
  margin-top: -0.1em;
}

.vertical-one {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 0.2em;
  height: 1.125rem;
  font-size: 0.8rem;
  line-height: 0.9;
  vertical-align: baseline;
}

.vertical-letter {
  display: block;
  transform: none;
  height: 0.375rem;
}

/* Dark mode support */
.dark .logo-container {
  color: white;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .horizontal,
  .apostrophe,
  .stylized-one,
  .one-stem {
    font-size: 1rem;
  }

  .stylized-one {
    height: 1rem;
  }

  .vertical-one {
    font-size: 0.7rem;
    height: 1rem;
  }

  .one-dot {
    font-size: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
  }

  .vertical-letter {
    height: 0.33rem;
  }
}
</style>
