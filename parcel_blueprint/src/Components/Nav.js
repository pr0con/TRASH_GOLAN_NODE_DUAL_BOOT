import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {navigate} from 'hookrouter';
import { AppContext } from './AppProvider.js';

const StyledNav = styled.div`
	width: 100%;
	height: 8rem;
	background: #1a1b3f;
	
	display: flex;
	flex-direction: row;
	padding: 1rem;
	align-items: center;
	
	#navbar-function {
		display: flex;
		align-items: center;
		
		svg {
			height: 3rem;
			margin-right: 1rem;
		}
		${({mbs}) => mbs == "servers" && `
			svg{
				color: #ff85b2;
			}
		`}		
		${({mbs}) => mbs == "projects" && `
			svg{
				color: #9381d3;
			}
		`}		
		${({mbs}) => mbs == "tasks" && `
			svg{
				color: #0897ff;
			}
		`}
		${({mbs}) => mbs == "expenses" && `
			svg{
				color: #ff936c;
			}
		`}				
	}
	
	svg.no-profile {
		width: 3rem;
		height: 3rem;
	}
	
	#nav-init-profile-text {
		font-size: 1.2rem;
		margin: 0 2rem 0 1rem;
	}

	svg.profile-drop-arrow {
		width: 3rem;
		height: 3rem;
		padding-bottom: .8rem;
		&:hover{
			cursor:pointer;
		}		
	}
	
	#account-profile-menu{
		position: absolute;
		top: 8rem;
		right: 0rem;
		min-width 20rem;
		z-index: 1;	
		
		
		background: #1f2047;
		display: flex;
		flex-direction: column;
		
		height: 0px;
		overflow:hidden;
		transition: all .2s;
		
		&.true {
			height: auto;
		}		
		
		.account-profile-menu-item {
			min-height: 4rem;
			display:flex;
			align-items:center;
			padding: 0 0 0 2rem;
			font-weight: bold;
			
			&:hover {
				background: #6868b1;
				cursor:pointer;
			}						
		}						
	}					
`;

