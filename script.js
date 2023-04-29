const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const player_score = document.getElementById("score");
const side = document.querySelector(".side");
let score = 0;
let speedX;
let speedY;
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
function showRules() {
	side.classList.remove("hide");
}

function closeRules() {
	side.classList.add("hide");
}

function blockBox(obj) {
	ctx.fillStyle = obj.color;
	ctx.beginPath();
	ctx.fillRect(obj.x, obj.y, obj.dx, obj.dy);
}
function blockArrayMaker(row, column) {
	let blockArr = [];
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

let blockArr = blockArrayMaker(9, 5);
const playerPad = {
	x: 200,
	y: 435,
	dx: 80,
	dy: 10,
	color: "dodgerblue",
	speed: 8,
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
	dx: 3,
	dy: 3,
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
let keyCount = 0;
function movePaddle(e) {
	console.log(e.key);
	if (e.key === "ArrowRight") {
		if (playerPad.x + playerPad.dx < canvas.width) {
			playerPad.speed = 7;
		} else {
			playerPad.speed = 0;
			playerPad.x = canvas.width - playerPad.dx - 5;
		}
	}
	if (e.key === "ArrowLeft") {
		if (playerPad.x > 0) {
			playerPad.speed = -7;
		} else {
			playerPad.speed = 0;
			playerPad.x = 5;
		}
	}
	if (e.key === "ArrowUp") {
		if (keyCount == 0) {
			speedX = ball.dx;
			speedY = ball.dy;
			ball.dx = 0;
			ball.dy = 0;
			keyCount++;
		}
	}
	if (e.key === "ArrowDown") {
		ball.dx = speedX;
		ball.dy = speedY;
		keyCount = 0;
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
		blockArr = blockArrayMaker(9, 5);
		score = 0;
		ball.dy *= -1;
		return;
	}
	for (let i = 0; i < blockArr.length; i++) {
		if (
			ball.x + ball.size >= blockArr[i].x &&
			ball.x - ball.size <= blockArr[i].x + blockArr[i].dx &&
			ball.y >= blockArr[i].y &&
			ball.y <= blockArr[i].y + blockArr[i].dy
		) {
			ball.dx *= -1;
			blockArr.splice(i, 1);
			score++;
			break;
		}
		if (
			ball.y - ball.size <= blockArr[i].y + blockArr[i].dy &&
			ball.y + ball.size >= blockArr[i].y &&
			ball.x >= blockArr[i].x &&
			ball.x <= blockArr[i].x + blockArr[i].dx
		) {
			ball.dy *= -1;
			blockArr.splice(i, 1);
			score++;
			break;
		}
	}

	if (
		ball.y + ball.size >= playerPad.y &&
		ball.x >= playerPad.x &&
		ball.x <= playerPad.x + playerPad.dx
	) {
		ball.dy *= -1;
	}
}
animation();
