import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { FormControlLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Box, Grid, Table, TableCell, TableRow, Button, TextField, DialogTitle, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {base_url_pagename, getpagenames, createpage, updatepage, getsection} from '../../ApiServices';


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentPageId, setcurrentPageId] = useState(null);
  const [search, setSearch] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [pagename, setpagename] = useState(null);
  const [isActive, setisActive] = useState(false);
  const [myData, setmyData] = useState([]);

  const fetchpages = async () => {
    const response = await fetch(getpagenames);
    if (!response.ok) {
      throw new Error("The data is not accurate");
    }
    const data = await response.json();
    setRows(data);
    setSearch(data);
  };

  useEffect(() => {
    fetchpages();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgb(220, 220, 220)',
      color: theme.palette.common.black,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#fffff',
      color: theme.palette.common.black,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (pagerow) => {
    setEditMode(true);
    setcurrentPageId(pagerow.pageId);
    setExpanded('panel1');
    setpagename(pagerow.pageName);
    setisActive(pagerow.isActive);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCancel = () => {
    setExpanded(false);
    setpagename('');
    setisActive(false);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.pageName.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
    });
    setSearch(searchedVal.length < 1 ? rows : filteredRows);
    setPage(0); // Reset to the first page on search
  };

  const handleDelete = async (deletedpageId) => {
    const item = myData.find(item => item.pageId === deletedpageId);

    if (!item) {
      try {
        const response = await fetch(`${base_url_pagename}/${deletedpageId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete section');
        }

        console.log('Section deleted successfully');
        fetchpages(); // Refetch the data to update the table
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    } else {
      toast.error('The deleted pageId has an associativity');
    }
  };

  const fetchpageID = async () => {
    const response = await axios.get(getsection);
    setmyData(response.data);
  };

  useEffect(() => {
    fetchpageID();
  }, []);

  const handleSubmit = async () => {
    try {
      const currentDate = new Date().toISOString();

      const response = await fetch(getpagenames, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageName: pagename,
          isActive: isActive,
          pageId: editMode ? currentPageId : 0,
          createdDate: currentDate,
          updatedDate: currentDate,
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'edit' : 'add'} section`);
      }

      console.log(`Section ${editMode ? 'edited' : 'added'} successfully`);
      fetchpages(); // Refetch data to update table
      setEditMode(false);
      setpagename('');
      setisActive(false);
      setExpanded(false);
    } catch (error) {
      console.error(`Error ${editMode ? 'editing' : 'adding'} section:`, error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="contained"><Typography>Add</Typography></Button>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Grid className='discount-content' style={{ width: '100%' }}>
              <Grid sx={{ pl: 2 }}>
                <DialogTitle sx={{ mb: 1, padding: 0, color: 'black' }}>Page Name:</DialogTitle>
                <TextField
                  sx={{ width: '50%', mb: 1 }}
                  variant="outlined"
                  required
                  id="name"
                  placeholder='Page*'
                  name="discount"
                  type="text"
                  value={pagename}
                  autoComplete="discount"
                  size="small"
                  onChange={(e) => setpagename(e.target.value)}
                />
              </Grid>
              <FormControlLabel
                label='IsActive'
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setisActive(e.target.checked)}
                    sx={{ ml: 2 }}
                  />
                }
                sx={{ mr: 28 }}
              />
              <Grid item container direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>

                <Button
                  sx={{ ml: 1 }}
                  type="submit"
                  variant="contained"
                  color="error"
                  aria-controls="panel1-content"
                  id="panel1-header"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <form style={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="search-bar"
              className="text"
              label="Search"
              variant="outlined"
              placeholder="Search..."
              size="medium"
              color="primary"
              margin="normal"
              sx={{
                width: 350,
                margin: "10px auto",
                color: "blue",
                border: "Highlight"
              }}
              onChange={(e) => requestSearch(e.target.value)}
            />
          </form>
        </Box>
        <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S No</StyledTableCell>
                  <StyledTableCell align="middle">Page Name</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {search.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <StyledTableRow key={row.pageId}>
                    <StyledTableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.pageName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Checkbox
                        checked={row.isActive}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Grid style={{ display: 'flex', justifyContent: "right" }}>
                        <EditIcon style={{ color: 'black', marginRight: '15px' }} onClick={() => handleEdit(row)} />
                        <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(row.pageId)} />

                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored"
                        />
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={search.length} // Count based on filtered search
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

      </Box>
    </Box>
  );
}

export default Page;
