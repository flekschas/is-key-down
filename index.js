const down = {};

const isKeyDown = key => (key ? down[key] : down);

const reset = () => {
  Object.keys(down).forEach(key => {
    down[key] = false;
  });
};

const keyup = ({ key }) => {
  down[key] = false;
};

const keydown = ({ key }) => {
  down[key] = true;
};

const dispose = () => {
  window.removeEventListener("keydown", keydown, false);
  window.removeEventListener("keyup", keyup, false);
  window.removeEbventListener("blur", reset, false);
};

reset();

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
window.addEventListener("blur", reset, false);

export default isKeyDown;

export { dispose };
