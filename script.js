const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const blockArr = [];
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

function blockBox(x, y) {
	ctx.fillStyle = "dodgerblue";
	ctx.beginPath();
	ctx.fillRect(x, y, 70, 15);
}

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 5; j++) {
		let x = 45 + 80 * i;
		let y = 50 + 25 * j;
		const position = { x, y };
		blockArr.push(position);
	}
}
console.log(blockArr);
blockArr.forEach((position) => {
	blockBox(position.x, position.y);
});
