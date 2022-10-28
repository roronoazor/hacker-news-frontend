import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useNavigate } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const SelectByType = ({
    handleTypeChange= ()=>{},
    filters
  }) => {
    return (
      <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={filters?.type}
          label="Select Type:"
          onChange={handleTypeChange}
        >
          <MenuItem value=''>
            <em>All</em>
          </MenuItem>
          <MenuItem value={'story'}>Story</MenuItem>
          <MenuItem value={'comment'}>Comment</MenuItem>
          <MenuItem value={'poll'}>Poll</MenuItem>
          <MenuItem value={'pollopt'}>Poll Opt</MenuItem>
          <MenuItem value={'job'}>Job</MenuItem>
        </Select>
        <FormHelperText>Select Type: </FormHelperText>
      </FormControl>
    </div>
    )
  }

function Header(props) {
  const { 
    sections,
    title,
    onSearchChange,
    handleSearch, 
    handleTypeChange,
    filters,
    mode=null,
  } = props;

  let navigate = useNavigate();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {
          (mode != 'create') && (
            <Button variant="Primary" size="small" onClick={ () => navigate('/add-post') }>
              Click to add post
            </Button>
          )
        }
        {
          (mode == 'create') && (
            <Button variant="Primary" size="small" onClick={ () => navigate('/') } color='error'>
              Go Back Home
            </Button>
          )
        }
        {
          (mode != 'create') && (
            <SelectByType 
              filters={filters}
              handleTypeChange={handleTypeChange}
            />
          )
        }
        {
          (mode != 'create') && (
          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onSearchChange}
              />
          </Search>
          )
        }
        {
          (mode != 'create') && (
            <Button 
              variant="outlined" 
              size="small"
              onClick={handleSearch}
              >
              Search
            </Button>
          )
        }
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;