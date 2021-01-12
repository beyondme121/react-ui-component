test("test common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});

test("test to be true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("test number", () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test("test object", () => {
  // expect({ name: "sanfeng" }).toBe({ name: "sanfeng" });  // toBe是完全相同, 比较对象的值是否相同使用 toEqual
  expect({ name: "hello" }).toEqual({ name: "hello" });
});
