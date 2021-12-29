import { styled } from "../styled";
import { mount } from "@vue/test-utils";
describe("Styled component", () => {
  it("should show basic class names", () => {
    const classNames = "bg-red-200 bg-blue";
    const wrapper = mount(styled("div", classNames));
    expect(wrapper.attributes()).toHaveProperty("class");
    expect(wrapper.attributes().class).toBe(classNames);
  });
  it("should show two class names", () => {
    const Component = styled("div", ({ bg }) => ({
      background: bg,
      color: "green",
    }));
    const wrapper = mount(Component, {
      props: {
        bg: "red",
      },
    });
    console.log(wrapper.props());
  });
});
