import test from "zora";

import isKeyDown, { dispose } from "./index";

const createKeyboardEvent = (type, key, keyCode) =>
  new KeyboardEvent(type, {
    view: window,
    bubbles: true,
    cancelable: true,
    char: key.toUpperCase(),
    key: key.toLowerCase(),
    shiftKey: false,
    keyCode
  });

const createFocusEvent = type =>
  new FocusEvent(type, {
    view: window,
    bubbles: true,
    cancelable: true
  });

test("captures keydown events", t => {
  document.body.dispatchEvent(createKeyboardEvent("keydown", "q", 81));
  document.body.dispatchEvent(createKeyboardEvent("keydown", "l", 76));

  t.ok(isKeyDown("q"), "should recognize that 'q' is pressed");
  t.ok(isKeyDown("l"), "should recognize that 'l' is pressed");
});

test("captures keyup events", t => {
  document.body.dispatchEvent(createKeyboardEvent("keyup", "q", 81));

  t.ok(!isKeyDown("q"), "should recognize that 'q' is not pressed anymore");
  t.ok(isKeyDown("l"), "should recognize that 'l' is still pressed");
});

test("captures blur events", t => {
  document.body.dispatchEvent(createFocusEvent("blur"));

  t.ok(!isKeyDown("l"), "should recognize that 'l' is not pressed anymore");
});

test("exports all keys ever pressed", t => {
  const pressedKeys = Object.keys(isKeyDown());
  t.ok(pressedKeys.length === 2, "should export all keys ever pressed");
});

test("removes listeners on disposal", t => {
  dispose();

  const key = "q";
  const keyCode = 81;
  const event = createKeyboardEvent("keydown", key, keyCode);
  document.body.dispatchEvent(event);

  t.ok(!isKeyDown(key), "should not capture that 'q' is pressed");

  const pressedKeys = Object.keys(isKeyDown());
  t.ok(pressedKeys.length === 0, "list of pressed keys should be nullified");
});
