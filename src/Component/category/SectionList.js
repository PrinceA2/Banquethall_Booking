import React, { useEffect } from 'react';
import SideBar from '../SideBar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Box, Grid, Table, TableCell, TableRow, Button, TextField, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControlLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import DropdownMenu from './PageNameDropdown';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { base_url_section,getsection,getpagenames,createsection,updatesection } from '../../ApiServices';

const Section = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expanded, setExpanded] = React.useState(false);
  const [pageNames, setPageNames] = React.useState([]);
  const [selectedPageId, setSelectedPageId] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [sectionName, setSectionName] = React.useState(''); 
  const [sectionSequence, setSectionSequence] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editSectionId, setEditSectionId] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteSectionId, setDeleteSectionId] = React.useState(null);
  const [search, setSearch] = React.useState([]);
  const [myData, setMyData] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(getsection);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Sections Data:', data);
      setRows(data);
      setSearch(data); // Initialize search with full data

      const pageResponse = await fetch(getpagenames);
      if (!pageResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const pageData = await pageResponse.json();
      console.log('Page Names Data:', pageData);
      setPageNames(pageData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.sectionName.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
    });
    if (searchedVal.length < 1) {
      setSearch(rows);
    } else {
      setSearch(filteredRows);
    }
    setPage(0); // Reset to first page on search
  };

  const getPageNameById = (pageId) => {
    const page = pageNames.find((page) => page.pageId === pageId);
    return page ? page.pageName : 'Unknown';
  };

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCancel = () => {
    setExpanded(false);
  };

  const handleEdit = (section) => {
    setSectionName(section.sectionName);
    setSectionSequence(section.sectionSequence);
    setSelectedPageId(section.pageId);
    setIsActive(section.isActive);
    setEditSectionId(section.sectionId);
    setEditMode(true);
    setExpanded('panel1');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${base_url_section}/${deleteSectionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete section');
      }

      console.log('Section deleted successfully');
      setOpenDeleteDialog(false);
      fetchData(); // Refetch the data to update the table
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date().toISOString();

      const response = await fetch(editMode ? `${base_url_section}/${editSectionId}` : `${base_url_section}`, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionName,
          sectionSequence,
          pageId: selectedPageId,
          isActive,
          createdDate: currentDate,
          updatedDate: currentDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'edit' : 'add'} section`);
      }
      console.log(`Section ${editMode ? 'edited' : 'added'} successfully`);
      fetchData();

      // Reset fields after submission
      setSectionName('');
      setSectionSequence('');
      setSelectedPageId(0);
      setIsActive(false);
      setEditMode(false);
      setExpanded(false);
    } catch (error) {
      console.error(`Error ${editMode ? 'editing' : 'adding'} section:`, error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button variant="contained"><Typography>Add</Typography></Button>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Grid className='discount-content' style={{ width: '100%' }}>
                <Grid sx={{ pl: 2 }}>
                  <DialogTitle sx={{ mt: 1 }}>Page Name:</DialogTitle>
                  <DropdownMenu onSelectPageId={setSelectedPageId} />
                  
                  <DialogTitle sx={{ mb: 1 }}>Section Name:</DialogTitle>
                  <TextField
                    sx={{ width: '50%', marginLeft: '25px' }}
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Section"
                    type="text"
                    size="small"
                    onChange={(e) => setSectionName(e.target.value)} // Update sectionName state
                  />

                  <DialogTitle sx={{ ml: 1, mb: 1 }}>Section Sequence:</DialogTitle>
                  <TextField
                    sx={{ width: '50%', marginLeft: '25px' }}
                    variant="outlined"
                    required
                    fullWidth
                    id="sequence"
                    label="Section Sequence"
                    type="text"
                    size="small"
                    onChange={(e) => setSectionSequence(e.target.value)} // Update sectionSequence state
                  />
                </Grid>

                <FormControlLabel
                  label='IsActive'
                  control={
                    <Checkbox
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)} // Update isActive state
                      sx={{ ml: '40px' }}
                    />
                  }
                />
                <Grid item container direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>

                  <Button
                    sx={{ ml: 1 }}
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>

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
              fullWidth={false}
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
                  <StyledTableCell>Page Name</StyledTableCell>
                  <StyledTableCell>Section Name</StyledTableCell>
                  <StyledTableCell>Ordered Sequence</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {search.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <StyledTableRow key={row.sectionId}>
                    <StyledTableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{getPageNameById(row.pageId)}</StyledTableCell>
                    <StyledTableCell>{row.sectionName}</StyledTableCell>
                    <StyledTableCell>{row.sectionSequence}</StyledTableCell>
                    <StyledTableCell>
                      <Checkbox checked={row.isActive} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Grid style={{ display: 'flex' }}>
                        <EditIcon style={{ color: 'black', marginRight: '15px' }} onClick={() => handleEdit(row)} />
                        <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
                          setDeleteSectionId(row.sectionId);
                          setOpenDeleteDialog(true);
                        }}/>
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
            count={search.length} // Update to show filtered count
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Section"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this section?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Section;
