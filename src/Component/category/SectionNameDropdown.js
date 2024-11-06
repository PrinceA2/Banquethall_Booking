import React, { useEffect } from 'react';
import { Box, MenuItem } from '@mui/material';
import {FormControl, Select} from '@mui/material';
import { getsection } from '../../ApiServices';

const DropdownMenuSection = ({ label, items }) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [menuOptions, setmenuOptions] = React.useState([]);

  useEffect (()=>{
    const fetchMenuOptions = async () =>{
      const response = await fetch(getsection);
      const data = await response.json();
      setmenuOptions(data);
    };
    fetchMenuOptions();
  }  ,[]);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    
    console.log(`Selected option: ${event.target.value}`);
  };

  return (
    <Box sx={{ width: '70%', height: '40px' }}>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={handleChange}
          required
          sx={{ height: '40px' , width:'72%' ,ml:'20px'}}
        >
          <MenuItem value="">
            <em>Select an option</em>
          </MenuItem>
          {menuOptions && menuOptions.map((item) => (
            <MenuItem key={item.pageId} value={item.pageName}>
              {item.pageName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownMenuSection;
