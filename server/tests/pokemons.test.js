const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

beforeAll(async () => {
  await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Pokemon Endpoints", () => {
  let userToken;
  let createdPokemonId;

  // login a user to get a session token
  beforeAll(async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "testpassword",
    });
    userToken = res.headers["set-cookie"][0];
  });

  it("should create a new pokemon", async () => {
    const res = await request(app)
      .post("/pokemons")
      .set("Cookie", userToken)
      .send({
        name: "Testy",
        imgUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
        types: ["normal"],
        abilities: ["limber", "impostor"],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Testy");
    createdPokemonId = res.body._id;
  });

  // Fetch all Pokémon
  it("should fetch all pokemons", async () => {
    const res = await request(app).get("/").set("Cookie", userToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Fetch a specific Pokémon by ID
  it("should fetch a pokemon by id", async () => {
    const res = await request(app)
      .get(`/pokemons/${createdPokemonId}`)
      .set("Cookie", userToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Testy");
  });

  // Update the Pokémon
  it("should update the pokemon", async () => {
    const res = await request(app)
      .patch(`/pokemons/${createdPokemonId}`)
      .set("Cookie", userToken)
      .send({
        name: "Testy V0",
        imgUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        types: ["ghost"],
        abilities: ["limber", "impostor"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Testy V0");
  });

  // Delete the Pokémon
  it("should delete the pokemon", async () => {
    const res = await request(app)
      .delete(`/pokemons/${createdPokemonId}`)
      .set("Cookie", userToken);
    expect(res.statusCode).toEqual(204);
  });

  // Check if the Pokémon is deleted
  it("should return 404 for deleted pokemon", async () => {
    const res = await request(app)
      .get(`/pokemons/${createdPokemonId}`)
      .set("Cookie", userToken);
    expect(res.statusCode).toEqual(404);
  });
});
