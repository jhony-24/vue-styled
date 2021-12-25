# Vue Styled

### Creating basic components

```js
// elements.js

import { styled } from "vue-styled";

// Heading component
const Heading = styled("h1", {
  color: "rgb(30,90,90)",
  letterSpacing: "10px",
  fontSize: "10px",
});

// Wrapper component with props
const HeadingWrapper = styled("div", ({ spacing }) => ({
  border: "1px solid silver",
  margintop: spacing,
  marginBottom: spacing,
}));

export { Heading, HeadingWrapper };
```

```html
<template>
  <HeadingWrapper spacing="20px">
    <Heading>Hello here</Heading>
  </HeadingWrapper>
</template>
<script>
  import { HeadingWrapper, Heading } from "./elements";

  export default {
    components: {
      HeadingWrapper,
      Heading,
    },
  };
</script>
```

### Using tailwind like class names

```js
import { styled } from "vue-styled";

const Heading = styled("h1", "text-blue-400 text-lg tracking-widest");
```

### Using tailwind and custom class names

```js
import { styled } from "vue-styled";

const Heading = styled(
  "h1",
  "text-blue-400 text-lg tracking-widest",
  ({ spacing }) => ({
    margintop: spacing,
    marginBottom: spacing,
  })
);
```

Then, You use it like before described components.

### Creating a theme provider

```html
<template>
  <ThemeProvider :theme="theme">
    <Heading>Hello here</Heading>
  </HeadingWrapper>
</template>
<script>
import { ThemeProvider, styled } from "vue-styled";

const theme = {
  colors: {
    primary : "red",
    secondary: "blue",
  },
  sizes : {
    sm : "30px"
  } 
  // ...other props
}

const Heading = styled(
  "h1",
  "text-lg tracking-widest",
  { theme }) => ({
    color: theme.colors.primary,
    marginBottom: theme.sizes.sm
  })
);

export default {
  components: {
    ThemeProvider,
    Heading,
  },
};
</script>
```
