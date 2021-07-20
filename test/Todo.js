// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Todo contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Token;
  let hardhatToken;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Todo = await ethers.getContractFactory("Todo");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    hardhatToken = await Todo.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should give the number 1 tasks id", async function(){
      const task = await hardhatToken.tasks(1);
      expect(await task.id.toNumber()).to.equal(1);
    });

    it("Should give the task's name ", async function(){
      const task = await hardhatToken.tasks(1);
      expect(await task.name).to.equal("TodoList");
    });
  });

  describe("Creating task", function(){
    it("Should creat an other task and set it's name",async function(){
      await hardhatToken.createTask("Secondone","Should inc taskCount");
      const task = await hardhatToken.tasks(2);
      expect(await task.name).to.equal("Secondone");
    });

    it("Should creat an other task and inc. taskCount by 1",async function(){
      await hardhatToken.createTask("Secondone","Should inc taskCount");
      taskCount = await hardhatToken.taskCount();
      expect(await taskCount.toNumber()).to.equal(2);
    });
  });

  describe("Completing task", function(){
    it("Should mark the task as done", async function(){
      const task = await hardhatToken.tasks(1);
      //kimentem az eredeti bool értéket.
      const done = task.done;
      console.log("Before change:",done);
      await hardhatToken.toggleCompleted(1);

      const task2 = await hardhatToken.tasks(1);
      const done2 = task2.done;
      console.log("After change:",done2);

      expect(done2).to.not.equal(done);
    });
  });
});