export function Nav() {
	const {  mbs, setMbs, pms, setPms, pma, setPma, user, setUser, setJwt } = useContext(AppContext);
	
	
	useEffect(() => {
		setPms(false);
		switch(pma) {
			case "Logging In":
				navigate('/login');
				break;
			case "Signing Up":
				navigate('/signup');
				break;
			default:
				break;
		}
	},[pma]);
	
	const doLogout = () => {
		let options = {
			withCredentials: true //Need this to pass cookie with get request...
		};
		axios.get('https://trash.pr0con.io:1200/api/v1/auth/logout', options).then((res) => {
			console.log(res);
			setUser(null);
			setJwt(null);			
		}, (error) => {
			error.response.data.at = '@ Nav - doLogout';
			setErrors(error.response.data);			
		});
	}
	
		
	return(
		<StyledNav onMouseLeave={ (e) => setPms(false) } mbs={mbs}>
			<div id="navbar-function">
				{ mbs == "servers" &&
					<>
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="server" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-server fa-w-16 fa-3x"><path fill="currentColor" d="M376 256c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm-40 24c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zm176-128c0 12.296-4.629 23.507-12.232 32 7.603 8.493 12.232 19.704 12.232 32v80c0 12.296-4.629 23.507-12.232 32 7.603 8.493 12.232 19.704 12.232 32v80c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-80c0-12.296 4.629-23.507 12.232-32C4.629 319.507 0 308.296 0 296v-80c0-12.296 4.629-23.507 12.232-32C4.629 175.507 0 164.296 0 152V72c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v80zm-480 0c0 8.822 7.178 16 16 16h416c8.822 0 16-7.178 16-16V72c0-8.822-7.178-16-16-16H48c-8.822 0-16 7.178-16 16v80zm432 48H48c-8.822 0-16 7.178-16 16v80c0 8.822 7.178 16 16 16h416c8.822 0 16-7.178 16-16v-80c0-8.822-7.178-16-16-16zm16 160c0-8.822-7.178-16-16-16H48c-8.822 0-16 7.178-16 16v80c0 8.822 7.178 16 16 16h416c8.822 0 16-7.178 16-16v-80zm-80-224c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zm-64 0c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zm64 240c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z" className=""></path></svg>
						<span>Servers</span>
					</>					
				}
				{ mbs == "projects" &&
					<>
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="project-diagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-project-diagram fa-w-20 fa-2x"><path fill="currentColor" d="M592 0h-96c-26.51 0-48 21.49-48 48v32H192V48c0-26.51-21.49-48-48-48H48C21.49 0 0 21.49 0 48v96c0 26.51 21.49 48 48 48h94.86l88.76 150.21c-4.77 7.46-7.63 16.27-7.63 25.79v96c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48v-96c0-26.51-21.49-48-48-48h-96c-5.2 0-10.11 1.04-14.8 2.57l-83.43-141.18C184.8 172.59 192 159.2 192 144v-32h256v32c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM32 144V48c0-8.82 7.18-16 16-16h96c8.82 0 16 7.18 16 16v96c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16zm336 208c8.82 0 16 7.18 16 16v96c0 8.82-7.18 16-16 16h-96c-8.82 0-16-7.18-16-16v-96c0-8.82 7.18-16 16-16h96zm240-208c0 8.82-7.18 16-16 16h-96c-8.82 0-16-7.18-16-16V48c0-8.82 7.18-16 16-16h96c8.82 0 16 7.18 16 16v96z" className=""></path></svg>								
						<span>Projects</span>
					</>
				}				
				{ mbs == "tasks" &&
					<>
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="tasks" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-tasks fa-w-16 fa-2x"><path fill="currentColor" d="M145.35 207a8 8 0 0 0-11.35 0l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 250.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a8 8 0 0 0 0-11.32zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a32 32 0 0 0 0-64zm82.42-337A8 8 0 0 0 134 47l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 90.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a8 8 0 0 0 0-11.32zM503 400H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-320H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8V88a8 8 0 0 0-8-8zm0 160H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z" className=""></path></svg>					
						<span>Tasks</span>		
					</>							
				}
				{ mbs == "expenses" &&
					<>
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="money-check-edit-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-money-check-edit-alt fa-w-20 fa-3x"><path fill="currentColor" d="M425.23 406.49A32.06 32.06 0 0 0 448 416h64a32 32 0 0 0 32-32v-64a32 32 0 0 0-9.5-22.76L246.68 12.07a41.15 41.15 0 0 0-58.24 0l-48.38 48.4A41.48 41.48 0 0 0 128 89.89 40.68 40.68 0 0 0 140.34 119zM289.46 100L512 320v64h-64L228.1 161.4l61.36-61.4zM162.69 83.09l48.39-48.4A9.21 9.21 0 0 1 217.6 32a9 9 0 0 1 6.45 2.69l44.53 44.54-61.36 61.38-44.53-44.54a9.18 9.18 0 0 1 0-12.98zM224 408a8 8 0 0 0 8 8h157.61l-31.71-32H232a8 8 0 0 0-8 8zm8-88h62.49l-31.71-32H232a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm376-192H409.15l32.3 32H608v320H32V160h104l-18-18.12A73.25 73.25 0 0 1 107.13 128H32a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32zM136 424h16a8 8 0 0 0 8-8v-16.12c23.62-.63 42.67-20.54 42.67-45.07 0-20-13-37.81-31.58-43.39l-45-13.5c-5.16-1.54-8.77-6.78-8.77-12.73 0-7.27 5.29-13.19 11.79-13.19h28.11a24 24 0 0 1 12.82 3.72 8.21 8.21 0 0 0 10.13-.73l11.75-11.21a8 8 0 0 0-.57-12.14A57.15 57.15 0 0 0 160 240.29V224a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v16.12c-23.62.63-42.67 20.55-42.67 45.07 0 20 13 37.81 31.58 43.39l45 13.5c5.16 1.54 8.77 6.78 8.77 12.73 0 7.27-5.29 13.19-11.79 13.19h-28.12a24.08 24.08 0 0 1-12.77-3.72 8.21 8.21 0 0 0-10.13.73l-11.8 11.21a8 8 0 0 0 .57 12.14A57.23 57.23 0 0 0 128 399.71V416a8 8 0 0 0 8 8z" className=""></path></svg>
						<span>Expenses</span>
					</>
				}
				{ mbs == "state" &&
					<>
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-eye fa-w-18 fa-2x"><path fill="currentColor" d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z"></path></svg>	
						<span>State</span>
					</>
				}								
			</div>
			
			<div className="flex-row-filler"></div>
			<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="head-side" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="no-profile svg-inline--fa fa-head-side fa-w-16 fa-3x"><path fill="currentColor" d="M509.21 275c-20.94-47.12-48.44-151.73-73.08-186.75C397.68 33.6 334.56 0 266.09 0h-66.08C95.47 0 4.12 80.08.14 184.55-2.13 244.33 23.1 298.14 64 334.82V504c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V320.54L85.36 311c-35.65-31.97-55.06-77.62-53.25-125.23C35.35 100.98 110.66 32 200.01 32h66.08c57.19 0 110.97 27.91 143.86 74.66 12.52 17.8 29.11 66.74 42.45 106.07 9.73 28.71 18.93 55.83 27.57 75.27H416v96c0 17.64-14.36 32-32 32h-96v88c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64c35.35 0 64-28.65 64-64v-64h31.96c23.16 0 38.65-23.84 29.25-45zM352 192c0-17.67-14.33-32-32-32s-32 14.33-32 32 14.33 32 32 32 32-14.33 32-32z" className=""></path></svg>
			
			{ user === null && <div id="nav-init-profile-text"> { pma }</div> }
			{ user !== null && <div id="nav-init-profile-text"> { user.email } </div> }
			<div onMouseEnter={(e) => setPms(true)}><svg  aria-hidden="true" focusable="false" data-prefix="fal" data-icon="sort-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="profile-drop-arrow svg-inline--fa fa-sort-down fa-w-10 fa-2x"><path fill="currentColor" d="M287.968 288H32.038c-28.425 0-42.767 34.488-22.627 54.627l127.962 128c12.496 12.496 32.758 12.497 45.255 0l127.968-128C330.695 322.528 316.45 288 287.968 288zM160 448L32 320h256L160 448z" className=""></path></svg></div>			
			
			<div id="account-profile-menu" className={pms ? 'true' : 'false'} >
				{ user === null && 
					<>
						<div className="account-profile-menu-item" onClick={(e) => setPma('Logging In')}>Login</div>
						<div className="account-profile-menu-item" onClick={(e) => setPma('Signing Up')}>Sign Up</div>						
					</>
				}
				{ user !== null &&
					<>
						<div className="account-profile-menu-item" onClick={(e) => navigate('/profile')}>Profile / Users</div>
						<div className="account-profile-menu-item" onClick={(e) => doLogout()}>Logout</div>						
					</>
				}	
			</div>	
		</StyledNav>
	)
}



