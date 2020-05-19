import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppProvider.js';


const StyledExpenses = styled.div`
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
	
	background: #6ab284;
	
	#expenses-form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
		background: #2c2c2c;
		
		width: 120rem;
		height: 60rem;
		
		border-radius: .4rem;
		-webkit-box-shadow: 1px 13px 51px -6px rgba(0,0,0,0.38);
		-moz-box-shadow: 1px 13px 51px -6px rgba(0,0,0,0.38);
		box-shadow: 1px 13px 51px -6px rgba(0,0,0,0.38);
		
		display: grid;
		grid-template-columns: 40rem 32rem 32rem;
		
		padding: 8rem;
		
		#expenses-form-left {
			padding-right: 4rem;		
			
			#expenses-form-left-title {
				color:#fb7a40;
				font-size: 5rem;
				text-align:center;
				text-transform: uppercase;
			}
			#expenses-form-left-balance-wrapper {
				color: #fdebee;
				font-size: 3rem;
				text-align:center;
				#expenses-form-left-balance-title {
					margin: 10rem 0 2rem 0;
				}
			}
			#expenses-form-left-totals-wrapper {
				margin-top: 10rem;
				display: grid;
				grid-template-columns: 1fr 1fr;
				text-align: center;
				
				#expenses-form-left-totals-positive-title,
				#expenses-form-left-totals-positive-amount {
					color: #73b38a;
					font-size: 2rem;
				}	
				#expenses-form-left-totals-negative-title,
				#expenses-form-left-totals-negative-amount {
					color: #ff856a;
					font-size: 2rem;					
				}					
			}
		}
		#expenses-form-center {
			padding-left: 4rem;
			padding-right: 4rem;
			
			input {
				width: 100%;
				padding: 1rem 1rem 1rem 0;
				border: 0px;
				background: transparent;
				border-bottom: 1px solid #757575;
				color: #d0cee7;
				&::placeholder {
					color: #676766;
				}
			}
			#expenses-form-submit-positive {
				margin-top: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #6ab284;
				height: 3rem;
				max-width: 10rem;
				border-radius: .5rem;
				font-size: 1.4rem;
				&:hover {
					cursor:pointer;
				}
				-webkit-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
				-moz-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
				box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);				
			}
			#expenses-form-center-title {
				margin: 10rem 0 2rem 0;
				font-size: 2rem;
			}
			
			.positive-transaction {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: .5rem;
				
				.positive-transaction-info-wrapper {
					margin-right: 1rem;
					background: #518868;
					border-radius: .2rem;
					color: #fff;
					padding: .5rem;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					

					-webkit-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
					-moz-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
					box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);					
				}
				svg {
					width: 1.2rem;
					color: #ef593a;
					&:hover {
						cursor:pointer;
					}
				}
			}
		}
		#expenses-form-right {
			padding-left: 4rem;
						
			input {
				width: 100%;
				padding: 1rem 1rem 1rem 0;
				border: 0px;
				background: transparent;
				border-bottom: 1px solid #757575;
				color: #d0cee7;
				&::placeholder {
					color: #676766;
				}
			}
			#expenses-form-submit-negative {
				margin-top: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #ff886b;
				height: 3rem;
				max-width: 10rem;
				border-radius: .5rem;
				font-size: 1.4rem;
				&:hover {
					cursor:pointer;
				}
				-webkit-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
				-moz-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
				box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);				
			}
			#expenses-form-right-title {
				margin: 10rem 0 2rem 0;
				font-size: 2rem;
			}
			.negative-transaction {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: .5rem;
				
				.negative-transaction-info-wrapper {
					margin-right: 1rem;
					background: #e36e52;
					border-radius: .2rem;
					color: #fff;
					padding: .5rem;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					

					-webkit-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
					-moz-box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);
					box-shadow: 10px 10px 4px -10px rgba(0,0,0,0.75);					
				}
				svg {
					width: 1.2rem;
					color: #ef593a;
					&:hover {
						cursor:pointer;
					}
				}
			}						
		}					
	}	
`;	

function addZeroes(num) {
	return num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2})
}

