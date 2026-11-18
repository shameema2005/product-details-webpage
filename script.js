const products=[
{name:"ProBook Laptop",price:"₹54,999",description:"A lightweight laptop for everyday work, study and entertainment.",extra:"Key features: 15.6-inch display, 8 GB RAM, 512 GB SSD and Wi-Fi."},
{name:"Wireless Headphones",price:"₹2,499",description:"Comfortable over-ear headphones with clear sound and long battery life.",extra:"Key features: Bluetooth, built-in microphone and up to 30 hours of playback."},
{name:"Smart Watch",price:"₹3,299",description:"Track daily activity, check notifications and monitor your routine.",extra:"Key features: touch display, activity tracking and notification alerts."},
{name:"Smartphone X",price:"₹19,999",description:"A bright display, capable camera and smooth performance in one device.",extra:"Key features: 128 GB storage, dual camera, large battery and fast charging."}
];
const dialog=document.getElementById("product-dialog");
document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>{
const p=products[Number(button.dataset.product)];
document.getElementById("dialog-title").textContent=p.name;
document.getElementById("dialog-description").textContent=p.description;
document.getElementById("dialog-price").textContent=p.price;
document.getElementById("dialog-extra").textContent=p.extra;dialog.showModal();
}));
document.querySelector(".close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
