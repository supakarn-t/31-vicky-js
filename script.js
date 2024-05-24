// create product > รับ input เข้ามาเก็บใน obj ใน array แล้ว show product ที่ dashboard
// checkbox > ต้องรู้ว่า product ไหนโดน check อยู่
// พอกด add to cart เอา product ตัวที่ check อยู่มาแสดง (ต้องสร้าง array ของตัวที่โดน check เพิ่ม)
// มีปุ่มกดลบได้ product ใน cart ได้
// พอกดลบ product ต้องหายจากทั้งหน้า cart และใน array ที่เก็บ product ที่โดน check
// กด calculate ก็แสดงราคาที่ต้องจ่าย คำนวณจาก price ของ product ที่โดน check

// -------------------- create product to productList -------------------- //
// รับ input เข้ามา ใส่ในตัวแปร
// เอาตัวแปรเก็บใน obj ของ product นั้น แล้วเก็บรวมไว้ใน array ของ product อีกที
// ต้องมี id ของแต่ล่ะ product ด้วย เอาไว้ค้นหาง่ายๆ
// ต้องมี checkbox status ด้วย เวลา check ก็ให้มาอัพเดทค่าตรงนี้
// พอกด create ก็ต้อง render ออกมา
// แล้วก็รีเซ็ตค่าใน input

const productList = [];
let cartList = [];
let productId = 1;
const inputError = document.getElementById("inputError");
const productDashboard = document.getElementById("productDashboard");
const productCart = document.getElementById("productCart");
const popupMessage = document.getElementById("popupMessage");

document.getElementById("form").addEventListener("submit", function (event) {
	event.preventDefault();

	const productName = document.getElementById("productName").value.trim();
	const price = document.getElementById("price").value;
	const image = document.getElementById("image").value;

	// validate input
	// name
	if (productName.length < 3) {
		inputError.textContent = "Please enter a valid name.";
		return;
	}
	// img
	if (!isImg(image)) {
		inputError.textContent = "Please enter a valid image URL.";
		return;
	}

	const product = {
		id: productId++,
		name: productName,
		price: price,
		image: image,
		checkbox: false,
	};

	productList.push(product);

	// พอได้ product มา ก็เอาไป render ต่อเลย
	renderDashboard(product);

	// ล้างค่าใน form แล้วก็เคลียร์ error
	document.getElementById("form").reset();
	inputError.textContent = "";
});

// พอกด reset ให้ล้างค่า error message ด้วย
document.getElementById("form").addEventListener("reset", function () {
	inputError.textContent = "";
});

// -------------------- show product in dashboard -------------------- //
// ตอนนี้เรารู้แล้วว่าแต่ล่ะ product มีข้อมูลอะไรข้างในบ้าง เพราะเราส่ง obj มันเข้ามาเลย
// ต่อไปต้องสร้างการ์ดที่จะแสดง product แต่ละตัว ใช้ appenChild
// ดึงข้อมูลก็จาก product.name/price/image
// style ก็ไปทำใน html ก่อนจะได้ง่าย

function renderDashboard(product) {
	// productDashboard(html) > productCard
	const productCard = document.createElement("div");
	productCard.classList = "flex h-28";
	productDashboard.appendChild(productCard);

	// productCard > checkbox
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.name = "checkbox";
	checkbox.id = product.id;
	checkbox.classList = "mr-3 w-5";
	checkbox.onchange = function (event) {
		// event.target จะ return ค่าออกมาทั้ง <input ...>
		// .checked เหมือนจะเป็น method ที่เอาไว้เช็คสถานะ return ออกมาเป็น true/false
		const checkStatus = event.target.checked; // return true/false
		product.checkbox = checkStatus; // อัพเดทค่า checkbox ว่าโดน check อยู่รึป่าว เหมือน obj มัน pass by reference เพราะงั้นก็เลยแก้ค่าได้เลย
	};
	productCard.appendChild(checkbox);

	// productCard > productContent
	const productContent = document.createElement("div");
	productContent.classList =
		"flex w-full border border-neutral-500 rounded-xl overflow-hidden bg-white";
	productCard.appendChild(productContent);

	// productCard > productContent > productImage
	const productImage = document.createElement("img");
	productImage.src = product.image;
	productImage.alt = product.name;
	productImage.classList = "w-1/3";
	productContent.appendChild(productImage);

	// productCard > productContent > productInfo
	const productInfo = document.createElement("div");
	productInfo.classList = "flex flex-col gap-2 w-2/3 p-4 justify-center";
	productContent.appendChild(productInfo);

	// productCard > productContent > productInfo > productName
	const productName = document.createElement("h3");
	productName.textContent = product.name;
	productInfo.appendChild(productName);

	// productCard > productContent > productInfo > productPrice
	const productPrice = document.createElement("p");
	productPrice.textContent = usCurrency(product.price);
	productInfo.appendChild(productPrice);
}

// -------------------- show product in cart -------------------- //
// ตอนนี้รู้แล้วว่า product ตัวไหนโดน check อยู่ จาก product.checkbox ว่าเป็น true/false
// แต่มันเก็บอยู่ใน productList = [{...,product.checkbox},{...,product.checkbox},{...,product.checkbox}]
// ต้องการเฉพาะตัวที่ checkbox: true แล้วดึงตัว product มาเก็บไว้ใน cartList
// ก็ filter productList เอา product ที่ product.checkbox === true ได้ออกมาเป็น array ใหม่ เอาไป reassign ให้ cartList
// แล้วก็ foreach ให้ product ใน cartList แต่ล่ะตัวเข้าไปทำ function render
// ก็ควรจะได้ product ออกมาเหมือนตอน dashboard

// -------------------- delete product in cart -------------------- //

// -------------------- calculate product price -------------------- //

// -------------------- validating image -------------------- //
// allow jpg, png, gif
function isImg(image) {
	const input = new URL(image);
	return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

// -------------------- change currency style -------------------- //
// ติด $ เป็น string ต้องเปลี่ยนแค่ตอนแสดง ใช้เก็บค่าไปเลยไม่ได้ จะเอาไปคำนวณไม่ได้
function usCurrency(price) {
	const usPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
	return usPrice;
}
