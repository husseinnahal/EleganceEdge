"use client"
import styles from"@/app/page.module.css"
import { CheckToken } from "@/Context/UserContext";
import axios from 'axios';
import Link from "next/link";
import { useEffect, useRef, useState } from "react"

export default function Header() {
  const {setDisplayUser,DisplayUser,Cartdisplay,setCartdisplay,Login,Nbinwishlist,RefrCartinhead,setRefCartinhead,Searsh,setSearsh}=CheckToken();
  const Menu=useRef();
  const [Loading,setLoading]=useState(true) ;
  const [WhenRemove,setWhenRemove]=useState(false);

  // functions for open and close category menu
  function Openmenu(){
    Menu.current.style.left = "0";
  }
  function CloseMenu(){
    Menu.current.style.left = "-100%";
  }

  
  // Category states
  const [categories, setCategories] = useState({
    MenWears: [],
    WomenWears: [],
    KidsWears: [],
    Accessories: [],
    Shoas: [],
    Bags: []
  });

  // Fetch categories
  const fetchCategory = async (category) => {
    try {
      const res = await axios.get(`https://devstyle-u119.onrender.com/api/SubCat/${category}`);
      setCategories(prev => ({ ...prev, [category]: res.data.data }));
      
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory('MenWears');
    fetchCategory('WomenWears');
    fetchCategory('KidsWears');
    fetchCategory('Shoas');
    fetchCategory('Accessories');
    fetchCategory('Bags');
  }, []);
  
  // check if token is exist or no 
  const [Token,setToken]=useState(false);
  useEffect(() => {
    // Check for token on component load
    setToken(!!localStorage.getItem("Token"));// true if token exists, false otherwise    
  },[DisplayUser,Login]);


 //for get Wishlist to get nb of items 
 const [Items,setItems]=useState([]);
 const getItems=async()=>{
     try {
         const res = await axios.get( `https://devstyle-u119.onrender.com/api/Wishlist/inwishlist`,
             {
                 headers: {
                   Authorization:`Bearer ${localStorage.Token}` , 
                 }
             }
         );
         setItems(res.data.data[0].items);         
     } catch (error) {
      setItems([])
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === "invalide token please Log in again") {
          localStorage.clear();
        }
      } else {
        console.log("An error occurred:", error); // Log generic error if no response data
      }
     
     }
 }
 useEffect(()=>{
     if (Token) {
      getItems()
    }
 },[Nbinwishlist,Token])



  // for get items from cart
const [Carts,setCarts]=useState([])
const [Totalcart,setTotalcart]=useState(0)
const getCart = async () => {
  setLoading(true)
  try {
    const res = await axios.get(`https://devstyle-u119.onrender.com/api/Cart`,
      {
        headers: {
          Authorization:`Bearer ${localStorage.Token}` , 
        }
       }
    );
     setCarts(res.data.data.items)  
     setTotalcart(res.data.data.totalCartPrice);
    
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "invalide token please Log in again") {
        localStorage.clear();
      }
    } else {
      console.log("An error occurred:", error); // Log generic error if no response data
    }
  }
  finally{
  setLoading(false)

  }
};
useEffect(()=>{
  if (Token) {
    getCart()
  }else{
    setLoading(false)
  }
},[Token,Cartdisplay,RefrCartinhead])
  



// remove an item from cart
async function RemoveItemFromCart(id,coloritem,sizeitem){
  setWhenRemove(`${id} ${coloritem}`);
try{
  const res = await axios.delete("https://devstyle-u119.onrender.com/api/Cart", {
    data: {
      productId: id ,
      color:coloritem,
      size:sizeitem
    }, 
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Token')}`,
    },

  });
  setRefCartinhead(ref => !ref)
}
catch(err){
console.log(err)
}
finally{
  setWhenRemove(false)

}
}