export function Expenses() {
	const { jwt, rs, request, balance, income, expenses, positiveTransactions, negativeTransactions  } = useContext(AppContext);
	
	const [ newIncome, setNewIncome ] = useState('');
	const [ newIncomeAmount, setNewIncomeAmount ] = useState('');

	const [ newExpense, setNewExpense ] = useState('');
	const [ newExpenseAmount, setNewExpenseAmount ] = useState('');
	
	const handleSubmit = (type) => {
		if(jwt != null) {
			if((Number.isInteger(parseInt(newIncomeAmount)) && type == "POSITIVE") || (Number.isInteger(parseInt(newExpenseAmount)) && type == "NEGATIVE")) {
				(type == "POSITIVE") ? request(jwt,"insert-expense", JSON.stringify({ label: newIncome, amount:parseInt(newIncomeAmount), type: type })) : request(jwt,"insert-expense", JSON.stringify({ label: newExpense, amount:parseInt(newExpenseAmount), type: type }));	
				setNewIncome('');
				setNewIncomeAmount('');
				setNewExpense('');
				setNewExpenseAmount('');					
			} 
		}
	}
	
	return(
		<StyledExpenses>
			<div id="expenses-form">
				<div id="expenses-form-left">
					<div id="expenses-form-left-title">Expenses App</div>
					<div id="expenses-form-left-balance-wrapper">
						<div id="expenses-form-left-balance-title">Your Balance</div>
						<div id="expenses-form-left-balance"> { Math.sign(income - expenses) === -1 ? '-' : ''}${addZeroes(balance)}</div>
					</div>
					<div id="expenses-form-left-totals-wrapper">
						<div id="expenses-form-left-totals-positive-title">Income</div>
						<div id="expenses-form-left-totals-negative-title">Expenses</div>
						<div id="expenses-form-left-totals-positive-amount">+${addZeroes(income)}</div>
						<div id="expenses-form-left-totals-negative-amount">-${addZeroes(expenses)}</div>
					</div>
				</div>
				<div id="expenses-form-center">
					<input type="text" placeholder="Add Income..." onChange={(e) => setNewIncome(e.target.value)} value={newIncome} />
					<input type="text" placeholder="Amount" onChange={(e) => setNewIncomeAmount(e.target.value)} value={newIncomeAmount} />
					<div id="expenses-form-submit-positive" onClick={(e) => handleSubmit('POSITIVE')}>Submit</div>
					
					<div id="expenses-form-center-title">Transaction History</div>
					{ positiveTransactions.length > 0 && positiveTransactions.map((pt) => (
						<div className="positive-transaction" key={pt._id}>
							<div className="positive-transaction-info-wrapper"><span>{ pt.label }</span><span>${pt.amount}</span></div>
							<svg onClick={(e) => request(jwt, "delete-expense", pt._id)} aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-trash fa-w-14 fa-2x"><g className="fa-group"><path fill="currentColor" d="M53.2 467L32 96h384l-21.2 371a48 48 0 0 1-47.9 45H101.1a48 48 0 0 1-47.9-45z" className="fa-secondary"></path><path fill="currentColor" d="M0 80V48a16 16 0 0 1 16-16h120l9.4-18.7A23.72 23.72 0 0 1 166.8 0h114.3a24 24 0 0 1 21.5 13.3L312 32h120a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16A16 16 0 0 1 0 80z" className="fa-primary"></path></g></svg>													
						</div>
					))}
				</div>
				<div id="expenses-form-right">
					<input type="text" placeholder="Add Expense..." onChange={(e) => setNewExpense(e.target.value)} value={newExpense} />
					<input type="text" placeholder="Amount" onChange={(e) => setNewExpenseAmount(e.target.value)} value={newExpenseAmount} />
					<div id="expenses-form-submit-negative" onClick={(e) => handleSubmit('NEGATIVE')}>Submit</div>
					
					<div id="expenses-form-right-title">Transaction History</div>
					{ negativeTransactions.length > 0 && negativeTransactions.map((nt) => (
						<div className="negative-transaction" key={nt._id}>
							<div className="negative-transaction-info-wrapper"><span>{ nt.label }</span><span>${nt.amount}</span></div>
							<svg onClick={(e) => request(jwt, "delete-expense", nt._id)} aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-trash fa-w-14 fa-2x"><g className="fa-group"><path fill="currentColor" d="M53.2 467L32 96h384l-21.2 371a48 48 0 0 1-47.9 45H101.1a48 48 0 0 1-47.9-45z" className="fa-secondary"></path><path fill="currentColor" d="M0 80V48a16 16 0 0 1 16-16h120l9.4-18.7A23.72 23.72 0 0 1 166.8 0h114.3a24 24 0 0 1 21.5 13.3L312 32h120a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16A16 16 0 0 1 0 80z" className="fa-primary"></path></g></svg>													
						</div>
					))}										
				</div>
			</div>
		</StyledExpenses>
	)
}