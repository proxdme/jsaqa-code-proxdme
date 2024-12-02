const sorting = require("../../app");

describe("Books names test suite", () => {
  it("should sort books names in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("should return an empty array if input is an empty array", () => {
    expect(sorting.sortByName([])).toEqual([]);
  });

  it("should handle books with different cases", () => {
    expect(
      sorting.sortByName([
        "властелин Колец",
        "Гарри Поттер",
        "ВОЛШЕБНИК изумрудного города",
      ])
    ).toEqual([
      "ВОЛШЕБНИК изумрудного города",
      "властелин Колец",
      "Гарри Поттер",
    ]);
  });

  it("should correctly handle two identical book names", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Гарри Поттер",
        "Властелин Колец",
      ])
    ).toEqual([
      "Гарри Поттер",
      "Гарри Поттер",
      "Властелин Колец",
    ]);
  });

}); 
