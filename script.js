const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

console.log(ctx);

// window.addEventListener("resize", () => {
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	blockArr.forEach((position) => {
// 		blockBox(position.x, position.y);
// 	});
// });

function blockBox(x, y, dx, dy, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.fillRect(x, y, dx, dy);
}
function blockArrayMaker(row, column) {
	const blockArr = [];
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < column; j++) {
			let x = 35 + 60 * i;
			let y = 50 + 25 * j;
			let dx = 50;
			let dy = 15;
			const block = { x, y, dx, dy };
			blockArr.push(block);
		}
	}
	return blockArr;
}

const blockArr = blockArrayMaker(9, 5);
const playerPad = { x: 20, y: 435, dx: 80, dy: 10 };
blockArr.push(playerPad);
blockArr.forEach((block) => {
	blockBox(block.x, block.y, block.dx, block.dy, "dodgerblue");
});

// blockBox(20, 435, 80, 10, "black");
