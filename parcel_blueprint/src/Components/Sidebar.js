import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {navigate} from 'hookrouter';
import { AppContext } from './AppProvider.js';

const StyledSidebar = styled.div`
	background: #1f2047;
	display: flex;
	flex-direction: column;
	
	#sidebar-header{
		display:flex;
		flex-direction: row;
		padding: 5rem 0 2rem 2rem;
		align-items:center;
		
		svg {
			width: 5rem;
			margin-right: 1rem;
		}
		
		#sidebar-header-text {
			display: flex;
			flex-direction: column;
			#sidebar-header-text-line-one {
				font-size: 3rem;
				text-transform: uppercase;
			}			
			#sidebar-header-text-line-two {
				font-size: 1.4rem;
				background: linear-gradient(to right, #e66465, #9198e5);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;			
			}						
		}
		&:hover	{
			cursor:pointer;
		}
	}	
	#sidebar-menu {
		display: flex;
		flex-direction: column;
		
		.sidebar-menu-item {
			display: flex;
			height: 4rem;
			align-items:center;
			
			&:not(:first-child) {
				margin-top: 1rem;
			}
			
			svg{
				width: 3rem;
				margin: 0 2rem 0 1.5rem;
			}			
			
			&:hover{
				background: #6868b1;
				cursor: pointer;
			}
			
			&.servers-servers {
				border-left: 2px solid #ff85b2;
				color: #ff85b2;
				flex-direction: row-reverse;
				justify-content: space-around;
			}
			&.projects-projects {
				border-left: 2px solid #9381d3;
				color: #9381d3;
				flex-direction: row-reverse;
				justify-content: space-around;				
			}
			&.tasks-tasks {
				border-left: 2px solid #0897ff;
				color: #0897ff;
				flex-direction: row-reverse;
				justify-content: space-around;				
			}
			&.expenses-expenses {
				border-left: 2px solid #ff936c;
				color: #ff936c;
				flex-direction: row-reverse;
				justify-content: space-around;				
			}
			&.state-state {
				border-left: 2px solid #fff;
				flex-direction: row-reverse;
				justify-content: space-around;					
			}												
		}
	}

`;

