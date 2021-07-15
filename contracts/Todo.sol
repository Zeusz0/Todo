pragma solidity ^0.7.0;

contract Todo{
    uint public taskCount = 0;

    struct Task{
        uint id;
        string name;
        string content;
        bool done;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string name,
        string content,
        bool done
    );

    event TaskCompleted(
        uint id,
        bool done
    );

    constructor() public{
        createTask("TodoList","Create TodoList Dapp with Solidity and Hardhat, with React FrontEnd");
    }

    function createTask(string memory _name, string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount, _name, _content, false);
        emit TaskCreated(taskCount, _name, _content,false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.done);
    }

}