// for search feature
const [SearchItems,setSearchItems]=useState([])
const [Loadsearch,setLoadsearch]=useState(false)
// get the items when search
async function Search(e) {
  setLoadsearch(true)
  try {
      const res = await axios.get("https://devstyle-u119.onrender.com/api/Items/searchs", {
          params: { search: e.target.value }
      });
      
      setSearchItems(res.data.data);
     
  } catch (err) {
    if (!e.target.value) {
      setSearchItems([])
    }else{
      setSearchItems("no")
    }
      console.log(err);
  }
  finally{
    setLoadsearch(false)

  }
}
// function close and open search page
function closesearch(){
  setSearsh("none")
}
function opensearch(){
  setSearsh("block")

}


  return (
    <div className={styles.header}>

      <div className={styles.catandsearsh}>
          <svg onClick={Openmenu}  style={{cursor:"pointer"}} width="30" height="30" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect x="0.4375" y="0.710938" width="36" height="36" fill="url(#pattern0_1524_3489)"/>
            <defs>
            <pattern id="pattern0_1524_3489" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1524_3489" transform="scale(0.01)"/>
            </pattern>
            <image id="image0_1524_3489" width="100" height="100" href="data:image/png;base64,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"/>
            </defs>
          </svg>

          <svg onClick={opensearch} width="45" height="37" viewBox="0 0 55 37" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="53.7152" height="36" transform="matrix(-1 0 0 1 54.1523 0.710938)" fill="url(#pattern0_1524_3491)"/>
            <defs>
            <pattern id="pattern0_1524_3491" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1524_3491" transform="matrix(0.00670201 0 0 0.01 0.164899 0)"/>
            </pattern>
            <image id="image0_1524_3491" width="100" height="100" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFOUlEQVR4nO2dW4iVVRTHfzPTzZAedI5TZEQy3WRMkHoQEsLngtSkmzg+lNEdldQiekiinu2CUg8lBUVUQ/aSY6VEEGQITdl0YzIq7GJSWZYaJzasoWE6e+3vnDlzzl7fWT/YjzOz1vf/9rf32mutPeA4juM4juM4juM4juM4zlQ4HVgAXAusBdYBm2TcBqwClgAVf8zTw2zgemA7MAr8A1QLjsPAThFtoQvUOKcCy4Ah4HgdAlQT4wCwGTjXxSnGacBq4IsmilCtMYLIO4CLXZg4NwPfT7MQ1UnjJLANmOXC/Ec/8HaLhahOGj/KzOx4wmL9a4MP8S/gK2AfsBf4APgE+GkKwjwPzOxEVXqArXU+rM+Ax4HlwDz5HTHCJ+hK4H5guM6NwajM2o6KI14u+HCOAk8AV0zxb/YCd8sMKvJ3DwGL6BAxdhV4IH8Cj0xDcNcNrCgozG/AYkpMT8GZ8QZwQQvinPtkBmq2/AzMp6Sk1oxjwB0ttulSYCRh1zfA2ZRwN5Xadk51nWiUM4HXEvbtls9dKehPbG0PAhdl8Dl9OiHKQ5SEtxQnQ8xwCXnQBTyr2HoCuAzj3JRYM9r1mdLO0vYoNu8V4UwyA/hOca7VC3hRzgF+UOwO66FJ7kxsbXPmGsX2jyzOkrDP/1oJ+qY7zmgGQ4ooIVtpiuWKMyECt8A8Wchr+RDOx0wRe7v+MJbrfi7iR0gjn4cRepXT1XBQaIkBZaZvxAg3KE5cjj0+jPgSkmom2K7kMyyyXkmQha199oxGHAjJJYsMKDN+KZlzhhQO1DI+5CEs0qUEiveQOQuUt8lC7BHjzYhPT2I0/jiWyIFbzeUMkzm3RAwPhW+WWR/xK+zAsmadVcMT3Brx63My58GI4e9imxsjfoVKy6zZGDH8fWwzGPErHKBmze0Rw0PZjWXusurXKiVVa5ktEb/eI3OWKHGI5Qrzl5Ra4KypKIKEWlurjER8CjMnew5HjA+FzxbpVdroVmKAnVaj2gjXKbN+Loaj2uPGsoWp9WMMIyxU3qjQEmCJs6Qoo5Yv4XzLDAeUfbulGtkNlnMhE9msOLLCUC/Lt0qEbur0OvSB/x1x5mOp27L8Uj2AQZ5RHArNMrm/UL9HbA9NPnMwyIVKOveoNMvkSHei7e4xDLNNcWxEmmUsfap+kbtXzDJLuqNiDr4OnEJeRdYnFXvD7UPmWa04WJXOpRy2wlcpMcd4ki0HO5vCjoQor0gJUbtYJnXHMfuOGK+a+R8zlQK68bFHmmVaSbesGak7uNZQQvrlhgTN8VCQdnULt7a7EvZMjJ1MbnVTLCp42cyQ9GdMVwS+SYkzOk6UxUrOZOI4If0Zoba2WQeFGxJ9jx0ryny5IaHog9gnx/oDdfb3zZZ8xouJHZSLItdV7G7ggRySWtutItJaydwNSqPpFslhjNR5YeZ44LdGZkJHzpQeuSGhmRddVhscIc44X+ya08miIFdrDLdJiCPAvTWCvoq0QGs/+2kbtuoto0ua8lMPodqkEQ44H02cTRWdKX2UmC7pAx9uYA2oFhgHJZ9R9HPjokxgrtQLvyM9fY2KMCabgKUNZvpclBrMkAca2siekig7bIe/lJ3XmOTyQ3nnC7LbWtnEUh0XJUMqBda40TIv9DlScVHyo+Ki5ClK6gJN/3y1mLDQuyiZ4aJkiIuSIS5KhrgoGdJX4EByf5urbDqOvgKi+H/0aYMo2r/FeLjVBjmoooTiPKdNouyfJMarZSpLtZo6GJTPVJgZLobjOI7jOI7jOI7jOI5DmfkX7DDiNxG+tpEAAAAASUVORK5CYII="/>
            </defs>
          </svg>
      </div>

      <Link href={"/"} className={styles.title}>
         EleganceEdge
      </Link>

      <div className={styles.infoUser}>
      
        <svg onClick={()=>setDisplayUser("flex")} className={styles.logs} width="28" style={{cursor:"pointer"}} height="30" viewBox="0 0 37 32" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M26.9375 27.7109C26.9375 23.7222 21.3411 20.4887 14.4375 20.4887C7.53394 20.4887 1.9375 23.7222 1.9375 27.7109M14.4375 16.1554C10.1228 16.1554 6.625 12.9219 6.625 8.93316C6.625 4.94444 10.1228 1.71094 14.4375 1.71094C18.7522 1.71094 22.25 4.94444 22.25 8.93316C22.25 12.9219 18.7522 16.1554 14.4375 16.1554Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <Link href={"/wishlist"} className={styles.wishlist}>
          <svg width="28" style={{cursor:"pointer"}} className={styles.cartShop} height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4375 6.84953C13.1042 -0.798122 1.4375 0.0164229 1.4375 9.791C1.4375 19.5656 16.4375 27.7109 16.4375 27.7109C16.4375 27.7109 31.4375 19.5656 31.4375 9.791C31.4375 0.0164229 19.7708 -0.798122 16.4375 6.84953Z" stroke="#010000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles.nbwishlist} style={{display:Items.length==0?"none":"flex"}}>{Items.length}</div>
        </Link>

        <div className={styles.wishlist}>
          <svg onClick={()=>setCartdisplay("0")} style={{cursor:"pointer"}} className={styles.cartShop} width="28" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4375 8.21094C11.4375 10.9033 13.6761 13.0859 16.4375 13.0859C19.1989 13.0859 21.4375 10.9033 21.4375 8.21094M31.4375 6.91086V22.5109C31.4375 24.331 31.4379 25.2413 31.0745 25.9365C30.755 26.548 30.2444 27.0451 29.6171 27.3567C28.9041 27.7109 27.9713 27.7109 26.1045 27.7109H6.77116C4.90432 27.7109 3.9702 27.7109 3.25716 27.3567C2.62995 27.0451 2.12039 26.548 1.80081 25.9365C1.4375 25.2413 1.4375 24.331 1.4375 22.5109V6.91086C1.4375 5.09069 1.4375 4.18072 1.80081 3.4855C2.12039 2.87398 2.62995 2.37675 3.25716 2.06517C3.9702 1.71094 4.90432 1.71094 6.77116 1.71094H26.1045C27.9713 1.71094 28.9041 1.71094 29.6171 2.06517C30.2444 2.37675 30.755 2.87398 31.0745 3.4855C31.4379 4.18072 31.4375 5.09069 31.4375 6.91086Z" stroke="#010000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles.nbwishlist} style={{display:Carts.length==0?"none":"flex"}}>{Carts.length}</div>
        </div>


        <svg onClick={Openmenu} className={styles.categoriesmenures}  width="35" height="35" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect y="0.5" width="28" height="23" fill="url(#pattern0_1728_5314)"/>
            <defs>
            <pattern id="pattern0_1728_5314" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1728_5314" transform="matrix(0.00821429 0 0 0.01 0.0892857 0)"/>
            </pattern>
            <image id="image0_1728_5314" width="100" height="100" href="data:image/png;base64,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"/>
            </defs>
        </svg>

      </div>


      <div className={styles.menu} ref={Menu} >

          <div className={styles.menures}>
            
                <svg onClick={CloseMenu}  className={styles.close} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
                </svg>  
                <div  onClick={()=>{opensearch(),CloseMenu()}} className={styles.searchsdiv}>
                    <h2  >Search for products</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512">
                      <path fill="#D9D9D9" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </div>
              <h2 onClick={()=>setDisplayUser("flex")} className={styles.regsterres} >signin/Login</h2>
              <details className={styles.titlecatres}>
                  <summary className={styles.catnameres}> Categories </summary> 
                    <div className={styles.deyailscatres}>
                      <details className={styles.catres}>
                          <summary className={styles.catname}> MenWear </summary> 
                          {categories.MenWears.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                            <ul className={styles.SubcatList}>
                              {categories.MenWears.map( (info,index) =>
                                <li className={styles.subcat} key={index}>
                                  <Link onClick={CloseMenu} href={{ pathname: '/MenWears', query: { Subcat: info._id} }} className={styles.Links} >
                                  {info.name}
                                  </Link>
                                </li>
                              )}
                            </ul>
                          }
                      </details>
                      <details className={styles.catres} >
                          <summary className={styles.catname}> WomenWear </summary> 
                            {categories.WomenWears.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                                <ul className={styles.SubcatList}>
                                  { categories.WomenWears.map( (info,index) =>
                                  <li className={styles.subcat} key={index}>
                                    <Link onClick={CloseMenu} href={{ pathname: '/WomenWears', query: { Subcat: info._id} }} className={styles.Links} >
                                      {info.name}
                                    </Link>
                                  </li>
                                  )}
                                </ul>
                            } 
                      </details>
                      <details className={styles.catres} >
                          <summary className={styles.catname}>Kids Wear </summary> 
                            {categories.KidsWears.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                              <ul className={styles.SubcatList}>
                                { categories.KidsWears.map( (info,index) =>
                                <li className={styles.subcat} key={index}>
                                  <Link onClick={CloseMenu} href={{ pathname: '/KidsWears', query: { Subcat: info._id} }} className={styles.Links} >
                                    {info.name}
                                  </Link>
                                </li>
                                )}
                              </ul>
                            }
                      </details>
                      <details className={styles.catres} >
                          <summary className={styles.catname}> Shoes </summary> 
                              {categories.Shoas.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                                <ul className={styles.SubcatList}>
                                  { categories.Shoas.map( (info,index) =>
                                  <li className={styles.subcat} key={index}>
                                    <Link onClick={CloseMenu} href={{ pathname: '/Shoas', query: { Subcat: info._id} }} className={styles.Links} >
                                        {info.name}
                                    </Link>
                                  </li>
                                  )}
                                </ul>
                              }
                      </details>
                      <details className={styles.catres} >
                          <summary className={styles.catname}> Accessories </summary>
                              {categories.Accessories.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>: 
                                  <ul className={styles.SubcatList}>
                                    { categories.Accessories.map( (info,index) =>
                                    <li className={styles.subcat} key={index}>
                                      <Link onClick={CloseMenu} href={{ pathname: '/Accessories', query: { Subcat: info._id} }} className={styles.Links} >
                                          {info.name}
                                      </Link>
                                    </li>
                                    )}
                                  </ul>
                              } 
                      </details>
                      <details className={styles.catres} >
                          <summary className={styles.catname}> Bags </summary> 
                            {categories.Bags.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                                <ul className={styles.SubcatList}>
                                  { categories.Bags.map( (info,index) =>
                                  <li className={styles.subcat} key={index}>
                                      <Link onClick={CloseMenu} href={{ pathname: '/Bags', query: { Subcat: info._id} }} className={styles.Links} >
                                          {info.name}
                                      </Link>
                                  </li>
                                  )}
                                </ul>
                            }
                      </details>
                    </div>
              </details>
          </div>

          <div className={styles.categoriesmenu}>

            <div className={styles.titlecat}>
              <h1>Categories:</h1>
              <svg onClick={CloseMenu}  className={styles.close} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
              </svg>

            </div>    
            <details className={styles.cat}>
                <summary className={styles.catname}> MenWear </summary> 
                {categories.MenWears.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                  <ul className={styles.SubcatList}>
                    {categories.MenWears.map( (info,index) =>
                      <li className={styles.subcat} key={index}>
                        <Link onClick={CloseMenu} href={{ pathname: '/MenWears', query: { Subcat: info._id} }} className={styles.Links} >
                        {info.name}
                        </Link>
                      </li>
                    )}
                  </ul>
                }
            </details>
            <details className={styles.cat} >
                <summary className={styles.catname}> WomenWear </summary> 
                  {categories.WomenWears.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                      <ul className={styles.SubcatList}>
                        { categories.WomenWears.map( (info,index) =>
                        <li className={styles.subcat} key={index}>
                          <Link onClick={CloseMenu} href={{ pathname: '/WomenWears', query: { Subcat: info._id} }} className={styles.Links} >
                            {info.name}
                          </Link>
                        </li>
                        )}
                      </ul>
                  } 
            </details>
            <details className={styles.cat} >
                <summary className={styles.catname}>Kids Wear </summary> 
                  {categories.KidsWears.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                    <ul className={styles.SubcatList}>
                      { categories.KidsWears.map( (info,index) =>
                      <li className={styles.subcat} key={index}>
                        <Link onClick={CloseMenu} href={{ pathname: '/KidsWears', query: { Subcat: info._id} }} className={styles.Links} >
                          {info.name}
                        </Link>
                      </li>
                      )}
                    </ul>
                  }
            </details>
            <details className={styles.cat} >
                <summary className={styles.catname}> Shoes </summary> 
                    {categories.Shoas.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                      <ul className={styles.SubcatList}>
                        { categories.Shoas.map( (info,index) =>
                        <li className={styles.subcat} key={index}>
                          <Link onClick={CloseMenu} href={{ pathname: '/Shoas', query: { Subcat: info._id} }} className={styles.Links} >
                               {info.name}
                          </Link>
                        </li>
                        )}
                      </ul>
                    }
            </details>
            <details className={styles.cat} >
                <summary className={styles.catname}> Accessories </summary>
                    {categories.Accessories.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>: 
                        <ul className={styles.SubcatList}>
                          { categories.Accessories.map( (info,index) =>
                          <li className={styles.subcat} key={index}>
                             <Link onClick={CloseMenu} href={{ pathname: '/Accessories', query: { Subcat: info._id} }} className={styles.Links} >
                                {info.name}
                            </Link>
                          </li>
                          )}
                        </ul>
                    } 
            </details>
            <details className={styles.cat} >
                <summary className={styles.catname}> Bags </summary> 
                  {categories.Bags.length==0? <p className={styles.nosub}>No Subacatgories Available!</p>:
                      <ul className={styles.SubcatList}>
                        { categories.Bags.map( (info,index) =>
                        <li className={styles.subcat} key={index}>
                            <Link onClick={CloseMenu} href={{ pathname: '/Bags', query: { Subcat: info._id} }} className={styles.Links} >
                                {info.name}
                            </Link>
                        </li>
                        )}
                      </ul>
                  }
            </details>

            
          </div>

          <div className={styles.closeDiv} onClick={CloseMenu} ></div>
      </div>


      <div className={styles.Cartmenu} style={{left:`${Cartdisplay}`}} >

          <div className={styles.closeDiv} onClick={()=> setCartdisplay("100%")} ></div>
          <div className={styles.menuCart}>

            <div className={styles.nbAndclose}>

              <h1 className={styles.nameCart}>Cart</h1>
              <div className={styles.nbitems}>{Carts.length}</div>
              <svg onClick={()=> setCartdisplay("100%")}  className={styles.close} xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#FF4D4D">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
              </svg>

            </div>

           {Loading?
                <div className={styles.loadind}>
                    <svg className={styles.pl}  viewBox="0 0 240 240">
                        <circle className={styles.pl__ringa} cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                        <circle className={styles.pl__ringb} cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                        <circle className={styles.pl__ringc} cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        <circle className={styles.pl__ringd} cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                    </svg>
                </div>
             :
            (Carts.length>0?
            (
            <>
            <div className={styles.itemsinCart}>
              {Carts.map((cart,index)=>
                            <div key={index} className={styles.item}>
                              <div className={styles.imgItem} style={{backgroundImage:`url(https://devstyle-u119.onrender.com${cart.image})`}}></div>
                              <div className={styles.infoItem}>
                                <h2 className={styles.itemName}>{cart.name}</h2>
                                <p className={styles.descItem}>Color : {cart.color} , Size: {cart.size}</p>
                                <div className={styles.PriceandQuantity}>
                                  <h1 className={styles.Price}><span className={styles.quantityitem}>{cart.quantity} x</span> {cart.price}$</h1>
                                </div>
                              </div>
                              {WhenRemove === `${cart.item} ${cart.color}`?
                                              <svg   className={styles.whenremove} xmlns="http://www.w3.org/2000/svg" height="37px" viewBox="0 -960 960 960" width="37px" fill="#FF4D4D">
                                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
                                              </svg>
                                              :
                                              <svg  onClick={()=>RemoveItemFromCart(cart.item,cart.color,cart.size)}  className={styles.removeItem} xmlns="http://www.w3.org/2000/svg" height="37px" viewBox="0 -960 960 960" width="37px" fill="#FF4D4D">
                                                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
                                              </svg>
                                }
                            </div>
              )}
            </div>
            
            <div className={styles.orderSummary}>

              <div className={styles.subtotal}>
                <h2 className={styles.sub}>SubTotal</h2>
                <p className={styles.subPrice}>{Totalcart}$</p>
              </div>

              <Link href={"/cart"} className={styles.tocart} onClick={()=>setCartdisplay("100%")}>Go to Cart</Link>
              <Link href="/Checkout" className={styles.tocheckout} onClick={()=>setCartdisplay("100%")}>Checkout</Link>

            </div>

            </>
            )
            :
            <h1 className={styles.noItemcart}>No items found</h1>
            )
          }
          </div>
           
      </div>
      

      <div className={styles.searchcontainer} style={{display:`${Searsh}`}} >
        <div className={styles.search}>
          <form > 
            <input type="search" placeholder="Search for products" className={styles.inputsearch} onChange={Search}/>
            {Loadsearch && <div className={styles.loader}></div> } 

          </form>
          {SearchItems=="no"? <h1 style={{color:"red"}}>No products found</h1>:

          <div className={styles.itemssearch}>
          {SearchItems.map((item,index)=>
              <Link href={`/${item.category}/${item._id}`} onClick={closesearch} className={styles.itemsearch} key={index}>
                <div className={styles.itemseachimg} style={{backgroundImage:`url(https://devstyle-u119.onrender.com${item.imageCover})`}}></div>
                <div className={styles.infoseachitem}>
                  <h1 className={styles.Nameseachitem}>{item.name}</h1>
                  <p className={styles.priceitemseach}>{item.price}$</p>
                </div>
              </Link>
          )}
          </div>
          }
          <h1 className={styles.closeSearch} onClick={closesearch}>x</h1>
        </div>
      </div>

    </div>
  )
}