export function Sidebar() {
	const { mbs, setMbs } = useContext(AppContext); //menu bar state

	
	return(
		<StyledSidebar>
			<div id="sidebar-header" onClick={(e) => navigate('/')}> 
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265.59 316.46">
					<defs>  
					   <linearGradient id="gradient">  
					     <stop offset="0" stopColor="#e66465" stopOpacity="0.5" />  
					     <stop offset="1" stopColor="#e66465" stopOpacity="1" />  
					   </linearGradient>
					   
					   <mask id="gradient-mask">  
					     <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)"  />  
					   </mask>  
					</defs>
					
				
					<g id="Layer_2" data-name="Layer 2" mask="url(#gradient-mask)">
						<g id="Layer_1-2" data-name="Layer 1" fill="#f188c4">
							<path className="cls-1" d="M132.79,316.46a35.76,35.76,0,0,1-18.8-5.4l-95.2-58.95C7.2,244.92,0,231.55,0,217.19V99.27C0,84.92,7.2,71.54,18.79,64.36L114,5.41a35.37,35.37,0,0,1,37.6,0l95.2,59c11.6,7.18,18.8,20.56,18.8,34.91V217.19c0,14.35-7.2,27.73-18.8,34.91l-95.2,59A35.76,35.76,0,0,1,132.79,316.46Zm0-305.82a26.27,26.27,0,0,0-13.84,4l-95.2,59A30.23,30.23,0,0,0,9.92,99.27V217.19c0,10.57,5.3,20.42,13.83,25.7l95.2,59a26.49,26.49,0,0,0,27.68,0l95.2-59c8.54-5.29,13.84-15.14,13.84-25.7V99.27c0-10.56-5.3-20.41-13.84-25.7l-95.2-58.95A26.25,26.25,0,0,0,132.79,10.64Z"/>
							<path className="cls-1" d="M137.52,289.84l51.33-29.63A31.26,31.26,0,0,0,148,240.12c-5.21,1.92-5.21,1.92-6.52-3.46l-6.84-35.72a17.39,17.39,0,0,1-4.19.76,17.47,17.47,0,0,1-4.2-.76l-6.84,35.72c-1.31,5.38-1.31,5.38-6.52,3.46A31.26,31.26,0,0,0,72.19,259.8l52,30A13.51,13.51,0,0,0,137.52,289.84Z"/>
							<path className="cls-2" d="M147.71,158.17l.33-3c.4-4,2-16,2-17.77V137c0-48.28-19-74.54-19.16-74.8l-.77-.74-.6.76c-8.61,12.09-19.09,34.89-19.09,74.79v.4c0,1.87,1.37,14,1.56,16.57,0,.36.21,2.29.21,2.29l.12,1.69,0,0-8,6.27a2,2,0,0,0-.58,2.26l2.54,6.74,7.62,15.35.24-.07,0,.07v-.07l.39-.11-.45-1.67-.45-12.91c.27.06.51.15.77.21,1.74.43,3.58.76,5.47,1l2.23,5.94a22.4,22.4,0,0,0,15.91,0l2.23-5.94c1.7-.26,3.37-.55,4.95-.92.41-.09.79-.21,1.19-.32l-.31,11.47-.71,2.75,1,.9,7-15.54,2.57-6.83a2,2,0,0,0-.58-2.26l-7.62-6.17m-1.24.91h0l0,.05Z"/>
							<path className="cls-3" d="M130.35,116.59a9.79,9.79,0,1,1,9.78-9.78A9.8,9.8,0,0,1,130.35,116.59Zm0-16.07a6.29,6.29,0,1,0,6.29,6.29A6.29,6.29,0,0,0,130.35,100.52Z"/>
						</g>
					</g>
				</svg>
				<div id="sidebar-header-text">
					<div id="sidebar-header-text-line-one">Pr0con.io</div>
					<div id="sidebar-header-text-line-two">Advance</div>
				</div>			
			</div>
			<div id="sidebar-menu">
				<div className={`sidebar-menu-item ${mbs}-servers`} onClick={(e) => setMbs('servers')}>
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="server" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-server fa-w-16 fa-3x"><path fill="currentColor" d="M376 256c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm-40 24c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zm176-128c0 12.296-4.629 23.507-12.232 32 7.603 8.493 12.232 19.704 12.232 32v80c0 12.296-4.629 23.507-12.232 32 7.603 8.493 12.232 19.704 12.232 32v80c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-80c0-12.296 4.629-23.507 12.232-32C4.629 319.507 0 308.296 0 296v-80c0-12.296 4.629-23.507 12.232-32C4.629 175.507 0 164.296 0 152V72c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v80zm-480 0c0 8.822 7.178 16 16 16h416c8.822 0 16-7.178 16-16V72c0-8.822-7.178-16-16-16H48c-8.822 0-16 7.178-16 16v80zm432 48H48c-8.822 0-16 7.178-16 16v80c0 8.822 7.178 16 16 16h416c8.822 0 16-7.178 16-16v-80c0-8.822-7.178-16-16-16zm16 160c0-8.822-7.178-16-16-16H48c-8.822 0-16 7.178-16 16v80c0 8.822 7.178 16 16 16h416c8.822 0 16-7.178 16-16v-80zm-80-224c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zm-64 0c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zm64 240c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z" className=""></path></svg>					
					<span className="sidebar-menu-item-label">Servers</span>
				</div>
				<div className={`sidebar-menu-item ${mbs}-projects`} onClick={(e) => setMbs('projects')}>
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="project-diagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-project-diagram fa-w-20 fa-2x"><path fill="currentColor" d="M592 0h-96c-26.51 0-48 21.49-48 48v32H192V48c0-26.51-21.49-48-48-48H48C21.49 0 0 21.49 0 48v96c0 26.51 21.49 48 48 48h94.86l88.76 150.21c-4.77 7.46-7.63 16.27-7.63 25.79v96c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48v-96c0-26.51-21.49-48-48-48h-96c-5.2 0-10.11 1.04-14.8 2.57l-83.43-141.18C184.8 172.59 192 159.2 192 144v-32h256v32c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM32 144V48c0-8.82 7.18-16 16-16h96c8.82 0 16 7.18 16 16v96c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16zm336 208c8.82 0 16 7.18 16 16v96c0 8.82-7.18 16-16 16h-96c-8.82 0-16-7.18-16-16v-96c0-8.82 7.18-16 16-16h96zm240-208c0 8.82-7.18 16-16 16h-96c-8.82 0-16-7.18-16-16V48c0-8.82 7.18-16 16-16h96c8.82 0 16 7.18 16 16v96z" className=""></path></svg>								
					<span className="sidebar-menu-item-label">Projects</span>
				</div>
				<div className={`sidebar-menu-item ${mbs}-tasks`} onClick={(e) => setMbs('tasks')}>
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="tasks" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-tasks fa-w-16 fa-2x"><path fill="currentColor" d="M145.35 207a8 8 0 0 0-11.35 0l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 250.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a8 8 0 0 0 0-11.32zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a32 32 0 0 0 0-64zm82.42-337A8 8 0 0 0 134 47l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 90.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a8 8 0 0 0 0-11.32zM503 400H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-320H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8V88a8 8 0 0 0-8-8zm0 160H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z" ></path></svg>					
					<span className="sidebar-menu-item-label">Tasks</span>
				</div>
				<div className={`sidebar-menu-item ${mbs}-expenses`} onClick={(e) => setMbs('expenses')}>
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="money-check-edit-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-money-check-edit-alt fa-w-20 fa-3x"><path fill="currentColor" d="M425.23 406.49A32.06 32.06 0 0 0 448 416h64a32 32 0 0 0 32-32v-64a32 32 0 0 0-9.5-22.76L246.68 12.07a41.15 41.15 0 0 0-58.24 0l-48.38 48.4A41.48 41.48 0 0 0 128 89.89 40.68 40.68 0 0 0 140.34 119zM289.46 100L512 320v64h-64L228.1 161.4l61.36-61.4zM162.69 83.09l48.39-48.4A9.21 9.21 0 0 1 217.6 32a9 9 0 0 1 6.45 2.69l44.53 44.54-61.36 61.38-44.53-44.54a9.18 9.18 0 0 1 0-12.98zM224 408a8 8 0 0 0 8 8h157.61l-31.71-32H232a8 8 0 0 0-8 8zm8-88h62.49l-31.71-32H232a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm376-192H409.15l32.3 32H608v320H32V160h104l-18-18.12A73.25 73.25 0 0 1 107.13 128H32a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32zM136 424h16a8 8 0 0 0 8-8v-16.12c23.62-.63 42.67-20.54 42.67-45.07 0-20-13-37.81-31.58-43.39l-45-13.5c-5.16-1.54-8.77-6.78-8.77-12.73 0-7.27 5.29-13.19 11.79-13.19h28.11a24 24 0 0 1 12.82 3.72 8.21 8.21 0 0 0 10.13-.73l11.75-11.21a8 8 0 0 0-.57-12.14A57.15 57.15 0 0 0 160 240.29V224a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v16.12c-23.62.63-42.67 20.55-42.67 45.07 0 20 13 37.81 31.58 43.39l45 13.5c5.16 1.54 8.77 6.78 8.77 12.73 0 7.27-5.29 13.19-11.79 13.19h-28.12a24.08 24.08 0 0 1-12.77-3.72 8.21 8.21 0 0 0-10.13.73l-11.8 11.21a8 8 0 0 0 .57 12.14A57.23 57.23 0 0 0 128 399.71V416a8 8 0 0 0 8 8z" className=""></path></svg>
					<span className="sidebar-menu-item-label">Expenses</span>
				</div>
				<div className={`sidebar-menu-item ${mbs}-state`} onClick={(e) => setMbs('state')}>
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-eye fa-w-18 fa-2x"><path fill="currentColor" d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z"></path></svg>
					<span className="sidebar-menu-item-label">State</span>
				</div>																	
			</div>		
		</StyledSidebar>
	)
}