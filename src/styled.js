import cxs from "cxs";

const getDynamicClassNames = (classNames, context) => {
  return cxs(
    typeof classNames === "function"
      ? classNames({ ...context.$attrs, theme: context.theme() })
      : classNames
  );
};

const ThemeProvider = {
  props: {
    theme: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getCurrentTheme() {
      return this.theme || {};
    },
  },
  provide() {
    return {
      theme: () => this.getCurrentTheme,
    };
  },
  render(createElement) {
    return createElement(
      "div",
      {
        attrs: {
          "data-app-theme": true,
        },
      },
      this.$slots.default
    );
  },
};

const styled = (tag, classNames, postClassNames = null) => {
  return {
    inject: {
      theme: {
        from: "theme",
        default: () => ({}),
      },
    },
    render(createElement) {
      const isString = typeof classNames === "string";
      const canGetOnlyClassNames = isString && postClassNames === null;
      const buildClassnames = canGetOnlyClassNames
        ? classNames
        : getDynamicClassNames(
            postClassNames !== null ? postClassNames : classNames,
            this
          );
      return createElement(
        tag,
        {
          class: `${buildClassnames} ${
            postClassNames === null ? "" : classNames
          }`,
          attrs: this.$attrs,
          props: this.$props,
          on: this.$listeners,
        },
        this.$slots.default
      );
    },
  };
};
export {
  styled,
  ThemeProvider,
};
