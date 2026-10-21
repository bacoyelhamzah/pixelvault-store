const products = [
  {id:1,name:"Cyberpunk 2077",category:"Game PC",price:429000,description:"Petualangan open-world futuristik.",icon:"🌆",label:"PC GAME",glow:"#8d45c9"},
  {id:2,name:"Elden Ring",category:"Game PC",price:499000,description:"Jelajahi dunia fantasi yang luas.",icon:"⚔️",label:"RPG",glow:"#b88b36"},
  {id:3,name:"EA SPORTS FC 26",category:"Konsol",price:699000,description:"Rasakan atmosfer sepak bola modern.",icon:"⚽",label:"SPORTS",glow:"#298f82"},
  {id:4,name:"Minecraft",category:"Game PC",price:199000,description:"Bangun dunia sesuai kreativitasmu.",icon:"🧱",label:"SANDBOX",glow:"#568b42"},
  {id:5,name:"Voucher Steam Rp100.000",category:"Voucher",price:100000,description:"Saldo digital untuk game PC favorit.",icon:"🎟️",label:"VOUCHER",glow:"#2e7bc3"},
  {id:6,name:"PlayStation Store Rp150.000",category:"Voucher",price:150000,description:"Voucher digital untuk akun PlayStation.",icon:"🎮",label:"PS STORE",glow:"#386bd2"},
  {id:7,name:"Red Dead Redemption 2",category:"Konsol",price:399000,description:"Kisah petualangan di dunia koboi.",icon:"🐎",label:"ADVENTURE",glow:"#a44f35"},
  {id:8,name:"Voucher Game Rp50.000",category:"Voucher",price:50000,description:"Pilihan saldo untuk kebutuhan gaming.",icon:"💎",label:"TOP UP",glow:"#7a4ad2"}
];
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let cart = [];
let activeCategory = "Semua";
const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const cartDrawer = document.querySelector("#cartDrawer");
const scrim = document.querySelector("#drawerScrim");
const toast = document.querySelector("#toast");
let toastTimer;

function renderProducts(){
  const query = searchInput.value.trim().toLowerCase();
  let shown = products.filter(p => (activeCategory==="Semua" || p.category===activeCategory) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query));
  if(sortSelect.value==="low") shown.sort((a,b)=>a.price-b.price);
  if(sortSelect.value==="high") shown.sort((a,b)=>b.price-a.price);
  productGrid.innerHTML = shown.map(p=>`
    <article class="product-card">
      <div class="product-art" style="--glow:${p.glow}"><span class="art-label">${p.label}</span><span class="art-icon" aria-hidden="true">${p.icon}</span></div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p class="product-description">${p.description}</p>
        <div class="price-row"><span class="price">${rupiah(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Tambah ${p.name} ke keranjang">+</button></div>
      </div>
    </article>`).join("");
  document.querySelector("#emptyState").hidden = shown.length>0;
}
function notify(message){
  toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}
function addToCart(id){
  const item=cart.find(i=>i.id===id);
  if(item)item.qty++;else cart.push({id,qty:1});
  renderCart();notify("Produk ditambahkan ke keranjang.");
}
function changeQty(id,delta){
  const item=cart.find(i=>i.id===id);if(!item)return;
  item.qty+=delta;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);
  renderCart();
}
function renderCart(){
  const count=cart.reduce((sum,i)=>sum+i.qty,0);
  const total=cart.reduce((sum,i)=>sum+products.find(p=>p.id===i.id).price*i.qty,0);
  document.querySelector("#cartCount").textContent=count;
  document.querySelector("#cartTotal").textContent=rupiah(total);
  document.querySelector("#cartItems").innerHTML=cart.length?cart.map(i=>{
    const p=products.find(x=>x.id===i.id);
    return `<div class="cart-item"><div><strong>${p.name}</strong><small>${rupiah(p.price)} / item</small></div><div class="quantity"><button data-qty="${p.id}" data-delta="-1" aria-label="Kurangi jumlah">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Tambah jumlah">+</button></div></div>`;
  }).join(""):'<p class="cart-empty">Keranjangmu masih kosong.</p>';
}
function openCart(){cartDrawer.classList.add("open");scrim.classList.add("show");cartDrawer.setAttribute("aria-hidden","false");}
function closeCart(){cartDrawer.classList.remove("open");scrim.classList.remove("show");cartDrawer.setAttribute("aria-hidden","true");}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));
  const qty=e.target.closest("[data-qty]");if(qty)changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));
  const category=e.target.closest("[data-category]");
  if(category){activeCategory=category.dataset.category;document.querySelectorAll(".category-card").forEach(c=>c.classList.toggle("active",c===category));renderProducts();document.querySelector("#produk").scrollIntoView({behavior:"smooth"});}
});
searchInput.addEventListener("input",renderProducts);
sortSelect.addEventListener("change",renderProducts);
document.querySelector("#cartToggle").addEventListener("click",openCart);
document.querySelector("#cartClose").addEventListener("click",closeCart);
scrim.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.querySelector("#checkoutButton").addEventListener("click",()=>{
  if(!cart.length){notify("Keranjang masih kosong.");return;}
  notify("Ini masih demo. Hubungkan checkout dan pembayaran sebelum toko diluncurkan.");
});
document.querySelector("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();
