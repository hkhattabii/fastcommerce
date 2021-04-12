const fetch = require("isomorphic-unfetch");
const init = require("@/lib/runner");
const { PRODUCT_SERVICE } = require("@/lib/serviceRegistry");

var Id;
const prdt = {
  name: "Bonnet Lacoste",
  initPrice: 19.99,
  gender: "Homme",
  category: "Bonnet",
  brand: "Lacoste",
  img: "http://google.com",
  reductionPercent: 5,
};

beforeAll(() => {
  return init();
});

describe("Product", () => {
  test("Product should be inserted successfully", async (done) => {
    const res = await fetch(PRODUCT_SERVICE.ROOTTEST, {
      method: "POST",
      body: JSON.stringify(prdt),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data).toStrictEqual({
      success: true,
      message: "Le produit a bien été ajouté !",
    });

    const productRes = await fetch(PRODUCT_SERVICE.SEARCH("Bon", "test"), {
      method: "GET",
    });
    const productData = await productRes.json();

    console.log(productData);
    expect(productRes.status).toStrictEqual(200);
    expect(productData).toEqual({
      exhaustiveNbHits: true,
      hits: [
        {
          _highlightResult: {
            brand: {
              matchLevel: "none",
              matchedWords: [],
              value: "Lacoste",
            },
            category: {
              fullyHighlighted: false,
              matchLevel: "full",
              matchedWords: ["bon"],
              value: "<em>Bon</em>net",
            },
            name: {
              fullyHighlighted: false,
              matchLevel: "full",
              matchedWords: ["bon"],
              value: "<em>Bon</em>net Lacoste",
            },
          },
          brand: "Lacoste",
          category: "Bonnet",
          gender: "Homme",
          img: "http://google.com",
          initPrice: 19.99,
          name: "Bonnet Lacoste",
          objectID: "629863000",
          reductionPercent: 5,
        },
      ],
      hitsPerPage: 20,
      nbHits: 1,
      nbPages: 1,
      page: 0,
      params: "query=Bon",
      processingTimeMS: 1,
      query: "Bon",
    });
    done();
  });

  /*
  test('Product should be deleted successfully', (done) => {
    const res = await fetch(
      PRODUCT_SERVICE.DELETE(),
      {
      method: 'DELETE',
      body: JSON.stringify({ id: 2 }),
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data).toStrictEqual({
      success: true,
      message: 'Le produit a bien été supprimé !',
    });
    done();
  });
  */
});
