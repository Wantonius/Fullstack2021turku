import {Injectable} from '@angular/core';

@Injectable()
export class GameMechanics {
	
	private currentTarget:number = 0;
	private numberOfGuesses:number = 0;
	
	startGame() {
		this.numberOfGuesses = 0;
		this.currentTarget = Math.floor(Math.random()*100)+1;
	}
	
	runGame(guess:number) {
		this.numberOfGuesses++;
		if(guess > this.currentTarget) {
			return {
				type:"high",
				numberOfGuesses:this.numberOfGuesses
			}
		}
		if(guess < this.currentTarget) {
			return {
				type:"low",
				numberOfGuesses:this.numberOfGuesses
			}
		}
		let winObject = {
			type:"win",
			numberOfGuesses:this.numberOfGuesses
		}
		this.currentTarget = 0;
		this.numberOfGuesses = 0;
		return winObject;
	}
}