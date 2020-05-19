import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider.js';

const StyledTasks = styled.div`
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
		
	background: #b63267;
	background: linear-gradient(to right bottom,  #c13a70 50%, #b63267 50%); 
	
	#tasks-form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
		width: 32rem;
		height: 50rem;
		background: #292f3b;
		

		-webkit-box-shadow: 1px 13px 51px -6px rgba(0,0,0,0.38);
		-moz-box-shadow: 1px 13px 51px -6px rgba(0,0,0,0.38);
		box-shadow: 1px 13px 51px -6px rgba(0,0,0,0.38);			

		display: flex;
		flex-direction: column;
		color: #a1a7a9;
			
		#tasks-form-title {
			text-align: center;
			margin: 2rem 0 2rem 0;
			font-size: 2.4rem;
		}
		input {
			background: #1c222e;
			border-top-left-radius: 2rem;
			border-bottom-left-radius: 2rem;
			border-top-right-radius: 2rem;
			border-bottom-right-radius: 2rem;				
			height: 4rem;
			width: 90%;
			margin: 0 auto;
			border: 1px solid #373d45;
			text-indent: 2rem;
			color: #ccc2cd;
			
			&::placeholder {
				color: #676464;
			}
		}
		#task-form-actions{
			display:flex;
			justify-content:center;
			margin-top: 2rem;
			
			#add-update-task-button,
			#clear-task-button {
				width: 10rem;
				height: 3rem;
				border-top-left-radius: 1.5rem;
				border-bottom-left-radius: 1.5rem;
				border-top-right-radius: 1.5rem;
				border-bottom-right-radius: 1.5rem;
				
				display:flex;
				justify-content:center;
				align-items:center;
				
				-webkit-box-shadow: 3px 6px 44px -7px rgba(0,0,0,0.57);
				-moz-box-shadow: 3px 6px 44px -7px rgba(0,0,0,0.57);
				box-shadow: 3px 6px 44px -7px rgba(0,0,0,0.57);					
				background: #811c41;
				
				&:hover{
					cursor:pointer;
				}					
			}
			#add-update-task-button {
				margin-right: 2rem;
			}			
		}
		#task-list {
			margin-top: 2rem;
			display: flex;
			flex-direction: column;
			
			.task {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 90%;
				margin: 0 auto;
				margin-top: .7rem;
				font-size: 1.2rem;
				
				.task-actions {
					display: flex;
					align-items:center;
					
					svg {
						width: 1.2rem;
						margin-right: .5rem;
						&:hover{
							cursor:pointer;
						}
					}
				}
			}
		}	
	}
`;

export function Tasks() {
	const { jwt, rs, request, tasks } = useContext(AppContext)
	
	const [ tid, setTid ] = useState('');
	const [ newTask, setNewTask ] = useState('');
	
	const prepareUpdate = (t) => {
		setTid(t._id);
		setNewTask(t.task);
	}
	
	return(
		<StyledTasks>
			{rs}
			<div id="tasks-form">
				<div id="tasks-form-title">Task Manager</div>
				<input type="text" onChange={(e) => setNewTask(e.target.value)} value={newTask} placeholder="Add Task..."/>
				<div id="task-form-actions">
					<div id="add-update-task-button">
						{ tid == '' &&
							<div onClick={(e) => { request(jwt,'insert-task', JSON.stringify({ task: newTask })); setTid(''); setNewTask(''); }}>Add Task</div>
						}
						{ tid != '' &&
							<div onClick={(e) => { request(jwt, 'update-task', JSON.stringify({ id: tid, task: newTask })); setTid(''); setNewTask(''); }}>Update Task</div>
						}
					</div>
					<div id="clear-task-button">
						<div onClick={(e) => {setTid(''); setNewTask('')}}>Clear</div>
					</div>
				</div>
				<div id="task-list">
					{ tasks.length > 0 && tasks.map((t) => (
						<div className="task" key={t._id}>
							<span>{ t.task }</span>
							<div className="task-actions">
								<svg onClick={(e) => request(jwt,'delete-task',t._id) } aria-hidden="true" focusable="false" data-prefix="fal" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-trash-alt fa-w-14 fa-2x"><path fill="currentColor" d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z" ></path></svg>									
								<svg onClick={(e) => prepareUpdate(t)} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-pencil fa-w-16 fa-2x"><path fill="currentColor" d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z" className=""></path></svg>														
							</div>
						</div>
					))}
						
				</div>
			</div>
		</StyledTasks>
	)
}
