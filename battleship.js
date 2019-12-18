// Detta är för antal rutor och storlek på spelbrädan
let rows = 10;
let cols = 10;
let squareSize = 50;

// För att få elementen i containern
let gameBoardContainer = document.getElementById("gameboard");

// för att se brädans kolumner
for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		
		// skapa en ny div HTML element för varje grid size och ställ dem rätt
		let square = document.createElement("div");
		gameBoardContainer.appendChild(square);

    // ge varje div element en unik id baserat på dess row och kolumn, som tex "s00"
		square.id = 's' + j + i;			
		
		// ge varje grid square cordinater: multiplicera nuvarande row eller kolumn nummer
		let topPosition = j * squareSize;
		let leftPosition = i * squareSize;			
		
		// här används CSS till att positionera dem till varje grid square på sidan
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}

/*    17 hits så avslutar spelet
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
let hitCount = 0;

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)

   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/
let gameBoard = [
				[0,0,0,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[1,0,0,0,0,0,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0,0]
				]

// kör fireTorpedo functionen när kvadraten är klickad
gameBoardContainer.addEventListener("click", fireTorpedo, false);


function fireTorpedo(e) {
    
	if (e.target !== e.currentTarget) {
        // extrakta row och kolumn # från HTML elementens id
		let row = e.target.id.substring(1,2);
		let col = e.target.id.substring(2,3);
        
				
		// om en spelare klickar på en ruta utan skepp, ändra då färg på rutan (svart färg)
		if (gameBoard[row][col] == 0) {
			e.target.style.background = '#000000';
			// ändrar färg för att indikera på att rutan redan har klickats på och att inga båtar finns
			gameBoard[row][col] = 3;
			
		// om en spelare trycker på en ruta med skepp, ändra då färg till röd
		} else if (gameBoard[row][col] == 1) {
			e.target.style.background = 'red';
			//  ändra denna rutans "value" till 2 för att indikera på att den träffat ett skepp
			gameBoard[row][col] = 2;
			
			// påbörja hitCount varje gång en båt träffats
			hitCount++;
			
			if (hitCount == 17) {
				alert("Alla av fiendens båtar har blivit skjutna, grattis du vann!");
			}
			
		// om en spelare redan har tryckt på en ruta, varna och säg till så de vet
		} else if (gameBoard[row][col] > 1) {
			alert("Du har redan skjutit på denna rutan, sluta slösa dina skott!.");
		}		
    }
    e.stopPropagation();
}
