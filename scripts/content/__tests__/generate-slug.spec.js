import generateSlug from "../generate-slug"

const source = {
  name: "foo",
  children: [
    {
      name: "0 bar",
      children: [
        {
          name: "0.1 baz",
          id: "foo",
        },
        {
          name: "0.2 boz",
          id: "foo",
        },
        {
          name: "0.3 bez",
          children: [
            {
              name: "foo foo",
              id: "foo",
            },
            {
              name: "baz baz",
              id: "foo",
            },
          ],
        },
      ],
    },
    {
      name: "1 bez",
    },
  ],
}

const result = {
  name: "foo",
  children: [
    {
      name: "0 bar",
      children: [
        {
          name: "0.1 baz",
          id: "foo",
          path: "0/1-baz",
        },
        {
          name: "0.2 boz",
          id: "foo",
          path: "0/2-boz",
        },
        {
          name: "0.3 bez",
          children: [
            {
              name: "foo foo",
              id: "foo",
              path: "0/3-foo-foo",
            },
            {
              name: "baz baz",
              id: "foo",
              path: "0/3-baz-baz",
            },
          ],
        },
      ],
    },
    {
      name: "1 bez",
    },
  ],
}

describe("generate slug", () => {
  it("correctly", () => {
    expect(generateSlug(source)).toEqual(result)
  })
})
