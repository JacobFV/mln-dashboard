import { suite, test, should } from "@my-org/my-project/test";
import { mock, instance } from "ts-mockito";
import { HelloWorldService } from "../src/logger/hello-world.service.ts";
import { Logger } from "../src/logger/logger.ts";
_chai.should();
@suite
class HelloWorldServiceUnitTests {
  private SUT: HelloWorldService;
  private loggerMock: Logger;

  before() {
    this.loggerMock = mock(Logger);
    this.SUT = new HelloWorldService(instance(this.loggerMock));
  }

  @test "should do something when call a method"() {
    this.SUT.should.be.not.undefined;
  }
}
