import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

--cl-bg-header: hsla(220, 7%, 18%, 1);
--cl-orange: hsla(13, 75%, 58%, 1);
--cl-orange-hover: hsla(12, 60%, 62%, 1);
--cl-white-global: hsla(0, 0%, 100%, 1);
--cl-text-sub: hsla(216, 4%, 51%, 1);
--cl-bg-menu-header: hsla(216, 9%, 21%, 1);
--cl-bg-slider: hsla(216, 8%, 12%, 1);
--cl-bg-theme: hsla(216, 8%, 38%, 1);
--cl-overlay: hsla(216, 4%, 51%, .5);
--cl-text-input: hsla(220, 7%, 18%, 1);



&,&.light-mode{
--cl-bg-m-p-title: hsla(0, 0%, 96%, 1);
--cl-bg-main: hsla(0, 0%, 100%, 1);
--cl-text-main: hsla(216, 9%, 23%, 1);
--cl-text-preview-header: hsla(216, 9%, 23%, 1);
--cl-text-paragraphs:hsla(216, 4%, 51%, 1);
--cl-bg-blockquote:hsla(0, 0%, 96%, 1);
--cl-main-border:hsla(0, 0%, 90%, 1);
--cl-overlay-delete: hsla(225, 9%, 9%, .5);
--cl-hr:hsla(216, 4%, 51%, 1);

}


&.dark-mode{
--cl-bg-m-p-title: hsla(216, 8%, 12%, 1);
--cl-bg-main: hsla(225, 9%, 9%, 1);
--cl-text-main: hsla(222, 9%, 78%, 1);
--cl-text-preview-header: hsla(0, 0%, 100%, 1);
--cl-bg-blockquote:hsla(0, 0%, 96%, 1);
--cl-text-paragraphs:hsla(222, 9%, 78%, 1);
--cl-bg-blockquote:hsla(220, 7%, 18%, 1); 
--cl-main-border:hsla(216, 8%, 38%, 1);
--cl-overlay-delete: hsla(216, 4%, 51%, .5);
--cl-hr: hsla(222, 9%, 78%, 1);
}




--color-neutral-white: hsl(0, 0%, 100%);
--color-neutral-black: hsl(0, 0%, 0%);
--color-neutral-off-white: hsl(0, 0%, 94%);
--color-neutral-light-gray: hsl(0, 0%, 86%);
--color-neutral-smokey-gray: hsl(0, 1%, 44%);
/* --color-neutral-off-black: hsl(0, 0%, 8%); */

 
}


#root{
height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  
}

/* Prevent font size inflation */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
   font-size: 62.5%;
   height: 100%;
}

/* Remove default margin in favour of better control in authored CSS */
body, h1, h2, h3, h4, h5, h6, p,
figure, blockquote, dl, dd {
  margin-block-end: 0;
}

/* Set core body defaults */
body {
  /* min-height: 100vh; */
  /* line-height: 1.5; */
   font-family: "Roboto", sans-serif;
   min-height: 100vh;
   /* width: 100vw; */


}
/* Remove list styles on ul, ol elements */
ul,
ol{
  /* list-style: none; */
}



/* Set shorter line heights on headings and interactive elements */
h1, h2, h3, h4, h5, h6
button, input, label {
  line-height: 1.1;
}

/* Balance text wrapping on headings */
h1, h2,
h3, h4, h5, h6 {
  /* text-wrap: balance; - not yet supporeted on some browsers */
overflow-wrap: break-word;
 hyphens: auto;
}


/* Make images easier to work with */
img,
picture {
  max-width: 100%;

}

/* Inherit fonts for inputs and buttons */
input, button,
textarea, select {
  font: inherit;
  color: inherit;
}

/* Make sure textareas without a rows attribute are not tiny */
/* textarea:not([rows]) {
  min-height: 10em;
} */

/* Anything that has been anchored to should have extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: gray;
  color: black;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid lightgray;
  outline-offset: -1px;
}

// remove the default arrows (spinner controls) from number inputs 
/* For Chrome, Safari, and newer versions of Edge */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* For Firefox */
/* input[type="number"] {
  -moz-appearance: textfield;
} */


button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

:-webkit-any(article, aside, nav, section) h1 {
   
    margin-block-start: 0;
    margin-block-end: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; 
  border: 0;
}

`;
export default GlobalStyles;
