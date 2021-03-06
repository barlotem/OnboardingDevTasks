import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../task/Task.jsx';
import { css } from 'glamor';
import { container, todos, noTasksAlert } from './taskList';
import { deleteTask, addTask, updateTask } from '../../store/actions';

function TaskList(props) {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);
	const [newTaskDescription, setNewTaskDescription] = useState('');

	const renderTasks = () => {
		if (Object.keys(tasks).length === 0)
			return <p {...css(noTasksAlert)}>There are no tasks</p>;
		return (
			<React.Fragment>
				{Object.keys(tasks).map((key) => (
					<Task
						key={key}
						task={tasks[key]}
						onDelete={() => dispatch(deleteTask(key))}
						onUpdateCompleteStatus={() => {
							let newTask = { ...tasks[key] };
							newTask.isComplete = !newTask.isComplete;
							dispatch(updateTask(key, newTask));
						}}
					/>
				))}
			</React.Fragment>
		);
	};

	return (
		<div {...css(container)} className='row text-center'>
			<div className='m-4'>
				<h1>My Todo list</h1>
				<input
					type='text'
					value={newTaskDescription}
					onChange={(event) => setNewTaskDescription(event.target.value)}
					className='m-2'
				></input>
				<button
					onClick={() => {
						dispatch(
							addTask({
								description: newTaskDescription,
								isComplete: false,
							})
						);
					}}
					className='btn btn-primary btn-sm'
				>
					Add Todo
				</button>
				<div>
					Open Todos:{' '}
					{
						Object.values(tasks).filter((task) => task.isComplete === false)
							.length
					}{' '}
					(Total: {Object.keys(tasks).length}){' '}
				</div>
				<div {...css(todos)}>{renderTasks()}</div>
			</div>
		</div>
	);
}

export default TaskList;
