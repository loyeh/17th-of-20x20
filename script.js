const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const player_score = document.getElementById("score");
let score = 0;
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

function blockBox(obj) {
	ctx.fillStyle = obj.color;
	ctx.beginPath();
	ctx.fillRect(obj.x, obj.y, obj.dx, obj.dy);
}
function blockArrayMaker(row, column) {
	const blockArr = [];
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < column; j++) {
			let x = 35 + 60 * i;
			let y = 50 + 25 * j;
			let dx = 50;
			let dy = 15;
			let color = "dodgerblue";
			const block = { x, y, dx, dy, color };
			blockArr.push(block);
		}
	}
	return blockArr;
}

const blockArr = blockArrayMaker(9, 5);
const playerPad = {
	x: 200,
	y: 435,
	dx: 80,
	dy: 10,
	color: "dodgerblue",
	speed: 5,
};
// blockArr.push(playerPad);
function drawBlocks() {
	blockArr.forEach((block) => {
		blockBox(block);
		blockBox(playerPad);
	});
}
// blockBox(20, 435, 80, 10, "black");
const ball = {
	x: 10,
	y: 200,
	size: 6,
	dx: 2,
	dy: 2,
};

function drawBall() {
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fill();
}
function update() {
	drawBlocks();

	ball.x += ball.dx;
	ball.y += ball.dy;
	player_score.innerText = score;
	checkContact();
	drawBall();
}

function animation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	update();
	requestAnimationFrame(animation);
}
document.addEventListener("keydown", movePaddle);
document.addEventListener("keyup", stopPaddle);

function movePaddle(e) {
	if (e.key === "ArrowRight") {
		if (playerPad.x + playerPad.dx < canvas.width) {
			// let int = setInterval(() => {
			// 	playerPad.speed += 0.015;
			// }, 100);
			playerPad.speed = 5;
		} else {
			playerPad.speed = 0;
			playerPad.x = canvas.width - playerPad.dx - 1;
			// clearInterval(int);
		}
	}
	if (e.key === "ArrowLeft") {
		if (playerPad.x > 0) {
			// let int = setInterval(() => {
			// 	playerPad.speed -= 0.015;
			// }, 100);
			playerPad.speed = -5;
		} else {
			playerPad.speed = 0;
			playerPad.x = 1;
			// clearInterval(int);
		}
	}
	playerPad.x += playerPad.speed;
}

function stopPaddle() {
	playerPad.speed = 0;
}

function checkContact() {
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1;
	}
	if (ball.y - ball.size < 0) {
		ball.dy *= -1;
	}
	if (ball.y + ball.size > canvas.height) {
		window.location.reload();
		return;
	}
	for (let i = 0; i < blockArr.length; i++) {
		if (
			ball.x + ball.size > blockArr[i].x &&
			ball.x - ball.size < blockArr[i].x + blockArr[i].dx &&
			ball.y - ball.size > blockArr[i].y &&
			ball.y + ball.size < blockArr[i].y + blockArr[i].dy
		) {
			ball.dx *= -1;
			blockArr.splice(i, 1);
			score++;
			break;
		}
		if (
			ball.y - ball.size < blockArr[i].y + blockArr[i].dy &&
			ball.y + ball.size > blockArr[i].y &&
			ball.x + ball.size > blockArr[i].x &&
			ball.x - ball.size < blockArr[i].x + blockArr[i].dx
		) {
			ball.dy *= -1;
			blockArr.splice(i, 1);
			score++;
			break;
		}
	}

	if (
		ball.y + ball.size > playerPad.y &&
		ball.x > playerPad.x &&
		ball.x < playerPad.x + playerPad.dx
	) {
		ball.dy *= -1;
	}
}
animation();
