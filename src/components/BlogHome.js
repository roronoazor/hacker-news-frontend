import * as React from 'react';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import { fetchData } from '../modules/util_query';
import { handleApiError } from '../modules/responseHandlers';
import { initializeUrlWithFilters, injectArguments } from '../modules';
import { FETCH_ITEMS, DELETE_ITEM } from '../config/api';
import { useQuery } from 'react-query';
import Loader from './Loader';
import Header from './Header';
import { sections } from './sections';
import { useMutation, useQueryClient } from 'react-query';
import { postData, deleteData } from '../modules/util_query';
import { toast } from 'react-hot-toast';
  
  const mainFeaturedPost = {
    title: 'Hacker News Blog',
    description:
      "One place to get all the latest information about the lastest hacker culture.",
    image: 'https://source.unsplash.com/random',
    imageText: '',
    linkText: '',
  };
  
  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
    },
  ];
  
  
  const sidebar = {
    title: 'About',
    description:
      `This is a news blog about all the deals going down in the hacker community, for new members wishing to come over to the dark side
      follow us on dark web for updates.
      `,
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };
  
  
  export default function BlogHome() {


    const [items, setItems] = React.useState([]);
    const [count, setCount] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [urlWithFilters, setUrlWithFilters] = React.useState('');
    const [filters, setFilters] = React.useState({});
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteData,{
      onSuccess: (response) => {
        toast.success("deleted successfully");
        queryClient.invalidateQueries("items");
      },
      onError: (error, variables, context) => {
        handleApiError(error);
      }
    }
      );
    let payload_data = {};
    
    const result = useQuery(
      [
        'items',
        {
          url: urlWithFilters ? urlWithFilters : FETCH_ITEMS + `?page=${page}`,
          payload_data
        }
      ],
      fetchData,
      {
        retry: false,
        onSuccess: (res) => {        
          let results = res?.data?.results || [];
          let page = res?.data?.page || 1;
          let lastPage = res?.data?.last_page || 1;
          setItems(results);
          setPage(page);
          setLastPage(lastPage);
          setCount(res?.data?.count);

        },
        onError: (error) => {
          handleApiError(error);
        }
      }
    );

    const handlePageChange = (evt, value) => {
      setPage(value);
      window.scrollTo(0, 0); // moves the compoent to the top of the page
    };
  
    const onSearchChange = (evt) => {
      // setSearchValue(value);
      setFilters({ ...filters, search: evt.target.value });
    };
  
    const onTypeChange = (evt) => {
      setFilters({ ...filters, type: evt.target.value});
      let urlAndFilter = initializeUrlWithFilters(
        FETCH_ITEMS + `?page=${page}`,
        {...filters, type: evt.target.value}
      )
      console.log(urlAndFilter);
      setUrlWithFilters(urlAndFilter);
    };
  
    const handleSearch = () => {
      let urlAndFilter = initializeUrlWithFilters(
        FETCH_ITEMS + `?page=${page}`,
        filters
      );
      
      // once the url string changes, the useQuery hook will fire again
      setUrlWithFilters(urlAndFilter);
    };

    const deleteItem = (id) => {

      mutation.mutate({
        url: injectArguments(DELETE_ITEM, {id}),
        payload_data: {
          id
        },
    })

    };
  
    const { isLoading, isError, data, error, isFetching } = result;
  
  

    return (
      <>
        <Header 
          title="Hacker News Blog"
          sections={sections}
          onSearchChange={onSearchChange}
          handleTypeChange={onTypeChange}
          filters={filters}
          handleSearch={handleSearch}
        />
        { (isLoading || mutation?.isLoading) ? 
          <Grid container spacing={4} sx={{ minWidth: 700}}>
            <Loader />
          </Grid>
          :
          <>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
                ))}
            </Grid>
            <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main 
                  title={`Check out our content, We have Over ${count} items`}
                  posts={items}
                  page={page}
                  lastPage={lastPage}
                  handlePageChange={handlePageChange}
                  deleteItem={deleteItem}
                  />
                <Sidebar
                  title={sidebar.title}
                  description={sidebar.description}
                  archives={[]}
                  social={sidebar.social}
                />
            </Grid>
          </>
        } 
        </>    
    );
  }
