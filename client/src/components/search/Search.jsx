import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Post from '../post/Post';
import './search.css';

const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [loading,setloading] = useState(false);
  const [data,setData] = useState([]);
  const [error,setError] = useState(false);

  const showMessage = (msg) => {
    toast.info(msg,{
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const handleSearch = async (e) => {
    
    if(searchText === ""){
      setError(true);
    }else{
      setloading(true);

      try {

        const response = await axios.get(`/api/posts/search/${searchText}`);
        // console.log(response.data);
        if(response.data.length === 0){
          showMessage("No results found");
        }
        setData(response.data);
        setloading(false);
        
      } catch (error) {
        console.log(error);
        setError(true);
      }
      
    }
  }

  return (
    
    <div className="search" >
          
    <div className="child-search">

      <div className="real-search">

        <input width="100%" id="Search" type="search" placeholder="Search any post or blog etc....."
        onChange={(e) => setSearchText(e.target.value)}/>

        <button disabled={loading} onClick={handleSearch}>Search</button>

      </div>

      
    </div>

    <div className="searchResult">

      {
        error ? <span className='msg'>please enter a search text</span>:
        
        loading ? 'Loading.please wait...' : 
        
        data.length > 0 &&
        
          data.map(post => (
            <Post key={post._id} post={post} />
          ))
        
      }

    </div>
   
    <ToastContainer/>

    </div>
  
 

  )

}

export default Search;