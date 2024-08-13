import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Table, TableCell, TableRow, Button, TextField, InputLabel, Select,
  MenuItem, OutlinedInput, ListItemText, Checkbox, Paper, TableContainer,
  TableHead, TableBody, TablePagination
} from '@mui/material';

import { getcontent,createcontent,updatecontent,getsection,getpagenames,getcontrol, base_url_content } from '../../ApiServices';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from '../SideBar';
import { toast, ToastContainer } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(220, 220, 220)', // Change this to the desired shade of grey
    color: theme.palette.common.black,
    fontWeight: 'bold', // Make the text bold
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#ffffff',
    color: theme.palette.common.black,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Helper function to create data rows
const createData = (pagename, sectionname, controlname, contentdata, status) => {
  return { pagename, sectionname, controlname, contentdata, status };
};

const Content = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(false);
  const [originalRows, setOriginalRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [sectionNames, setSectionNames] = useState([]);
  const [pageNames, setPageNames] = useState([]);
  const [controlNames, setControlNames] = useState([]);
  const [errors, setErrors] = useState({});
  
  const [contentData, setContentData] = useState({
    pageName: "",
    sectionName: "",
    controlName: [],
    content: {},
    isActive: false
  });

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCancel = () => {
    setExpanded(false);
    setIsEdit(false);
    setContentData({
      pageName: "",
      sectionName: "",
      controlName: [],
      content: {},
      isActive: false
    });
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    if (searchValue === '') {
      setRows(originalRows);
      setPage(0); // Reset to first page when clearing the search
    } else {
      const filteredRows = originalRows.filter((row) => {
        const pageName = pageNames.find((x) => x.pageId === row.pageId)?.pageName || '';
        const sectionName = sectionNames.find((x) => x.sectionId === row.sectionId)?.sectionName || '';
        const controlName = controlNames.find((x) => x.controlID === row.controlId)?.controlName || '';
        const contentData = row.contentData;
        return (
          pageName.toLowerCase().includes(searchValue.toLowerCase()) ||
          sectionName.toLowerCase().includes(searchValue.toLowerCase()) ||
          controlName.toLowerCase().includes(searchValue.toLowerCase()) ||
          contentData.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setRows(filteredRows);
      setPage(0); // Reset to first page after searching
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "Image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setContentData(prevData => ({
          ...prevData,
          content: {
            ...prevData.content,
            [name]: base64String,
          },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setContentData(prevData => ({
        ...prevData,
        content: {
          ...prevData.content,
          [name]: value,
        },
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    // Assuming the controlName is a multi-select input
    setContentData(prevData => ({
      ...prevData,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleAddControl = () => {
    const newControl = createData(
      contentData.pageName,
      contentData.sectionName,
      contentData.controlName.join(', '),
      JSON.stringify(contentData.content),
      contentData.isActive
    );
    setContentData({
      pageName: "",
      sectionName: "",
      controlName: [],
      content: {},
      isActive: false,
      contentId: 0
    });
    setRows(prevRows => [...prevRows, newControl]);
  };

  const contentDataGet = async () => {
    try {
      const res = await axios.get(getcontent);
      setOriginalRows(res.data);
      setRows(res.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    contentDataGet();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!contentData.pageName) {
      errors.pageName = 'Page Name is required';
    }
    if (!contentData.sectionName) {
      errors.sectionName = 'Section Name is required';
    }
    if (!Array.isArray(contentData.controlName) || contentData.controlName.length === 0) {
      errors.controlName = 'At least one Control is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleAddControl();
      setExpanded(false);

      const contents = contentData.controlName.map(controlName => {
        const control = controlNames.find(c => c.controlName === controlName);

        const isUpdating = expanded;
        const contentId = isUpdating ? contentData.contentId : 0;

        return {
          contentId: contentId,
          pageId: contentData.pageName,
          sectionId: contentData.sectionName,
          controlId: control ? control.controlID : null,
          createdDate: new Date(),
          updatedDate: new Date(),
          contentData: contentData.content[controlName],
          isActive: contentData.isActive
        };
      });

      const payload = { contents };

      try {
        let res;
        if (isEdit) {
          res = await axios.put(updatecontent, payload);
        } else {
          res = await axios.post(createcontent, payload);
        }
        if (res.status === 200) {
          toast(`Successfully ${isEdit ? "Updated.." : "Added...."}`);
        }
        setContentData({
          pageName: "",
          sectionName: "",
          controlName: [],
          content: {},
          isActive: false,
          contentId: 0
        });
        contentDataGet();
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  const renderConditionalInputs = (controlNames) => {
    return controlNames.map(controlName => {
      switch (controlName) {
        case "Image":
          return (
            <Grid item xs={12} key={controlName}>
              <InputLabel>Image:</InputLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="file"
                name="Image"
                size="small"
                onChange={handleInputChange}
              />
            </Grid>
          );
        case "Heading":
        case "Link":
        case "Button":
        case "Map":
        case "Text":
          return (
            <Grid item xs={12} key={controlName}>
              <InputLabel>{controlName}:</InputLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="text"
                name={controlName}
                size="small"
                value={contentData.content[controlName] || ''}
                onChange={handleInputChange}
              />
            </Grid>
          );
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    const fetchSectionNames = async () => {
      try {
        const response = await axios.get(getsection);
        setSectionNames(response.data);
      } catch (error) {
        console.error('Error fetching section names:', error);
      }
    };

    const fetchPageNames = async () => {
      try {
        const response = await axios.get(getpagenames);
        setPageNames(response.data);
      } catch (error) {
        console.error('Error fetching page names:', error);
      }
    };

    const fetchControlNames = async () => {
      try {
        const response = await axios.get(getcontrol);
        setControlNames(response.data);
      } catch (error) {
        console.error('Error fetching control names:', error);
      }
    };

    fetchSectionNames();
    fetchPageNames();
    fetchControlNames();
  }, []);

  const handleUpdate = (data) => {
    setExpanded(true);
    setIsEdit(true);
    const controlName = controlNames.find((x) => x.controlID === data.controlId).controlName;
    setContentData({
      contentId: data.contentId,
      pageName: data.pageId,
      sectionName: data.sectionId,
      controlName: [controlName],
      content: { [controlName]: data.contentData },
      isActive: data.isActive,
    });
  };

  const handletogal = () => {
    setExpanded(true);
    setIsEdit(false);
  };

  const handleDelete = async (data) => {
    try {
      const res = await axios.delete(`${base_url_content}/${data}`);
      if (res.status === 204) {
        toast("Successfully Deleted....!");
      }
      setRows(prevRows => prevRows.filter(row => row.contentId !== data));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Grid style={{ background: "#fff" }}>
          {
            expanded ?
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} style={{ marginLeft: '20px', width: "60%", padding: "10px", marginTop: "10px" }}>
                  <Grid item xs={12}>
                    <InputLabel sx={{ color: 'black', mb: 1, fontSize: '20px' }} >Page Name:</InputLabel>
                    <Select
                      name="pageName"
                      onChange={handleSelectChange}
                      value={contentData.pageName}
                      fullWidth
                      size='small'
                    >
                      <MenuItem value="">
                        <em>Select an option</em>
                      </MenuItem>
                      {pageNames.map(item => (
                        <MenuItem key={item.pageId} value={item.pageId}>
                          {item.pageName}
                        </MenuItem>
                      ))}
                    </Select>
                    <span className='err_msg'>{errors.pageName}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel sx={{ color: 'black', mb: 1, fontSize: '20px' }} >Section Name:</InputLabel>
                    <Select
                      name="sectionName"
                      onChange={handleSelectChange}
                      value={contentData.sectionName}
                      fullWidth
                      size='small'
                    >
                      <MenuItem value="">
                        <em>Select an option</em>
                      </MenuItem>
                      {sectionNames.map(item => (
                        <MenuItem key={item.sectionId} value={item.sectionId}>
                          {item.sectionName}
                        </MenuItem>
                      ))}
                    </Select>
                    <span className='err_msg'>{errors.sectionName}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel sx={{ color: 'black', mb: 1, fontSize: '20px' }} >Control Name:</InputLabel>
                    <Select
                      multiple
                      name="controlName"
                      value={contentData.controlName}
                      onChange={handleSelectChange}
                      input={<OutlinedInput label="Control Name" />}
                      renderValue={selected => selected.join(', ')}
                      MenuProps={MenuProps}
                      fullWidth
                      size='small'
                    >
                      {controlNames.map(name => (
                        <MenuItem key={name.controlID} value={name.controlName}>
                          <Checkbox checked={contentData.controlName.indexOf(name.controlName) > -1} />
                          <ListItemText primary={name.controlName} />
                        </MenuItem>
                      ))}
                    </Select>
                    <span className='err_msg'>{errors.controlName}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <span>IsActive:</span>
                    <Checkbox
                      checked={contentData.isActive}
                      onChange={(e) => setContentData(prev => ({ ...prev, isActive: e.target.checked }))}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  </Grid>
                  {renderConditionalInputs(contentData.controlName)}
                </Grid>
                <Grid item container direction="row" justifyContent="flex-end" sx={{ mt: 1, marginBottom: '40px' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="info">
                    {!isEdit ? "Submit" : "Update"}
                  </Button>
                  <Button
                    type="button"
                    sx={{ ml: 1, marginRight: '10px' }}
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </form>
              : null
          }
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: 2 }} >
            <Button variant="contained" onClick={handletogal} sx={{ height: " fit-content", p: 1, mt: 2, mr: 2 }} >
              Add
            </Button>
            <TextField label="Search" variant="outlined" type='search' name='search' value={search} sx={{ marginRight: '10px', marginBottom: '8px', marginTop: '8px' }} onChange={handleSearchChange} />
          </Grid>
        </Grid>
        <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>PageName</StyledTableCell>
                  <StyledTableCell>SectionName</StyledTableCell>
                  <StyledTableCell>ControlName</StyledTableCell>
                  <StyledTableCell>Content Data</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index+1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {pageNames.find(x => x.pageId === row.pageId)?.pageName || '-'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {sectionNames.find(x => x.sectionId === row.sectionId)?.sectionName || '-'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {controlNames.find(x => x.controlID === row.controlId)?.controlName || '-'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {
                        controlNames.find(x => x.controlID === row.controlId)?.controlName === "Image"
                          ? <img src={`data:image/jpeg;base64,${row.contentData}`} width='50px' alt='image' />
                          : row.contentData
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      <input type='checkbox' className='checkBox_style' checked={row.isActive} readOnly />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Grid style={{ display: 'flex' }}>
                        <EditIcon style={{ color: 'Black' }} onClick={() => handleUpdate(row)} />
                        <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(row.contentId)} />
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Content;
