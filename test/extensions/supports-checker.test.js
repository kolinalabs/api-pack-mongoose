const {
  SupportsChecker,
  FilterExtension,
  PagerExtension
} = require("../../src/extensions");

describe("SupportsChecker", () => {
  const operationCollectionGet = {
    method: "get",
    type: "collection"
  };

  const operationCollectionPost = {
    method: "post",
    type: "collection"
  };

  const operationItemGet = {
    method: "get",
    type: "item"
  };

  const operationItemPut = {
    method: "put",
    type: "item"
  };

  const operationItemDelete = {
    method: "delete",
    type: "item"
  };

  // Undefined
  const ExtensionSupportsUndefined = {};

  // Boolean
  const ExtensionSupportsTrue = { supports: true };
  const ExtensionSupportsFalse = { supports: false };

  // Function
  const ExtensionSupportsFunctionTrue = {
    supports(operation, query) {
      return true;
    }
  };

  const ExtensionSupportsFunctionFalse = {
    supports(operation, query) {
      return false;
    }
  };

  // Methods
  const ExtensionGet = { supports: "get" };
  const ExtensionPost = { supports: "post" };
  const ExtensionGetPut = { supports: ["get", "put"] };
  const ExtensionPostDelete = { supports: ["post", "delete"] };

  // Types
  const ExtensionItem = { supports: "item" };
  const ExtensionCollection = { supports: "collection" };
  const ExtensionItemCustom = { supports: ["item", "custom"] };
  const ExtensionCollectionCustom = { supports: ["collection", "custom"] };

  // Mixed
  const ExtensionCollectionPostSimple = {
    supports: "collection:post"
  };

  const ExtensionMixedComplex = {
    supports: ["collection:get", "item:get"]
  };

  const ExtensionUppercased = {
    supports: ["COLLECTION:GET", "POST", "DELETE"]
  };

  /**
   * When property "supports" is undefined
   */
  it("ExtensionSupportsUndefined", () => {
    expect(
      SupportsChecker.supports(
        ExtensionSupportsUndefined,
        operationCollectionGet
      )
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(
        ExtensionSupportsUndefined,
        operationCollectionPost
      )
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionSupportsUndefined, operationItemGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionSupportsUndefined, operationItemPut)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionSupportsUndefined, operationItemDelete)
    ).toBeTruthy();
  });

  /**
   * When property "supports" is boolean
   */
  it("ExtensionSupportsTrue/ExtensionSupportsFalse", () => {
    expect(SupportsChecker.supports(ExtensionSupportsTrue)).toBeTruthy();
    expect(SupportsChecker.supports(ExtensionSupportsFalse)).toBeFalsy();
  });

  /**
   * When property "supports" is function
   */
  it("ExtensionSupportsFunctionTrue/ExtensionSupportsFunctionFalse", () => {
    expect(
      SupportsChecker.supports(
        ExtensionSupportsFunctionTrue,
        operationCollectionGet
      )
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(
        ExtensionSupportsFunctionFalse,
        operationCollectionGet
      )
    ).toBeFalsy();
  });

  /**
   * When property "supports" is string (method)
   */
  it("ExtensionGet/ExtensionPost", () => {
    expect(
      SupportsChecker.supports(ExtensionGet, operationCollectionGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionGet, operationItemGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionPost, operationCollectionGet)
    ).toBeFalsy();

    expect(
      SupportsChecker.supports(ExtensionPost, operationItemGet)
    ).toBeFalsy();
  });

  /**
   * When property "supports" is string (type)
   */
  it("ExtensionItem/ExtensionCollection", () => {
    expect(
      SupportsChecker.supports(ExtensionItem, operationItemGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionItem, operationCollectionGet)
    ).toBeFalsy();

    expect(
      SupportsChecker.supports(ExtensionCollection, operationCollectionPost)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionCollection, operationItemGet)
    ).toBeFalsy();
  });

  /**
   * When property "supports" is array ([method1, method2, methodN...])
   */
  it("ExtensionGetPut/ExtensionPostDelete", () => {
    expect(
      SupportsChecker.supports(ExtensionGetPut, operationItemGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionGetPut, operationItemPut)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionPostDelete, operationItemGet)
    ).toBeFalsy();

    expect(
      SupportsChecker.supports(ExtensionPostDelete, operationItemPut)
    ).toBeFalsy();
  });

  /**
   * When property "supports" is array ([type1, type2, typeN...])
   */
  it("ExtensionItemCustom/ExtensionCollectionCustom", () => {
    expect(
      SupportsChecker.supports(ExtensionItemCustom, operationItemGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionItemCustom, operationItemPut)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionCollectionCustom, operationItemPut)
    ).toBeFalsy();
  });

  /**
   * When property "supports" is string format "type:method"
   */
  it("ExtensionCollectionPostSimple", () => {
    expect(
      SupportsChecker.supports(
        ExtensionCollectionPostSimple,
        operationCollectionPost
      )
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(
        ExtensionCollectionPostSimple,
        operationCollectionGet
      )
    ).toBeFalsy();
  });

  /**
   * When property "supports" is configured format:
   * ["type1:method1", "type2:method2", "typeN:methodN"]
   */
  it("ExtensionMixedComplex", () => {
    expect(
      SupportsChecker.supports(ExtensionMixedComplex, operationItemGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionMixedComplex, operationCollectionGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(ExtensionMixedComplex, operationItemPut)
    ).toBeFalsy();

    expect(
      SupportsChecker.supports(ExtensionMixedComplex, operationCollectionPost)
    ).toBeFalsy();
  });

  /**
   * When property "supports" is configured with uppercaded names
   */
  it("ExtensionUppercased", () => {
    expect(
      SupportsChecker.supports(ExtensionUppercased, operationCollectionGet)
    ).toBeTruthy();
  });

  /**
   * FilterExtension enabled only for "collection:get"
   */
  it("FilterExtension", () => {
    expect(
      SupportsChecker.supports(FilterExtension, operationCollectionPost)
    ).toBeFalsy();

    expect(
      SupportsChecker.supports(FilterExtension, operationCollectionGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(FilterExtension, operationItemGet)
    ).toBeFalsy();
  });

  /**
   * PagerExtension enabled only for "collection:get"
   */
  it("PagerExtension", () => {
    expect(
      SupportsChecker.supports(PagerExtension, operationCollectionPost)
    ).toBeFalsy();

    expect(
      SupportsChecker.supports(PagerExtension, operationCollectionGet)
    ).toBeTruthy();

    expect(
      SupportsChecker.supports(PagerExtension, operationItemGet)
    ).toBeFalsy();
  });
});
