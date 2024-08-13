import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, IconButton,
  Grid, Box, Button, Card, DialogTitle, MenuItem, FormControl,
  InputLabel, Select, Checkbox, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4 } from 'uuid';
import {base_url_menuitem,getmenuitem,getmenu,createmenuitem,updatemenuitem} from './ApiServices';

const MenuMasterList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedcategoryID, setselectedcategoryID] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeOfMenu, setTypeOfMenu] = useState('');
  const [typeOfMenus, setTypeOfMenus] = useState([]);
  const [inputRows, setInputRows] = useState([{ id: uuidv4(), foodName: '', description: '', available: false }]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch Menu Master Data
  const fetchMenuMasterData = async () => {
    try {
      const response = await axios.get(getmenuitem);
      if (response.status !== 200) {
        throw new Error("The data is not accurate");
      }
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Menu Types
  const fetchMenuTypes = async () => {
    try {
      const response = await axios.get(getmenu);
      if (response.status !== 200) {
        throw new Error("The data is not accurate");
      }
      setTypeOfMenus(response.data);
    } catch (error) {
      console.error("Error fetching menu types:", error);
    }
  };

  useEffect(() => {
    fetchMenuMasterData();
    fetchMenuTypes();
  }, []);

  // Handle Edit
  const handleEdit = (row) => {
    setEditId(row.menuId);
    setShowForm(true);

    const existingRowData = {
      id: uuidv4(),
      foodName: row.menuItemName,
      description: row.menuDesc,
      available: row.isActive || false
    };

    setInputRows([existingRowData]);

    const selectedMenu = typeOfMenus.find(menu => menu.categoryid === row.categoryId);
    if (selectedMenu) {
      setTypeOfMenu(selectedMenu.categoryName);
      setselectedcategoryID(selectedMenu.categoryid);
    }
  };

  const handleTypeOfMenuChange = (event) => {
    setTypeOfMenu(event.target.value);
    const selectedModule = typeOfMenus.find(module => module.categoryName === event.target.value);
    if (selectedModule) {
      setselectedcategoryID(selectedModule.categoryid);
    }
  };

  // Handle Delete
  const handleDelete = async (menuId) => {
    try {
      const response = await axios.delete(`${base_url_menuitem}/${menuId}`);
      if (response.status === 204) {
        fetchMenuMasterData();
        console.log('Menu item deleted successfully');
      } else {
        throw new Error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getTypeofMenuNameById = (categoryId) => {
    const menuitem = typeOfMenus.find((menuitem) => menuitem.categoryid === categoryId);
    return menuitem ? menuitem.categoryName : 'Unknown';
  };

  const handleCancel = () => {
    setShowForm(false);
    setTypeOfMenu('');
    setselectedcategoryID(0);
  };

  const handleAddRow = () => {
    const newRow = { id: uuidv4(), foodName: '', description: '', available: false };
    setInputRows([...inputRows, newRow]);
  };

  const handleRemoveRow = (id) => {
    if (inputRows.length > 1) {
      const updatedRows = inputRows.filter(row => row.id !== id);
      setInputRows(updatedRows);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const datatosend_array = {
      menuItems: inputRows.map(row => ({
        menuId: editId || 0,
        categoryid: selectedcategoryID,
        menuItemName: row.foodName,
        menuDesc: row.description,
        isActive: row.available || false,
      }))
    };

    try {
      let response;
      if (editId) {
        response = await axios.put(updatemenuitem, datatosend_array);
      } else {
        response = await axios.post(createmenuitem, datatosend_array);
      }

      console.log('Food items saved successfully:', response.data);
      if (response.status === 200) {
        fetchMenuMasterData();
        setTypeOfMenu('');
        setShowForm(false);
        setInputRows((prevRows) =>
          prevRows.map((row) => ({ ...row, foodName: '', description: '', available: false }))
        );
      }
    } catch (error) {
      console.error('Error saving food items:', error);
    }
  };

  // Filter data based on the search term
  const filteredData = data.filter(item =>
    item.menuItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.menuDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }} className='table-card'>
      {showForm && (
        <Card sx={{ minWidth: 275, mt: 0, pb: 1 }}>
          <form className='tondform-css' onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 0, mb: 14, pl: 2, pr: 2 }}>
                <DialogTitle sx={{ pl: 0, pr: 0 }}>Type Of Menu</DialogTitle>
                <FormControl fullWidth sx={{ height: '56px' }}>
                  <InputLabel id="type-of-menu-label">Type of Menu</InputLabel>
                  <Select
                    fullWidth
                    labelId="type-of-menu-label"
                    id="type-of-menu-select"
                    value={typeOfMenu}
                    label="Type Of Menu"
                    onChange={handleTypeOfMenuChange}
                    sx={{ height: '50px', width: '50%' }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select an option</em>
                    </MenuItem>
                    {typeOfMenus.map((item) => (
                      <MenuItem key={item.categoryid} value={item.categoryName}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <DialogTitle sx={{ pl: 0, pr: 0 }}>Sub Menu</DialogTitle>

                <Box>
                  <Grid container alignItems="center" className='table-header-grid' sx={{ backgroundColor: '#f5f5f5', padding: '8px 0', marginBottom: '8px' }}>
                    <Grid item xs={1.8} style={{ textAlign: 'center' }} className='grid-column-style'>
                      <Typography fontWeight="bold" color="#000">S.No</Typography>
                    </Grid>
                    <Grid item xs={3} className='grid-column-style'>
                      <Typography fontWeight="bold" color="#000">Menu Item</Typography>
                    </Grid>
                    <Grid item xs={3} className='grid-column-style'>
                      <Typography fontWeight="bold" color="#000">Description</Typography>
                    </Grid>
                    <Grid item xs={2} className='grid-column-style custom-spacing'>
                      <Typography fontWeight="bold" color="#000">Available</Typography>
                    </Grid>
                    <Grid item xs={2} className='grid-column-style custom-spacing margin-right'>
                      <Typography fontWeight="bold" color="#000">Action</Typography>
                    </Grid>
                  </Grid>

                  {inputRows.map((row, index) => (
                    <Grid container spacing={2} sx={{ mb: '10px' }} alignItems="center" key={row.id} className="input-row">
                      <Grid item xs={1.7}>
                        <Typography className="serial-number" sx={{ marginLeft: '55px' }}>{index + 1}</Typography>
                      </Grid>
                      <Grid item xs={2.8}>
                        <TextField
                          fullWidth
                          id={`foodName-${index}`}
                          label="MenuItem Name"
                          variant="outlined"
                          value={row.foodName}
                          onChange={(e) => {
                            const newRows = inputRows.map(r => r.id === row.id ? { ...r, foodName: e.target.value } : r);
                            setInputRows(newRows);
                          }}
                          sx={{ height: '56px' }}
                        />
                      </Grid>
                      <Grid item xs={3.1} sx={{ marginRight: '15px' }}>
                        <TextField
                          label="Description"
                          fullWidth
                          multiline
                          minRows={1}
                          required
                          id={`description-${index}`}
                          placeholder="Description"
                          variant="outlined"
                          value={row.description}
                          onChange={(e) => {
                            const newRows = inputRows.map(r => r.id === row.id ? { ...r, description: e.target.value } : r);
                            setInputRows(newRows);
                          }}
                          sx={{ height: '56px' }}
                        />
                      </Grid>
                      <Grid item xs={2} className="flex-center custom-spacing ">
                        <Checkbox
                          className='check-box-space'
                          checked={row.available}
                          onChange={(e) => {
                            const newRows = inputRows.map(r => r.id === row.id ? { ...r, available: e.target.checked } : r);
                            setInputRows(newRows);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2} className="flex-center">
                        {index === inputRows.length - 1 ? (
                          <>
                            <button className="icon-add" onClick={handleAddRow} type="button">
                              <AddIcon />
                            </button>
                            {index > 0 && (
                              <IconButton className="icon-btn-minus" onClick={() => handleRemoveRow(row.id)}>
                                <RemoveIcon />
                              </IconButton>
                            )}
                          </>
                        ) : (
                          <IconButton className="icon-btn-minus" onClick={() => handleRemoveRow(row.id)}>
                            <RemoveIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Box>

                {error && (
                  <Grid item xs={12} sx={{ mb: 1, pl: 0, pr: 2 }}>
                    <Typography fontSize={13} color="error">{error}</Typography>
                  </Grid>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: 2, mb: 2, pl: 2, pr: 3 }} textAlign={'right'}>
                <Button variant="contained"
                  color="primary" type="submit"
                  disabled={isLoading}
                  className='primary mr-12 custom-space'
                  onClick={handleSubmit}
                  sx={{ marginRight: '4px' }}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
                <Button variant="contained"
                  color="error"
                  onClick={handleCancel}
                  type="button"
                  className='warning'
                  sx={{ marginLeft: '4px' }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      )}

      <Grid container spacing={4} className='table-top-head'>
        <Grid item xs={7}></Grid>
        <Grid item xs={2} textAlign={'right'}>
          <Button sx={{ mt: 1.5 }} variant="contained" className='primary' onClick={() => setShowForm(true)}>
            + ADD
          </Button>
        </Grid>
        <Grid item xs={3}>
          <TextField
            className='search-css'
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Search"
            onChange={handleSearchChange} // Update search term on change
            InputProps={{
              sx: {
                height: '36px',
                padding: '4px 8px',
                bgcolor: 'background.paper',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'secondary.main',
                },
              },
              endAdornment: (
                <IconButton sx={{ padding: '4px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: '90%' }}
          />
        </Grid>
      </Grid>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="enhanced table">
          <TableHead sx={{ backgroundColor: 'rgb(220, 220, 220)' }}>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>S.No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type Of Menu</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Menu Item</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Available</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.menuId}>
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{getTypeofMenuNameById(row.categoryId)}</TableCell>
                <TableCell>{row.menuItemName}</TableCell>
                <TableCell>{row.menuDesc}</TableCell>
                <TableCell>{row.isActive ? 'True' : 'False'}</TableCell>

                <TableCell align="right">
                  <Grid style={{ display: 'flex', justifyContent: "right" }}>
                    <EditIcon style={{ color: 'black', marginRight: '15px', cursor: 'pointer' }} onClick={() => handleEdit(row)} />
                    <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(row.menuId)} />
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length} // Total count of filtered data
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
  );
};

export default MenuMasterList;
