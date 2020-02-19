import React from "react";
import { Text } from "../index";
import { createMount } from "@material-ui/core/test-utils";
import ReactPlaceholder from "react-placeholder/lib";
import { Typography } from "@material-ui/core";

describe("Test Text component", () => {
  const mount = createMount();

  it("should render the text - h1 when loading", () => {
    const wrapper = mount(
      <Text variant="h1" placeHolder={{ loading: true, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find("h1").length).toEqual(0);
  });

  it("should render the text - h2 when not loading", () => {
    const wrapper = mount(
      <Text variant="h2" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });
  it("should render the text - h3 when not loading", () => {
    const wrapper = mount(
      <Text variant="h3" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });

  it("should render the text - h4 when not loading", () => {
    const wrapper = mount(
      <Text variant="h4" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });

  it("should render the text - h5 when not loading", () => {
    const wrapper = mount(
      <Text variant="h5" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });

  it("should render the text - body1 when not loading", () => {
    const wrapper = mount(
      <Text variant="body1" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });

  it("should render the text - body2 when not loading", () => {
    const wrapper = mount(
      <Text variant="body2" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });

  it("should render the text - default when not loading", () => {
    const wrapper = mount(
      <Text variant="inherit" placeHolder={{ loading: false, rows: 1 }}>
        Hello world
      </Text>
    );

    expect(wrapper.find(Typography).length).toEqual(1);
  });

  it("should render the text - body2 when not loading with class", () => {
    const wrapper = mount(
      <Text
        variant="body2"
        placeHolder={{ loading: false, rows: 1 }}
        wrapperClassName="Foobar"
      >
        Hello world
      </Text>
    );

    expect(wrapper.html()).toContain('class="Foobar"');
  });
});
