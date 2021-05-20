import { Simulator, Service, createHttpApp, Person, person as createPerson, HttpHandler } from "@simulacrum/server";

const heartbeat: HttpHandler = function(_, res) {
  return function *() {
    res.status(200).json({ ok: true });
  };
};

const auth0Service: Service = {
  protocol: 'https',
  app: createHttpApp().get("/heartbeat", heartbeat),
};

export const auth0: Simulator = () => ({
  services: { auth0: auth0Service },
  scenarios: {
    /**
     * Here we just wrap the internal `person` scenario to augment
     * it with a username and password
     * but what we really need to have some way to _react_ to the person
     * having been created and augment the record at that point.
     */
    *person(store, faker) {
      let person: Person = yield createPerson(store, faker);
      let email = faker.internet.email(person.name, undefined);
      let password = faker.internet.password();
      let augmented = { ...person, email, password };
      store.slice('people').slice(person.id).set(augmented);
      return augmented;
    }
  }
});
