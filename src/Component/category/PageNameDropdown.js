import React, { useEffect } from 'react';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import { getpagenames } from '../../ApiServices';

const DropdownMenu = ({ onSelectPageId }) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [menuOptions, setMenuOptions] = React.useState([]);

  useEffect(() => {
    const fetchMenuOptions = async () => {
      try {
        const response = await fetch(getpagenames);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMenuOptions(data);
      } catch (error) 
      {
        console.error('Failed to fetch menu options:', error);
      }
    };
    fetchMenuOptions();
  }, []);

  const handleChange = (event) => {
    const selectedOption = menuOptions.find(option => option.pageName === event.target.value);
    setSelectedValue(event.target.value);
    if (selectedOption) { 
      onSelectPageId(selectedOption.pageId); // Pass the pageId to the parent component
    }
    console.log(`Selected option: ${event.target.value}`);
  };

  return (
    <Box sx={{ width: '70%', height: '40px' }}>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={handleChange}
          required
          sx={{ height: '40px', width: '72%', ml: '20px' }}
        >
          <MenuItem value="" disabled>
            <em>Select an option</em>
          </MenuItem>
          {menuOptions.map((item) => (
            <MenuItem key={item.pageId} value={item.pageName}>
              {item.pageName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownMenu;
