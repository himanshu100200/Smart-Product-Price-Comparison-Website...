const searchForm=document.getElementById("searchForm");
const searchInput=document.getElementById("searchInput");
const productResults=document.getElementById("productResults");
const statusText=document.getElementById("status");
const categoryFilter=document.getElementById("categoryFilter");
const sortFilter=document.getElementById("sortFilter");
const clearButton=document.getElementById("clearButton");
const summary=document.getElementById("summary");
const recommendationSection=document.getElementById("recommendationSection");
const recommendationResults=document.getElementById("recommendationResults");
const wishlistBox=document.getElementById("wishlist");
const recentBox=document.getElementById("recentSearches");
const browseAllButton=document.getElementById("browseAllButton");
const wishlist=new Set();
const recentSearches=[];

// Demo catalogue only. Prices are not live retailer quotes.
const products=[
{name:"Sony WH-CH520 Headphones",store:"Flipkart",category:"Electronics",price:2299,url:"https://www.flipkart.com",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.4,reviewCount:"2,180",reviewText:"Comfortable for everyday listening; battery life is a common highlight.",url:"https://www.flipkart.com/search?q=Sony+WH-CH520+Headphones"},
{name:"Sony WH-CH520 Headphones",store:"Amazon",category:"Electronics",price:2499,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.4,reviewCount:"2,180",reviewText:"Comfortable for everyday listening; battery life is a common highlight.",url:"https://www.amazon.in/s?k=Sony+WH-CH520+Headphones"},
{name:"Sony WH-CH520 Headphones",store:"Croma",category:"Electronics",price:2599,url:"https://www.croma.com",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.4,reviewCount:"2,180",reviewText:"Comfortable for everyday listening; battery life is a common highlight.",url:"https://www.croma.com/searchB?q=Sony+WH-CH520+Headphones"},
{name:"boAt Airdopes 141 Earbuds",store:"Amazon",category:"Electronics",price:999,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",rating:4.1,reviewCount:"8,420",reviewText:"Good value for the price; fit and sound preferences can vary.",url:"https://www.amazon.in/s?k=boAt+Airdopes+141+Earbuds"},
{name:"boAt Airdopes 141 Earbuds",store:"Flipkart",category:"Electronics",price:1099,url:"https://www.flipkart.com",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",rating:4.1,reviewCount:"8,420",reviewText:"Good value for the price; fit and sound preferences can vary.",url:"https://www.flipkart.com/search?q=boAt+Airdopes+141+Earbuds"},
{name:"Noise Buds VS102 Earbuds",store:"Croma",category:"Electronics",price:1199,url:"https://www.croma.com",image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700",rating:4.0,reviewCount:"3,160",reviewText:"Convenient budget earbuds; users often compare fit and call quality.",url:"https://www.croma.com/searchB?q=Noise+Buds+VS102+Earbuds"},
{name:"Noise Buds VS102 Earbuds",store:"Amazon",category:"Electronics",price:1049,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700",rating:4.0,reviewCount:"3,160",reviewText:"Convenient budget earbuds; users often compare fit and call quality.",url:"https://www.amazon.in/s?k=Noise+Buds+VS102+Earbuds"},
{name:"Apple AirPods 4",store:"Amazon",category:"Electronics",price:11900,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=700",rating:4.5,reviewCount:"1,940",reviewText:"Users often praise the seamless pairing experience.",url:"https://www.amazon.in/s?k=Apple+AirPods+4"},
{name:"Apple AirPods 4",store:"Croma",category:"Electronics",price:12490,url:"https://www.croma.com",image:"https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=700",rating:4.5,reviewCount:"1,940",reviewText:"Users often praise the seamless pairing experience.",url:"https://www.croma.com/searchB?q=Apple+AirPods+4"},
{name:"Apple iPhone 17",store:"Flipkart",category:"Mobiles",price:78999,url:"https://www.flipkart.com",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",rating:4.6,reviewCount:"1,120",reviewText:"Premium phone experience; battery and camera preferences vary.",url:"https://www.flipkart.com/search?q=Apple+iPhone+17"},
{name:"Apple iPhone 17",store:"Amazon",category:"Mobiles",price:79999,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",rating:4.6,reviewCount:"1,120",reviewText:"Premium phone experience; battery and camera preferences vary.",url:"https://www.amazon.in/s?k=Apple+iPhone+17"},
{name:"Samsung Galaxy S25",store:"Amazon",category:"Mobiles",price:74999,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.5,reviewCount:"1,680",reviewText:"Compact flagship experience with a strong display.",url:"https://www.amazon.in/s?k=Samsung+Galaxy+S25"},
{name:"Samsung Galaxy S25",store:"Flipkart",category:"Mobiles",price:73999,url:"https://www.flipkart.com",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.5,reviewCount:"1,680",reviewText:"Compact flagship experience with a strong display.",url:"https://www.flipkart.com/search?q=Samsung+Galaxy+S25"},
{name:"HP 15s Laptop",store:"Amazon",category:"Laptops",price:45990,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.0,reviewCount:"940",reviewText:"A general-purpose laptop; check the exact processor and RAM variant.",url:"https://www.amazon.in/s?k=HP+15s+Laptop"},
{name:"HP 15s Laptop",store:"Croma",category:"Laptops",price:46990,url:"https://www.croma.com",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.0,reviewCount:"940",reviewText:"A general-purpose laptop; check the exact processor and RAM variant.",url:"https://www.croma.com/searchB?q=HP+15s+Laptop"},
{name:"Lenovo IdeaPad Slim 3",store:"Flipkart",category:"Laptops",price:42990,url:"https://www.flipkart.com",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.2,reviewCount:"1,320",reviewText:"Popular everyday laptop; verify the configuration before buying.",url:"https://www.flipkart.com/search?q=Lenovo+IdeaPad+Slim+3"},
{name:"Lenovo IdeaPad Slim 3",store:"Amazon",category:"Laptops",price:43990,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.2,reviewCount:"1,320",reviewText:"Popular everyday laptop; verify the configuration before buying.",url:"https://www.amazon.in/s?k=Lenovo+IdeaPad+Slim+3"},
{name:"Nike Air Max Shoes",store:"Myntra",category:"Fashion",price:5499,url:"https://www.myntra.com",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.4,reviewCount:"2,400",reviewText:"Style and cushioning are common talking points; fit is personal.",url:"https://www.myntra.com/nike-air-max-shoes"},
{name:"Nike Air Max Shoes",store:"Amazon",category:"Fashion",price:5999,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.4,reviewCount:"2,400",reviewText:"Style and cushioning are common talking points; fit is personal.",url:"https://www.amazon.in/s?k=Nike+Air+Max+Shoes"},
{name:"Adidas Runfalcon Shoes",store:"Myntra",category:"Fashion",price:3299,url:"https://www.myntra.com",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.2,reviewCount:"1,760",reviewText:"Often considered for casual wear and light activity.",url:"https://www.myntra.com/adidas-runfalcon-shoes"},
{name:"Adidas Runfalcon Shoes",store:"Amazon",category:"Fashion",price:3499,url:"https://www.amazon.in",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.2,reviewCount:"1,760",reviewText:"Often considered for casual wear and light activity.",url:"https://www.amazon.in/s?k=Adidas+Runfalcon+Shoes"},
{name:"JBL Tune 510BT Headphones",store:"Amazon",category:"Electronics",price:2499,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.3,reviewCount:"2100",reviewText:"Lightweight everyday headphones; comfort can vary.",url:"https://www.amazon.in/s?k=JBL+Tune+510BT+Headphones"},
{name:"JBL Tune 510BT Headphones",store:"Flipkart",category:"Electronics",price:2399,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.3,reviewCount:"2100",reviewText:"Lightweight everyday headphones; comfort can vary.",url:"https://www.flipkart.com/search?q=JBL+Tune+510BT+Headphones"},
{name:"boAt Rockerz 450 Headphones",store:"Amazon",category:"Electronics",price:1499,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.1,reviewCount:"3200",reviewText:"Budget wireless headphones for casual listening.",url:"https://www.amazon.in/s?k=boAt+Rockerz+450+Headphones"},
{name:"boAt Rockerz 450 Headphones",store:"Flipkart",category:"Electronics",price:1399,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",rating:4.1,reviewCount:"3200",reviewText:"Budget wireless headphones for casual listening.",url:"https://www.flipkart.com/search?q=boAt+Rockerz+450+Headphones"},
{name:"Realme Buds T300 Earbuds",store:"Amazon",category:"Electronics",price:2199,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",rating:4.2,reviewCount:"1800",reviewText:"A sample review summary for everyday earbuds.",url:"https://www.amazon.in/s?k=Realme+Buds+T300+Earbuds"},
{name:"Realme Buds T300 Earbuds",store:"Flipkart",category:"Electronics",price:1999,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",rating:4.2,reviewCount:"1800",reviewText:"A sample review summary for everyday earbuds.",url:"https://www.flipkart.com/search?q=Realme+Buds+T300+Earbuds"},
{name:"OnePlus Nord Buds 3 Earbuds",store:"Amazon",category:"Electronics",price:2299,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",rating:4.2,reviewCount:"1500",reviewText:"Users may compare fit, battery and call quality.",url:"https://www.amazon.in/s?k=OnePlus+Nord+Buds+3+Earbuds"},
{name:"OnePlus Nord Buds 3 Earbuds",store:"Croma",category:"Electronics",price:2399,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",rating:4.2,reviewCount:"1500",reviewText:"Users may compare fit, battery and call quality.",url:"https://www.croma.com/searchB?q=OnePlus+Nord+Buds+3+Earbuds"},
{name:"Samsung Galaxy Buds FE",store:"Amazon",category:"Electronics",price:5999,image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700",rating:4.3,reviewCount:"980",reviewText:"Sample summary; check compatibility and fit.",url:"https://www.amazon.in/s?k=Samsung+Galaxy+Buds+FE"},
{name:"Samsung Galaxy Buds FE",store:"Flipkart",category:"Electronics",price:5799,image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700",rating:4.3,reviewCount:"980",reviewText:"Sample summary; check compatibility and fit.",url:"https://www.flipkart.com/search?q=Samsung+Galaxy+Buds+FE"},
{name:"Apple iPhone 16",store:"Amazon",category:"Mobiles",price:64999,image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",rating:4.6,reviewCount:"1400",reviewText:"Illustrative phone review summary.",url:"https://www.amazon.in/s?k=Apple+iPhone+16"},
{name:"Apple iPhone 16",store:"Flipkart",category:"Mobiles",price:63999,image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",rating:4.6,reviewCount:"1400",reviewText:"Illustrative phone review summary.",url:"https://www.flipkart.com/search?q=Apple+iPhone+16"},
{name:"OnePlus 13R",store:"Amazon",category:"Mobiles",price:42999,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.4,reviewCount:"1100",reviewText:"Sample summary; verify RAM and storage variant.",url:"https://www.amazon.in/s?k=OnePlus+13R"},
{name:"OnePlus 13R",store:"Croma",category:"Mobiles",price:43999,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.4,reviewCount:"1100",reviewText:"Sample summary; verify RAM and storage variant.",url:"https://www.croma.com/searchB?q=OnePlus+13R"},
{name:"Redmi Note 14 Pro",store:"Amazon",category:"Mobiles",price:24999,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.2,reviewCount:"2100",reviewText:"Illustrative review summary for a mid-range phone.",url:"https://www.amazon.in/s?k=Redmi+Note+14+Pro"},
{name:"Redmi Note 14 Pro",store:"Flipkart",category:"Mobiles",price:23999,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.2,reviewCount:"2100",reviewText:"Illustrative review summary for a mid-range phone.",url:"https://www.flipkart.com/search?q=Redmi+Note+14+Pro"},
{name:"Google Pixel 9",store:"Amazon",category:"Mobiles",price:69999,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.5,reviewCount:"870",reviewText:"Sample summary; camera preferences are subjective.",url:"https://www.amazon.in/s?k=Google+Pixel+9"},
{name:"Google Pixel 9",store:"Flipkart",category:"Mobiles",price:68999,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",rating:4.5,reviewCount:"870",reviewText:"Sample summary; camera preferences are subjective.",url:"https://www.flipkart.com/search?q=Google+Pixel+9"},
{name:"ASUS Vivobook 15",store:"Amazon",category:"Laptops",price:49990,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.2,reviewCount:"720",reviewText:"Check processor, RAM and storage configuration.",url:"https://www.amazon.in/s?k=ASUS+Vivobook+15"},
{name:"ASUS Vivobook 15",store:"Flipkart",category:"Laptops",price:48990,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.2,reviewCount:"720",reviewText:"Check processor, RAM and storage configuration.",url:"https://www.flipkart.com/search?q=ASUS+Vivobook+15"},
{name:"Acer Aspire Lite",store:"Amazon",category:"Laptops",price:36990,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.0,reviewCount:"560",reviewText:"Sample summary; suitable configuration depends on use.",url:"https://www.amazon.in/s?k=Acer+Aspire+Lite"},
{name:"Acer Aspire Lite",store:"Croma",category:"Laptops",price:37990,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.0,reviewCount:"560",reviewText:"Sample summary; suitable configuration depends on use.",url:"https://www.croma.com/searchB?q=Acer+Aspire+Lite"},
{name:"MacBook Air M3",store:"Amazon",category:"Laptops",price:99990,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.7,reviewCount:"1900",reviewText:"Illustrative review summary; check memory configuration.",url:"https://www.amazon.in/s?k=MacBook+Air+M3"},
{name:"MacBook Air M3",store:"Croma",category:"Laptops",price:102990,image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",rating:4.7,reviewCount:"1900",reviewText:"Illustrative review summary; check memory configuration.",url:"https://www.croma.com/searchB?q=MacBook+Air+M3"},
{name:"Samsung Galaxy Tab S9 FE",store:"Amazon",category:"Electronics",price:27999,image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700",rating:4.4,reviewCount:"650",reviewText:"Sample tablet review summary.",url:"https://www.amazon.in/s?k=Samsung+Galaxy+Tab+S9+FE"},
{name:"Samsung Galaxy Tab S9 FE",store:"Flipkart",category:"Electronics",price:26999,image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700",rating:4.4,reviewCount:"650",reviewText:"Sample tablet review summary.",url:"https://www.flipkart.com/search?q=Samsung+Galaxy+Tab+S9+FE"},
{name:"Apple Watch SE",store:"Amazon",category:"Electronics",price:24900,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",rating:4.5,reviewCount:"1200",reviewText:"Illustrative smartwatch review summary.",url:"https://www.amazon.in/s?k=Apple+Watch+SE"},
{name:"Apple Watch SE",store:"Croma",category:"Electronics",price:25900,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",rating:4.5,reviewCount:"1200",reviewText:"Illustrative smartwatch review summary.",url:"https://www.croma.com/searchB?q=Apple+Watch+SE"},
{name:"Samsung 43 inch Smart TV",store:"Amazon",category:"Electronics",price:28999,image:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700",rating:4.2,reviewCount:"800",reviewText:"Check exact panel and smart-TV features.",url:"https://www.amazon.in/s?k=Samsung+43+inch+Smart+TV"},
{name:"Samsung 43 inch Smart TV",store:"Flipkart",category:"Electronics",price:27999,image:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700",rating:4.2,reviewCount:"800",reviewText:"Check exact panel and smart-TV features.",url:"https://www.flipkart.com/search?q=Samsung+43+inch+Smart+TV"},
{name:"Puma Smashic Sneakers",store:"Myntra",category:"Fashion",price:2499,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.2,reviewCount:"900",reviewText:"Fit and sizing may vary by model.",url:"https://www.myntra.com/search?q=Puma+Smashic+Sneakers"},
{name:"Puma Smashic Sneakers",store:"Amazon",category:"Fashion",price:2699,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.2,reviewCount:"900",reviewText:"Fit and sizing may vary by model.",url:"https://www.amazon.in/s?k=Puma+Smashic+Sneakers"},
{name:"Adidas Grand Court Shoes",store:"Myntra",category:"Fashion",price:3999,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.3,reviewCount:"1100",reviewText:"Casual shoe review summary; check size availability.",url:"https://www.myntra.com/search?q=Adidas+Grand+Court+Shoes"},
{name:"Adidas Grand Court Shoes",store:"Amazon",category:"Fashion",price:4199,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",rating:4.3,reviewCount:"1100",reviewText:"Casual shoe review summary; check size availability.",url:"https://www.amazon.in/s?k=Adidas+Grand+Court+Shoes"},
{name:"Levi's 511 Slim Jeans",store:"Myntra",category:"Fashion",price:2299,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=700",rating:4.1,reviewCount:"760",reviewText:"Fit and wash can differ between variants.",url:"https://www.myntra.com/search?q=Levi's+511+Slim+Jeans"},
{name:"Levi's 511 Slim Jeans",store:"Amazon",category:"Fashion",price:2499,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=700",rating:4.1,reviewCount:"760",reviewText:"Fit and wash can differ between variants.",url:"https://www.amazon.in/s?k=Levi's+511+Slim+Jeans"}
];
let currentMatches=[];
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);

function grouped(items){
 const map=new Map();
 items.forEach(p=>{if(!map.has(p.name))map.set(p.name,[]);map.get(p.name).push(p);});
 return [...map.entries()].map(([name,offers])=>({name,category:offers[0].category,offers:offers.sort((a,b)=>a.price-b.price)}));
}
function showRecommendations(query,category){
 const seen=new Set();
 const list=products.filter(p=>p.category===category&&!p.name.toLowerCase().includes(query.toLowerCase())&&!seen.has(p.name)&&seen.add(p.name)).slice(0,4);
 recommendationResults.innerHTML="";
 recommendationSection.hidden=list.length===0;
 list.forEach(p=>{
  const b=document.createElement("button");b.className="recommendation-card";b.type="button";
  const c=document.createElement("span");c.textContent=p.category;
  const n=document.createElement("strong");n.textContent=p.name;
  const price=document.createElement("small");price.textContent="From "+money(p.price)+" in sample offers";
  b.append(c,n,price);b.addEventListener("click",()=>{searchInput.value=p.name;categoryFilter.value="All";search(p.name);window.scrollTo({top:0,behavior:"smooth"});});
  recommendationResults.appendChild(b);
 });
}
function renderSavedLists(){
 wishlistBox.innerHTML="";
 if(wishlist.size===0){wishlistBox.innerHTML='<span class="muted">No saved products yet.</span>';}
 [...wishlist].forEach(name=>{
  const chip=document.createElement("button");chip.className="chip";chip.type="button";chip.textContent=name+" ×";
  chip.title="Remove from saved products";chip.addEventListener("click",()=>{wishlist.delete(name);renderSavedLists();});wishlistBox.appendChild(chip);
 });
 recentBox.innerHTML="";
 if(recentSearches.length===0){recentBox.innerHTML='<span class="muted">No recent searches.</span>';}
 recentSearches.forEach(term=>{
  const chip=document.createElement("button");chip.className="chip";chip.type="button";chip.textContent=term;
  chip.addEventListener("click",()=>{searchInput.value=term;categoryFilter.value="All";search(term);});recentBox.appendChild(chip);
 });
}
function render(){
 const category=categoryFilter.value,sort=sortFilter.value;
 const visible=currentMatches.filter(p=>category==="All"||p.category===category);
 const groups=grouped(visible);
 if(sort==="low")groups.sort((a,b)=>a.offers[0].price-b.offers[0].price);
 if(sort==="high")groups.sort((a,b)=>b.offers[0].price-a.offers[0].price);
 if(sort==="name")groups.sort((a,b)=>a.name.localeCompare(b.name));
 productResults.innerHTML="";
 if(!groups.length){productResults.innerHTML='<p class="empty">No offers found for this category. Try another filter.</p>';statusText.textContent="No matching offers";summary.hidden=true;recommendationSection.hidden=true;return;}
 groups.forEach(g=>{
  const best=g.offers[0],last=g.offers[g.offers.length-1],card=document.createElement("article");card.className="comparison-card";
  const top=document.createElement("div");top.className="comparison-top";
  const tag=document.createElement("span");tag.className="best-tag";tag.textContent="BEST STORE PRICE";
  const cat=document.createElement("span");cat.className="category-label";cat.textContent=g.category;top.append(tag,cat);
  const image=document.createElement("img");image.className="product-photo";image.src=best.image;image.alt=g.name;image.loading="lazy";
  image.onerror=()=>{image.style.display="none";};
  const title=document.createElement("h3");title.textContent=g.name;
  const saveButton=document.createElement("button");saveButton.type="button";saveButton.className="save-button";
  saveButton.textContent=wishlist.has(g.name)?"♥ Saved":"♡ Save product";
  saveButton.addEventListener("click",()=>{if(wishlist.has(g.name)){wishlist.delete(g.name);}else{wishlist.add(g.name);}renderSavedLists();saveButton.textContent=wishlist.has(g.name)?"♥ Saved":"♡ Save product";});
  const bestLine=document.createElement("div");bestLine.className="best-line";
  const bestInfo=document.createElement("div");const small=document.createElement("small");small.textContent="Lowest sample offer";
  const price=document.createElement("strong");price.textContent=money(best.price);
  const store=document.createElement("span");store.textContent=best.store;bestInfo.append(small,price,store);
  const link=document.createElement("a");link.className="retailer-link";link.href=best.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent="Visit store";bestLine.append(bestInfo,link);
  const heading=document.createElement("p");heading.className="offers-heading";heading.textContent=`Compare ${g.offers.length} store offers`;
  const list=document.createElement("div");list.className="offer-list";
  g.offers.forEach((o,i)=>{const row=document.createElement("div");row.className="offer-row";const s=document.createElement("span");s.textContent=o.store;const v=document.createElement("strong");v.textContent=money(o.price);const m=document.createElement("span");m.className="offer-marker";m.textContent=i===0?"Lowest":"";row.append(s,v,m);list.appendChild(row);});
  const review=document.createElement("div");review.className="review-box";
  const rating=document.createElement("strong");rating.textContent=`★ ${best.rating}/5`;
  const count=document.createElement("span");count.textContent=` ${best.reviewCount} sample reviews`;
  const reviewText=document.createElement("p");reviewText.textContent=best.reviewText;
  const disclaimer=document.createElement("small");disclaimer.textContent="Illustrative review summary — not verified customer reviews.";
  review.append(rating,count,reviewText,disclaimer);
  const saving=document.createElement("p");saving.className="saving-note";saving.textContent=g.offers.length>1?`You save ${money(last.price-best.price)} compared with the highest listed offer.`:"Only one sample store offer is available.";
  card.append(top,image,title,saveButton,bestLine,heading,list,review,saving);productResults.appendChild(card);
 });
 const prices=visible.map(p=>p.price),low=Math.min(...prices),high=Math.max(...prices);
 statusText.textContent=`${visible.length} offers across ${groups.length} products · Lowest: ${money(low)}`;
 summary.hidden=false;summary.textContent=`Visible sample prices range from ${money(low)} to ${money(high)}. These are not live quotes.`;
 showRecommendations(searchInput.value.trim(),groups[0].category);
}
function search(query){
 const clean=query.trim();
 if(clean){
  const existing=recentSearches.findIndex(item=>item.toLowerCase()===clean.toLowerCase());
  if(existing!==-1)recentSearches.splice(existing,1);
  recentSearches.unshift(clean);
  if(recentSearches.length>5)recentSearches.pop();
  renderSavedLists();
 }
 const term=clean.toLowerCase();if(!term){statusText.textContent="Enter a product name first";return;}
 currentMatches=products.filter(p=>`${p.name} ${p.store} ${p.category}`.toLowerCase().includes(term));
 render();if(!currentMatches.length){statusText.textContent="No results found";summary.hidden=true;recommendationSection.hidden=true;}
}
searchForm.addEventListener("submit",e=>{e.preventDefault();categoryFilter.value="All";search(searchInput.value);});
categoryFilter.addEventListener("change",render);sortFilter.addEventListener("change",render);
renderSavedLists();
clearButton.addEventListener("click",()=>{searchInput.value="";categoryFilter.value="All";sortFilter.value="low";currentMatches=[];productResults.innerHTML='<p class="empty">Search for a product to compare store offers.</p>';statusText.textContent="Search to compare offers";summary.hidden=true;recommendationSection.hidden=true;});

browseAllButton.addEventListener("click",()=>{
 searchInput.value="";
 categoryFilter.value="All";
 currentMatches=[...products];
 render();
 statusText.textContent=`Browsing all ${grouped(currentMatches).length} sample products`;
});
