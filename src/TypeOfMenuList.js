import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, IconButton,
  Grid, Box, Button, DialogTitle, Typography, Card,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { base_url_menuname } from './ApiServices';

const TypeOFMenuList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch menu data
  const fetchMenuData = async () => {
    try {
      const response = await axios.get('https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/Menu');
      if (response.status !== 200) {
        throw new Error("Failed to fetch menu data");
      }
      setData(response.data);
      console.log("Here is the api response data",response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching menu data');
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle edit
  const handleEdit = (row) => {
    setEditMode(true);
    setEditId(row.MenuId);
    setMenuName(row.menuName);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (MenuId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this menu item?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${base_url_menuname}/${MenuId}`);
        if (response.status === 204) {
          toast.success('Menu item deleted successfully');
          fetchMenuData();
        } else {
          throw new Error('Failed to delete menu item');
        }
      } catch (error) {
        console.error('Error deleting menu item:', error);
        toast.error('Failed to delete menu item');
      }
    }
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page when search input changes
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const url = base_url_menuname;
      const method = editId ? axios.put : axios.post;
      const response = await method(url, { MenuName: menuName, MenuId: editMode ? editId : 0 });

      if (response.status === 201 || response.status === 200) {
        toast.success('Menu Type Added/Updated Successfully');
        setError('');
        setMenuName('');
        setEditId(0);
        setShowForm(false);
        fetchMenuData();
      }
    } catch (err) {
      setError('Error adding/updating menu type. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

 // Filtered data based on search input
 const filteredData = data.filter(row => 
  row.menuName && row.menuName.toLowerCase().includes(search.toLowerCase())
  
);
console.log("Here is the filtered data",filteredData);
  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }} className='table-card'>
      {/* Form for adding/editing menu type */}
      {showForm && (
        <Card sx={{ minWidth: 275, mt: 2, pb: 1 }}>
          <form onSubmit={handleSubmit} className='tondform-css'>
            <Grid container>
              <Grid item xs={6} sx={{ mt: 2, mb: 1, pl: 3, pr: 1 }}>
                <DialogTitle sx={{ pl: 0, pr: 0 }}>{editId ? 'Edit Menu Type' : 'Add Menu Type'}</DialogTitle>
                <TextField
                  fullWidth
                  id="typeofmenu"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  label="Type Of Menu"
                  variant="outlined"
                />
                {error && <Typography className='errorcss'>{error}</Typography>}
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, mb: 2, pl: 2, pr: 3 }} textAlign={'right'}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  sx={{ marginRight: '4px' }}
                  className='primary mr-12 custom-space'
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setMenuName('');
                  }}
                  type="button"
                  sx={{ marginLeft: '4px' }}
                  className='warning'
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
          <Button sx={{ mt: 1.5 }} variant="contained" className='primary' onClick={() => {
            setShowForm(true);
            setEditId(null);
            setMenuName('');
          }}>
            + ADD
          </Button>
        </Grid>
        <Grid item xs={3}>
          <TextField
            className='search-css'
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Search menu type"
            value={search}
            onChange={handleSearchChange}
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
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>S.No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type Of Menu</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.MenuId}>
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{row.menuName}</TableCell>
                <TableCell align="right">
                  <Grid style={{ display: 'flex', justifyContent: "right" }}>
                    <EditIcon style={{ color: 'black', marginRight: '15px', cursor: 'pointer' }} onClick={() => handleEdit(row)} />
                    <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(row.MenuId)} />
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
        count={filteredData.length} // Update to show filtered count
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
      />
    </Paper>
  );
};

export default TypeOFMenuList;
