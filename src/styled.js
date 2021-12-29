import cxs from "cxs";
const getClassnames = ({ classNames, attrs, theme }) => {
  return typeof classNames === "function"
    ? classNames({ ...attrs, theme })
    : classNames;
};

const getDynamicClassNames = (classNames, context) => {
  return cxs(
    getClassnames({
      classNames,
      attrs: context.$attrs,
      theme: typeof context?.theme === "function" ? context.theme() : {},
    })
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
          }`.trim(),
          attrs: {
            ...this.$attrs,
            __styled__: JSON.stringify(
              getClassnames({
                attrs: this.$props,
                classNames:
                  postClassNames !== null ? postClassNames : classNames,
              })
            ),
          },
          props: {
            ...this.$props,
          },
          on: this.$listeners,
        },
        this.$slots.default
      );
    },
  };
};
export { styled, ThemeProvider };
