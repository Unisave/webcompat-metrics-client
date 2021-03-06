/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import renderer from "react-test-renderer";

import { Container } from "..";

it("renders Container default correctly", () => {
  const tree = renderer
    .create(
      <Container title="I'm a title" style={{ color: "green" }}>
        <div>{"container"}</div>
      </Container>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Container without style", () => {
  const tree = renderer
    .create(
      <Container title="I'm a title">
        <span>{"container"}</span>
      </Container>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
