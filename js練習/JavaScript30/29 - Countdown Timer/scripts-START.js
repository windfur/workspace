const buttonlist = document.querySelectorAll("button");
const timeleft = document.querySelector(".display__time-left");
const endtime = document.querySelector(".display__end-time");
const custom = document.querySelector("#custom");

var mins = 0;
var secs = 0;
var lefttime = 0;
var intervalid;
var date = new Date();

buttonlist.forEach(btn => btn.addEventListener("click", setTime));
console.log(custom);
custom.addEventListener("keydown", setTime);


function setTime(e) {
	console.log(e);
	console.log(this);
	//init setinterval
	clearInterval(intervalid);
	
	if(e.keyCode === 13)
	{
		lefttime = this.firstElementChild.value * 60;
		comeback(lefttime);
		intervalid = window.setInterval(countdown,1000);
		this.reset();
		// console.log(this.firstElementChild.value);
		// console.log(lefttime);

		//讓enter不要reload頁面
		e.returnValue = false;
	}
	if(e.type === "click" && this.className === "timer__button")
	{
		// clearInterval(intervalid);
		lefttime = parseInt(this.dataset.time);
		comeback(lefttime);
		intervalid = window.setInterval(countdown,1000);
	}
}

function countdown() {
	
	mins = Math.floor(lefttime / 60);
	secs = lefttime % 60;

	console.log(lefttime / 60);
	console.log(mins, secs);
	var context = `${mins} : ${secs}`
	timeleft.textContent = context;
	document.title = context;

	if(lefttime <= 0)
	{
		console.log("finish");
		clearInterval(intervalid);
	}
	console.log(lefttime);
	lefttime--;
}

function comeback(inittime) {
	var back_hr = Math.floor((Math.floor(inittime / 60)) / 60) + date.getHours();
	var back_min = Math.floor(inittime / 60) + date.getMinutes();
	endtime.textContent = `Be Back At ${back_hr} : ${back_min}`;
}

//bos版本 enter不回傳，比較好的寫法，preventDefault()會通知瀏覽器不要執行與事件關聯的默認動作
// document.customForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   const mins = this.minutes.value;
//   console.log(mins);
//   timer(mins * 60);
//   this.reset();
// });
