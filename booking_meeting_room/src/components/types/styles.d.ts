// Объявления для CSS/SCSS модулей

// Для обычных CSS файлов
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Для SCSS/SASS файлов
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// Для импортов с побочным эффектом (просто подключение стилей)
declare module '*.css' {
  const src: string;
  export default src;
}

declare module '*.scss' {
  const src: string;
  export default src;
}