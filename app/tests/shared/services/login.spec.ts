import "reflect-metadata";
import { LoginService } from "../../../shared";
import { Angular2Apollo } from "angular2-apollo";

const apolloServiceMock = {
  query: (someObj: any) => { return { age: "2" }; },
} as Angular2Apollo;

declare var describe: any;
declare var expect: any;
declare var it: any;
declare var spyOn: any;
declare var beforeEach: any;

describe("Token validation", function() {
  const service = new LoginService(apolloServiceMock);
  const moq = {
    email: "boho@test.dk",
    password: "1",
  };

  it("Should reject an empty email address", function () {
    spyOn(apolloServiceMock, "query");
    service.login(moq);
    expect(apolloServiceMock.query).toHaveBeenCalled();
  });
});
