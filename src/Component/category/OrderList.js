import React, { useState, useEffect } from 'react'
import SideBar from '../SideBar'
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getmenu, getmenuitem, base_url_orders,getorders, updateorders, getorderitems} from '../../ApiServices';
import { Box, Table, TextField, TableCell, TableRow, Button, Grid, Typography, FormControl, InputLabel, Modal, Select, MenuItem } from '@mui/material';

const Content = () => {

  const [openModal, setopenModal] = React.useState(false);
  const [selectedorderrow, setSelectedorderrow] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[orderRows, setorderRows] = React.useState([]);
  const [newstatus, setStatus] = React.useState('');
  const [search, setSearch] = React.useState([]);
  const [typeOfMenus, setTypeOfMenus] = React.useState([]);
  const [menuitems, setmenuitems] = React.useState([]);
  const [orderdetailsRow, setselectedorderDetailsRow] = React.useState([]);


  function create(orderStatusKey, orderStatusValue) {
    return { orderStatusKey, orderStatusValue };
  }


  const [orderStatustypes] = useState([
    create(1, 'Pending'),
    create(2, 'InProgress'),
    create(3, 'Delivered'),
  ]);

  const ordertypes = [];
  ordertypes[1] = "TakeAway";
  ordertypes[2] = "Dine-In";

  const getorderstatusbyId = (orderstatuskey) => {
    console.log(orderStatustypes);
    const item = orderStatustypes.find((item) => item.orderStatusKey === orderstatuskey);

    return item ? item.orderStatusValue : 'Unknown';
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleDelete = async(deletedorderid)=> 
  {
    try
    {
      const response = await axios.delete(`${base_url_orders}/${deletedorderid}`);
        
       if(response.status === 204)
       {
         fetchorders();
       }
       else
       {
        throw new Error('Failed to delete order item');
       } 
      }
      catch(error)
      {
         console.error("Error deleting the order data",error);
      } 
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.orderID && row.orderID.toString().toLowerCase().includes(searchedVal.toLowerCase());
    });
    setSearch(searchedVal.length < 1 ? rows : filteredRows);
  };
  


  const fetchorder = async() => {
    try {
      const response = await axios.get(getorders);
      if(response.status === 200)
      {
        setorderRows(response.data);
      }
      else {
        throw new Error("The data is not accurate");
      }
    }
    catch(error)
    {
      console.error('Error getting order items:', error);
    }
  }


  const fetchtypeofmenuitems = async () => 
    {
      try{
        const response = await axios.get(getmenuitem);
        if(response.status === 200)
        {
          setmenuitems(response.data);
        }
        else
        {
          throw new Error("The data is not accurate");
        }
      }
      catch(error)
      {
        console.error('Error getting menu items:', error);
      }
    }
  

  const fetchtypeofmenus = async () => 
  {
    try{
      const response = await axios.get(getmenu);
      if(response.status === 200)
      {
        setTypeOfMenus(response.data);
      }
      else
      {
        throw new Error("The data is not accurate");
      }
    }
    catch(error)
    {
      console.error('Error getting menus:', error);
    }
  }


  const fetchorders = async () => {
    try {
      const response = await axios.get(getorderitems);
      if (response.status === 200) {
        setRows(response.data);
        setSearch(response.data);
      }
      else {
        throw new Error("The data is not accurate");
      }
    }
    catch (error) {
      console.error('Error getting food items:', error);
    }
  }
  useEffect(() => {
    fetchtypeofmenus();
    fetchorders();
    fetchtypeofmenuitems();
    fetchorder();
  }, []);

  const getTypeofMenuNameById = (MenuId) => {
    const menuitem = typeOfMenus.find((menuitem) => menuitem.menuId=== MenuId);
    return menuitem ? menuitem.menuName : 'Unknown';
  };

  const getMenuitemNameById = (MenuItemId) => {
    var iterator = menuitems.find(iterator => iterator.menuItemId === MenuItemId);
    return iterator ? iterator.menuItemName : 'Unknown';
  };

  const handleModalopen = (row, orderdetailsrow) => {
    setSelectedorderrow(row);
    setselectedorderDetailsRow(orderdetailsrow); // Store the order details
    setStatus(orderdetailsrow ? orderdetailsrow.orderStatus : ''); // Use order details for status
    setopenModal(true);
  };

  const handleModalClose = () => {
    setopenModal(false);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    
    // Update status in the selected order row
    setSelectedorderrow((prevRow) => ({
      ...prevRow,
    }));
  
    // Update status in the selected order details row
    setselectedorderDetailsRow((prevDetails) => ({
      ...prevDetails,
      orderStatus: newStatus,
    }));
  };
  

  const handleSubmit = async () => {
    try {
      // Prepare the payload for the API call
      const payload = {
        orderId: selectedorderrow.orderID, // Assuming this is correct for your API
        orderType: orderdetailsRow.orderType, // Use orderType from orderdetailsRow
        orderStatus: orderdetailsRow.orderStatus, // New status from the state
        totalAmount: orderdetailsRow.totalAmount, // Use totalAmount from orderdetailsRow
        orderCreateDate: selectedorderrow.orderCreateDate || new Date().toISOString(), // Add the date, default to current time if not provided
        orderItem: [
          {
            orderItemID: selectedorderrow.orderItemID || 0, // Ensure you get the correct ID
            orderID: selectedorderrow.orderID,
            menuId: selectedorderrow.menuId,
            menuItemId: selectedorderrow.menuItemId,
            quantity: selectedorderrow.quantity || 1, // Defaulting to 1 if not provided
            price: selectedorderrow.price || 0, // Ensure price is included
          }
        ]
      };
  
      const response = await axios.put(updateorders, payload);
  
      if (response.status === 200) {
        handleModalClose(); // Close the modal
        fetchorder();
        //fetchorders();
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating the status:', error.response?.data || error.message);
    }
  };
  

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
      backgroundColor: '#fffff',
      color: theme.palette.common.black,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2}}>
          <form style={{ display: "flex", alignItems: "center" }}>

            <TextField
              id="search-bar"
              className="text"
              label="Search"
              variant="outlined"
              placeholder="Search-OrderID"
              size="medium"
              color="primary" // You can change this to "secondary" or other colors
              margin="normal" // You can change this to "dense" or "none"
              fullWidth={false} // You can set this to true if you want the field to take the full width
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
                  <StyledTableCell>OrderID</StyledTableCell>
                  <StyledTableCell>Menu Type</StyledTableCell>
                  <StyledTableCell>MenuItem</StyledTableCell>
                  <StyledTableCell>Total Amount</StyledTableCell>
                  <StyledTableCell>Order Type</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {search.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => {
    // Find corresponding order detail
    const orderDetail = orderRows.find(detail => detail.orderId === row.orderID);

    return (
      <StyledTableRow key={row.orderID}>
        <StyledTableCell component="th" scope="row">
          {row.orderID}
        </StyledTableCell>
        <StyledTableCell>{getTypeofMenuNameById(row.menuId)}</StyledTableCell>
        <StyledTableCell>{getMenuitemNameById(row.menuItemId)}</StyledTableCell>
        <StyledTableCell>
          {orderDetail ? orderDetail.totalAmount : 'N/A'}
        </StyledTableCell>
        <StyledTableCell>
          {orderDetail ? ordertypes[orderDetail.orderType] : 'N/A'}
        </StyledTableCell>
        <StyledTableCell>
          {orderDetail ? getorderstatusbyId(orderDetail.orderStatus) : 'N/A'}
        </StyledTableCell>
        <StyledTableCell align="right">
          <Grid style={{ display: 'flex' }}>
            <VisibilityIcon style={{ color: 'black', marginRight: '15px' }} onClick={() => handleModalopen(row,orderDetail)} />
            <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(row.orderId)} />
          </Grid>
        </StyledTableCell>
      </StyledTableRow>
    );
  })}
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

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1200,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h5" id="modal-modal-title" gutterBottom>
            Order Details:
          </Typography>
          <Typography variant="body1" id="modal-modal-description" sx={{ fontWeight: 'bold' }} >
            {/* Add order details here */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: 'bold' }}>Order ID: </Typography> <Typography>{selectedorderrow.orderID}</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>Status: </Typography> <Typography>{getorderstatusbyId(orderdetailsRow.orderStatus)}</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>MenuType:</Typography> <Typography> {getTypeofMenuNameById(selectedorderrow.menuId)} </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>FoodItem:</Typography> <Typography> {getMenuitemNameById(selectedorderrow.menuItemId)} </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>Amount: </Typography> <Typography>{selectedorderrow.price} </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>OrderType: </Typography> <Typography>{ordertypes[orderdetailsRow.orderType]} </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="status-label">Update Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={orderdetailsRow?.orderStatus || ''}
                  label="Update status"
                  type='inherit'
                  sx={{width:'200px', height:'50px'}}
                  onChange={handleStatusChange}
                >
                  {orderStatustypes.map((item) => (
                    <MenuItem key={item.orderStatusKey} value={item.orderStatusKey}>
                      {item.orderStatusValue}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="info"
            onClick={handleSubmit} // Call handleSubmit on button click
          >
            Submit
          </Button >

        </Box>
      </Modal>
    </Box>
  )
};

export default Content