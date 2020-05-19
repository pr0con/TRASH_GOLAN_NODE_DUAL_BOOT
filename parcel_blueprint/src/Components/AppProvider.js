import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import {navigate} from 'hookrouter';

export const AppContext = createContext();

export default function(props) {
	/* Nav Bar */
	const [ pms, setPms ] = useState(false); //profile menu state
	const [ pma, setPma ] = useState('Login / Sign Up'); //Profile menu action

	
	/* Menu Bar */
	const [ mbs, setMbs ] = useState('noop'); //menu bar state

	/* Errors */
	const [ errors, setErrors ] = useState({});

	/* Websocket , Jwt, User / App State */
	const [ rs, setRs ] = useState(0);
	const [ ws, setWs ] = useState(null); 
	const [ wsId, setWsId ] = useState('');
		
	const [ jwt, setJwt ] = useState(null);	
	const [ user, setUser ] = useState(null);

	
	/* Task Manager */
	const [ tasks, setTasks ] = useState([]);

	/* Expenses */
	const [ balance, setBalance ] = useState(0);
	const [ income, setIncome ] = useState(0);
	const [ expenses, setExpenses ] = useState(0);
	
	const [ positiveTransactions, setPositiveTransactions ] = useState([]);
	const [ negativeTransactions, setNegativeTransactions ] = useState([]);


	/* onload will navigate to */
	useEffect(() => {
		setPma('Login / Sign Up');	
		(mbs !== 'noop') ? navigate(mbs) : '';
	},[mbs]);
	useEffect(() => {setMbs('noop');},[pma]);
	
	
	useEffect(() => {
		let options = {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		};
		axios.get('https://trash.pr0con.io:1200/api/v1/auth/validate/cookie/token',options).then((res) => {
			('user' in res.data) ? setUser(res.data.user) : '';
			('jwt' in res.data) ? setJwt(res.data.jwt) : '';
		}, (error) => {
			error.response.data.at = '@AppProvider - UseEffect - Valdiate Cookie Token';
			setErrors(error.response.data);	
			
			setJwt(null);
			setUser(null);		
		});	
	},[]);
	
	
	/* For GoLang Websocket Connection */
	const request = (jwt,type,data) => {
		let payload = {
			jwt,
			type,
			data
		};
		ws.send(JSON.stringify(payload));
	}
	
	const heartbeat = async (ws) => {
		setTimeout(
			function() {
				console.log(ws.readyState);
				/*  0 	CONNECTING 	Socket has been created. The connection is not yet open.
					1 	OPEN 	The connection is open and ready to communicate.
					2 	CLOSING 	The connection is in the process of closing.
					3 	CLOSED 	The connection is closed or couldn't be opened.	
				*/
				if(rs !== ws.readyState) {
					setRs(ws.readyState);
				}	
				heartbeat(ws);			
			}
			.bind(this),
			1000	
		);
	}
	
	const configureWebsocket = async() => {
		ws.onopen = function(open_event) {
			ws.onmessage = function(event) {
				console.log(event);
				let tjo = JSON.parse(event.data);
				
				switch(tjo['type']) {
					case "requested-tasks":
						setTasks(JSON.parse(tjo['data']));
						break;
					case "requested-expenses":
						setPositiveTransactions([]);
						setNegativeTransactions([]);
						
						let expenseData = JSON.parse(tjo['data']);
						let p = 0;
						let n = 0;
						expenseData.forEach((exp) => {
							(exp.type == "POSITIVE") ? p += exp.amount : n += exp.amount;
							(exp.type == "POSITIVE") ? setPositiveTransactions((pt) => [...pt, exp]) : setNegativeTransactions((nt) => [...nt, exp]);
						});
						setBalance(Math.abs(p - n));
						setIncome(p);
						setExpenses(n);
						
						break;
					default:
						break;
				}
			}
			ws.onclose = function(close_event) {
				console.log(close_event);
			}
			ws.onerror = function(error_event) {
				console.log(error_event);
			}						
			
			//Opening request toserver
			request(jwt,'get-tasks','noop')
			request(jwt,'get-expenses','noop')
		}
	}
			
	useEffect(() => {
		if(jwt !== null) {
			if(ws === null) { setWs(new WebSocket('wss://trash.pr0con.io:1300/ws')) }
			if(ws !== null && rs === 0 ) { configureWebsocket(); heartbeat(ws); }	
		}
	},[jwt,ws,rs])
	
	
	return(
		<AppContext.Provider value={{ 
			pms, 
			setPms,
			pma, 
			setPma,
			
			mbs, 
			setMbs,
			
			errors, 
			setErrors,
			
			rs,
			ws,
			wsId,
			
			jwt,
			setJwt,
			
			request,
			
			user,
			setUser,			
			
			user, 
			setUser,
			
			tasks, 
			
			balance,
			income,
			expenses,
			
			positiveTransactions,
			negativeTransactions,				
		}}>
			{ props.children }
		</AppContext.Provider>		
	)
	
}