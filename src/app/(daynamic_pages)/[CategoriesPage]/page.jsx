"use client"
import Link from 'next/link'
import styles from './page.module.css'
import SwiperSub from './subcat'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import {  useSearchParams } from 'next/navigation'
import { CheckToken } from '@/Context/UserContext'



export default function CategoriesPage({params}) {
    const searchParams = useSearchParams();
    const {setDisplayUser,DisplayUser ,Login,setNbinwishlist}=CheckToken();
    const[Pagination,setPagination]=useState(1);
    const [Min,setMin]=useState(0);
    const [Max,setMax]=useState(100);
    const [Minprice,setMinprice]=useState(0);
    const [Maxprice,setMaxprice]=useState(100);
    const [SortNew,setSortNew]=useState(-1);
    const [Popular,setPopular]=useState(false);
    const [Token,setToken]=useState(false);
    const [Refresh,setRefresh]=useState(false);
    const [Load,setLoad]=useState({});
    const [Loading,setLoading]=useState(false)
    const [Items,setItems]=useState([])   
    const [Wishlist,setWishlist]=useState([]);
    const [NbItems,setNbItems]=useState(0);

    // check if token is exist or no 
    useEffect(() => {
      // Check for token on component load
      const token = localStorage.getItem("Token");
      setToken(!!token); // true if token exists, false otherwise
  },[DisplayUser,Login]);

    const [dataFromChild, setDataFromChild] = useState(searchParams.get('Subcat') || '');
    useEffect(()=>{
      setPagination(1)
    },[dataFromChild])
    //for get which subcat we use
    const handleDataFromChild = (data) => {
        setDataFromChild(data);
    };

// add and delete dunctions from wishlist
    async function addTowishlist(id){
        if (Token) {

        setLoad((prev) => ({ ...prev, [id]: true }));
      try{
       await axios.post("https://devstyle-u119.onrender.com/api/Wishlist",{
       items:id
      },
      {
       headers: {
         Authorization:`Bearer ${localStorage.Token}` , 
       }
      }
      )

        setRefresh(ref => !ref)
        setNbinwishlist(nb => !nb)

      }
     catch(err){
      console.log(err)
     }
     finally{
        setLoad((prev) => ({ ...prev, [id]: false }));

     }            
     }
     else{
        setDisplayUser("flex")
      }
    }
    async function Delfromwishlist(id){
        if (Token) {
        setLoad((prev) => ({ ...prev, [id]: true }));
      
      try{
        const res = await axios.delete("https://devstyle-u119.onrender.com/api/Wishlist", {
          data: { items: id }, 
          headers: {
            Authorization: `Bearer ${localStorage.Token}`,
          },
        });
     
        setRefresh(ref => !ref)
        setNbinwishlist(nb => !nb)

      }
     catch(err){
      console.log(err)
     }
     finally{
        setLoad((prev) => ({ ...prev, [id]: false }));
     }}
     else{
        setDisplayUser("flex")
      }
    }

  // for check if this item in wishlist or no  
  const getWishlist=async()=>{
      try {
          const res = await axios.get( `https://devstyle-u119.onrender.com/api/Wishlist/inwishlist`,
              {
                  headers: {
                    Authorization:`Bearer ${localStorage.Token}` , 
                  }
              }
          );
          setWishlist(res.data.data[0].items);
            
      } catch (error) {
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
      if (Token){
        getWishlist();
      }
  },[Token,Refresh])

  // for get items
    const getItems=async()=>{
        setLoading(true);
        try {
            const subcategoryParam = dataFromChild ? `&subcategory=${dataFromChild}` : '';
            const popularParam = Popular ? `&populars=-1` : `&populars=1`;
            const sortNew = Popular ? '' : `&sortNew=${SortNew}`;

            
            const res = await axios.get( `https://devstyle-u119.onrender.com/api/Items/cat/${params.CategoriesPage}?minPrice=${Minprice}&maxPrice=${Maxprice}${sortNew}&limit=6&page=${Pagination}${subcategoryParam}${popularParam}`);
                setItems(res.data.data);
                setNbItems(res.data.Nbitems);
                
        } catch (error) {
             setItems([])
             console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
         getItems();
    }, [Minprice, Maxprice, SortNew, Popular, Pagination,dataFromChild,Refresh]);


    // get the main minprice and maxprice in that cat 
    const getPrices=async()=>{
        try {
            const res = await axios.get( `https://devstyle-u119.onrender.com/api/Items/cat/${params.CategoriesPage}`);  
            setMin(res.data.minPrice);
            setMinprice(res.data.minPrice);
            setMax(res.data.maxPrice);
            setMaxprice(res.data.maxPrice);
        } catch (error) {
             console.log(error);
        }
    }
    useEffect(()=>{
        getPrices();
    },[])
    
    // handle functions for update values when we want filter
    const minprice=(e)=>{
        setMinprice(e.target.value)
        setPagination(1)
    }
    const maxprice=(e)=>{
        setMaxprice(e.target.value)
        setPagination(1)

    }
    const sortnew=(e)=>{
        setSortNew(e.target.value)
    }
    const popular=()=>{
            setPopular((prevPopular) => !prevPopular)
      }

// handle pagination functions
const maxPages =  Math.ceil(NbItems / 6); 

    
    function plusOne() {
        if (Pagination < maxPages) {
            setPagination(Pagination + 1);
            
        }
    }
    function minsOne(){
        if (Pagination>1) {
           return setPagination(Pagination-1)
        }        
    }  
    



    return (
    <div className={styles.catPage}>
      <h1 className={styles.catName}>{params.CategoriesPage}</h1>
      
      <SwiperSub cat={params.CategoriesPage} Subcats={handleDataFromChild}/>

      <div className={styles.filters}>
        <select className={styles.filter} onChange={sortnew}> 
            <option value="-1">New arrivals</option>
            <option value="1">Old arrivals</option>
        </select>

        <button className={styles.filterPopular} onClick={popular} style={{backgroundColor:Popular?"#FF4D4D":""}}>Most popular</button>
     
        <div className={styles.filterPrice} >
            <p style={{fontFamily:"sans-serif"}}>price range</p>
            <form className={styles.ranges}>
                <label className={styles.labels}> min : {Minprice}</label>
                <input type="range" min={Min} max={Maxprice} className={styles.range} value={Minprice} onChange={minprice}/>
                <label className={styles.labels}> max : {Maxprice}</label>
                <input type="range" min={Minprice} max={Max} className={styles.range} value={Maxprice} onChange={maxprice} />
            </form>
        </div>
      </div>

      {Loading ? 
            <div className={styles.loadind}>
                <svg className={styles.pl}  viewBox="0 0 240 240">
                    <circle className={styles.pl__ringa} cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                    <circle className={styles.pl__ringb} cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                    <circle className={styles.pl__ringc} cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                    <circle className={styles.pl__ringd} cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                </svg>
            </div>
            :
            <> 
            {Items.length==0? <h2 className={styles.noitems}>No Items Found</h2>:
                <>
                <div className={styles.items}>
                        {Items.map((item,index)=>{
                          const isInWishlist = Wishlist.some((wishlistItem) => wishlistItem._id === item._id);
                                  
                          return (<Link href={`/${item.category}/${item._id}`} className={styles.item} key={index}>
                                          <div className={styles.img}  style={{backgroundImage:`url(https://devstyle-u119.onrender.com${item.imageCover})`}}>
                                              {Load[item._id]? 
                                                  <div className={styles.dotspinner}>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                      <div className={styles.dotspinner__dot}></div>
                                                  </div>
                                                  :
                                                  <svg  onClick={(e)=> { e.preventDefault(),isInWishlist? Delfromwishlist(item._id) : addTowishlist(item._id)}} 
                                                  className={styles.towishlist} width="35" height="35" viewBox="0 0 35 35" fill={isInWishlist?"red":"none"} xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M17.2969 11.0498C14.7813 5.31325 5.97656 5.92424 5.97656 13.2562C5.97656 20.5882 17.2969 26.6981 17.2969 26.6981C17.2969 26.6981 28.6173 20.5882 28.6173 13.2562C28.6173 5.92424 19.8126 5.31325 17.2969 11.0498Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                                      <rect x="0.730469" y="0.695312" width="34" height="34" rx="17" fill="white"/>
                                                      <path d="M18.3204 12.8545C15.8047 7.11794 7 7.72893 7 15.0609C7 22.3929 18.3204 28.5028 18.3204 28.5028C18.3204 28.5028 29.6408 22.3929 29.6408 15.0609C29.6408 7.72893 20.836 7.11794 18.3204 12.8545Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                              }
                                              
                                              {item.inStock==0 && <p className={styles.outofstock}>out of stock</p>}
                                              {item.saleByPercentage>0 && <p className={styles.salecontainer}>-{item.saleByPercentage}%</p>}
                                              
                                          </div>
                                          <h2 className={styles.titleItem}>{item.name}</h2>
                                          <div className={styles.infoItem}>
                                              <p className={styles.price}>{item.price}$</p>
                                              <button href="" className={styles.tocart} >Add to cart</button>
                                          </div> 
                                    </Link>)
                        })}
                </div>


                <div className={styles.pages}>

                <div className={styles.nextPage} onClick={minsOne}  style={{opacity:Pagination===1?0.4:1}}>
                        <svg className={styles.flash} xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#5f6368"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                        <h2 className={styles.next}>Previous Page</h2>
                </div>
                <div className={styles.nextPage}  onClick={plusOne} style={{opacity:Pagination===maxPages?0.4:1}}>
                        <h2 className={styles.next}>Next Page</h2>
                        <svg className={styles.flash} xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#5f6368"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                </div>

                </div>
                </>
            }
            </>
       }
    </div>
  )
}
