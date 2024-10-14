import React, { useState, useEffect } from 'react';
import { Card, FormField, Loader } from "../components";
import './LandingPage.css'; // Reuse the CSS from LandingPage

const RenderCards = ({ data, name }) => {
  if (data?.length > 0) {
    return data.map((post) => 
      <Card 
        key={post._id}  
        name={post.name} 
        prompt={post.prompt}
        photo={post.photo} 
      />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
      {name}
    </h2>
  );
};

function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('result ', result.data.reverse())
        setAllPosts(result.data.reverse());  //reversing to bring the latest post on the top
      }
    }
    catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to fetch posts. Please try again later.');
    }
    finally {
      setLoading(false);  //stop loading
    }
  };

  useEffect(() => {
    fetchPosts();   //function call
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => { 
        const searchResults = allPosts.filter((item) => 
          item.name.toLowerCase().includes(searchText.toLowerCase()) || 
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="min-h-screen relative text-white flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-black z-0"></div>

      <div className="absolute inset-0 z-0 starry-background"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="font-extrabold text-white text-[35px]">
            The  Community  Showcase
          </h1>
          <p className="mt-1 text-white text-[20px] max-w-[500px] mx-auto">
            Browse through a collection of imaginative and visually stunning images generated by GENImage.
          </p>
        </div>

        <div className="mt-16">
          <FormField 
            labelname="Search posts" 
            type="text" 
            name="text" 
            placeholder="Search posts" 
            value={searchText} 
            handleChange={handleSearchChange} 
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing results for <span className="text-[#222328]"> {searchText} </span>
                </h2>
              )}

              <div className="grid lg-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards data={searchedResults} title="No search results found!" />
                ) : (
                  <RenderCards data={allPosts} title="No posts found!" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;



// import React, { useState, useEffect } from 'react';
// import { Card, FormField, Loader } from "../components";
// //import VideoBackground from '../components/VideoBackground';

// const RenderCards = ({ data, name }) => {
//   if (data?.length > 0) {
//     return data.map((post) => 
//       <Card 
//         key={post._id}  
//         name={post.name} 
//         prompt={post.prompt}
//         photo={post.photo} 
//       />);
//   }

//   return (
//     <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
//       {name}
//     </h2>
//   );
// };

// function Home() {
//   const [loading, setLoading] = useState(false);
//   const [allPosts, setAllPosts] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [searchedResults, setSearchedResults] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   const fetchPosts = async () => {
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/v1/post', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('result ', result.data.reverse())
//         setAllPosts(result.data.reverse());  //reversing to bring the latest post on the top
//       }
//     }
//     catch (error) {
//       console.error('Error fetching posts:', error);
//       alert('Failed to fetch posts. Please try again later.');
//     }
//     finally {
//       setLoading(false);  //stop loading
//     }
//   };

//   useEffect(() => {
//     fetchPosts();   //function call
//   }, []);


//   const handleSearchChange = (e)=>{
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(()=>{ 
//         const searchResults = allPosts.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
//         setSearchResults(searchResults)
//       }, 500)
//     );
//   }

//   return (
//     <section className="max-w-7xl mx-auto">
//       <div>
//         <h1 className="font-extrabold text-[#222328] text-[32px]">
//           "The Community Showcase"
//         </h1>
//         <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
//           Browse through a collection of imaginative and visually stunning images generated by GENImage AI.
//         </p>
//       </div>

//       <div className="mt-16">
//             <FormField labelname="Search posts" type="text" name="text" placeholder="Search posts" value={searchText} handleChange={handleSearchChange} />
//       </div>

//       <div className="mt-10">
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <Loader />
//           </div>
//         ) : (
//           <>
//             {searchText && (
//               <h2 className="font-medium text-[#666e75] text-xl mb-3">
//                 Showing results for <span className="text-[#222328]"> {searchText} </span>
//               </h2>
//             )}

//             <div className="grid lg-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
//               {searchText ? (
//                 <RenderCards data={searchedResults} title="No search results found!" />
//               ) : (
//                 <RenderCards data={allPosts} title="No posts found!" />
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Home;
