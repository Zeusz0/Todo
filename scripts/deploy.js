const fs = require('fs');
async function main() {

    const [deployer] = await ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Todo = await ethers.getContractFactory("Todo");
    const todo = await Todo.deploy();
  
    console.log("Todo address:", todo.address);

    const data = {
        address: todo.address,
        abi: JSON.parse(todo.interface.format('json'))
    };
    fs.writeFileSync('frontend/src/contracts/Todo.json',JSON.stringify(data));
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });