import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Select,
  FormControl,
  MenuItem,
  Grid,
  Table,
  TableCell,
  TableRow,
  Button,
  TextField,
  DialogTitle,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  base_url_submenuprice,
  getmenu,
  getmenuitem,
  getsubmenuprice,
  createsubmenuprice,
  updatesubmenuprice,
} from "../../ApiServices";

const SubMenuList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedvalue, setSelectedvalue] = useState(null);
  const [search, setSearch] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedprice, setselectedprice] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [subMenuoptions, setsubMenuoptions] = useState([]);
  const [selectedMenuType, setSelectedMenuType] = useState("");
  const [filteredSubMenuOptions, setFilteredSubMenuOptions] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [selectedSubMenuPriceid, setSelectedSubMenuPriceid] = useState(null);

  function createData(orderquantity, orderId) {
    return { orderquantity, orderId };
  }

  const [quantity] = useState([
    createData("Full", 1),
    createData("Half", 2),
    createData("Quarter", 3),
  ]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(220, 220, 220)",
      color: theme.palette.common.black,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
      color: theme.palette.common.black,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDropdownchange = (event) => {
    setSelectedvalue(event.target.value);
  };

  const handleEdit = (pagerow) => {
    if (!pagerow) return;
    setExpanded("panel1");
    console.log(pagerow);

    setEditMode(true);
    setSelectedSubMenuPriceid(pagerow.subMenuPriceId || "");
    setSelectedMenuType(pagerow.menuId || "");
    setSelectedSubMenu(pagerow.menuItemId || "");
    setselectedprice(pagerow.price || "");
    setSelectedvalue(pagerow.quantity || "");
    handleMenutypeChange({ target: { value: pagerow.menuId } });
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
    setEditMode(false);
    setSelectedMenuType("");
    setselectedprice("");
    setSelectedvalue("");
    setSelectedSubMenu("");
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.price
        .toString()
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setSearch(searchedVal.length < 1 ? rows : filteredRows);
  };

  const fetchmenu = async () => {
    const response = await axios.get(getmenu);
    if (response.status === 200) {
      setMenuOptions(response.data);
    } else {
      throw new Error("The data is not accurate");
    }
  };

  useEffect(() => {
    fetchmenu();
  }, []);

  const fetchsubmenu = async () => {
    const response = await axios.get(getmenuitem);
    if (response.status === 200) {
      setsubMenuoptions(response.data);
    } else {
      throw new Error("The data is not accurate");
    }
  };

  useEffect(() => {
    fetchsubmenu();
  }, []);

  const fetchsubmenulist = async () => {
    try {
      const response = await axios.get(getsubmenuprice);
      if (response.status === 200) {
        setRows(response.data);
        setSearch(response.data);
      } else {
        console.error("The data is inaccurate");
      }
    } catch (error) {
      console.error("Error getting data");
    }
  };

  useEffect(() => {
    fetchsubmenulist();
  }, []);

  const getTypeofMenuNameById = (menuId) => {
    const menu = menuOptions.find((menu) => menu.menuId === menuId);
    return menu ? menu.menuName : "Unknown";
  };

  const getTypeofSubMenuNameById = (menuItemId) => {
    const submenu = subMenuoptions.find(
      (submenu) => submenu.menuItemId === menuItemId
    );
    return submenu ? submenu.menuItemName : "Unknown";
  };

  const getorderquantitybyId = (orderId) => {
    const item = quantity.find((q) => q.orderId === orderId);
    return item ? item.orderquantity : "Unknown";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      subMenuPriceId: editMode ? selectedSubMenuPriceid : 0,
      menuId: selectedMenuType,
      menuItemId: selectedSubMenu,
      quantity: selectedvalue,
      price: selectedprice,
    };

    try {
      let response;
      if (editMode) {
        response = await axios.put(updatesubmenuprice, payload);
      } else {
        response = await axios.post(createsubmenuprice, payload);
      }

      // Check for successful response (status 200 or 201)
      if (response.status === 200 || response.status === 201) {
        fetchsubmenulist();
        handleCancel();
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${base_url_submenuprice}/${id}`);
      if (response.status === 204) {
        fetchsubmenulist();
      } else {
        throw new Error("Failed to delete menu item");
      }
    } catch (error) {
      console.error("Error deleting the data", error);
    }
  };

  const handleMenutypeChange = (event) => {
    const new_menuId = event.target.value;
    setSelectedMenuType(new_menuId);
    const filteredSubMenus = subMenuoptions.filter(
      (item) => item.menuId === new_menuId
    );
    setFilteredSubMenuOptions(filteredSubMenus);
  };

  // Calculate the paginated rows
  const paginatedRows = search.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button variant="contained">
                <Typography>Add</Typography>
              </Button>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Grid className="discount-content" style={{ width: "100%" }}>
              <Grid sx={{ pl: 2 }}>
                <DialogTitle sx={{ mb: 1 }}>Menu:</DialogTitle>
                <Box sx={{ width: "70%", height: "40px" }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedMenuType}
                      onChange={handleMenutypeChange}
                      displayEmpty
                      required
                      sx={{ height: "40px", width: "72%", ml: "20px" }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select an option</em>
                      </MenuItem>
                      {menuOptions.map((item) => (
                        <MenuItem key={item.menuId} value={item.menuId}>
                          {item.menuName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <DialogTitle sx={{ mb: 1 }}>Sub Menu:</DialogTitle>
                <Box sx={{ width: "70%", height: "40px" }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedSubMenu}
                      onChange={(e) => setSelectedSubMenu(e.target.value)}
                      displayEmpty
                      disabled={!filteredSubMenuOptions.length}
                      required
                      sx={{ height: "40px", width: "72%", ml: "20px" }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select an option</em>
                      </MenuItem>
                      {filteredSubMenuOptions.map((item) => (
                        <MenuItem key={item.menuItemId} value={item.menuItemId}>
                          {item.menuItemName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <DialogTitle sx={{ mb: 1 }}>Quantity:</DialogTitle>
                <Box sx={{ width: "70%", height: "40px" }}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedvalue}
                      onChange={handleDropdownchange}
                      displayEmpty
                      required
                      sx={{ height: "40px", width: "72%", ml: "20px" }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select an option</em>
                      </MenuItem>
                      {quantity.map((item) => (
                        <MenuItem key={item.orderId} value={item.orderId}>
                          {item.orderquantity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <DialogTitle sx={{ mb: 1 }}>Price:</DialogTitle>
                <Box sx={{ width: "70%", height: "40px" }}>
                  <TextField
                    sx={{ width: "72%", ml: 3 }}
                    variant="outlined"
                    required
                    value={selectedprice}
                    id="name"
                    name="discount"
                    type="text"
                    placeholder="Price*"
                    autoComplete="discount"
                    size="small"
                    onChange={(e) => setselectedprice(e.target.value)}
                  />
                </Box>
              </Grid>

              <Grid
                item
                container
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: 3 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  onClick={handleSubmit}
                >
                  {editMode ? "Update" : "Add"}
                </Button>

                <Button
                  sx={{ ml: 1 }}
                  type="button"
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
              fullWidth={false}
              sx={{
                width: 350,
                margin: "10px",
                color: "blue",
                border: "Highlight",
              }}
              onChange={(e) => requestSearch(e.target.value)}
            />
          </form>
        </Box>

        <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S No</StyledTableCell>
                  <StyledTableCell>Menu</StyledTableCell>
                  <StyledTableCell>SubMenu</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, index) => (
                  <StyledTableRow key={row.SubMenuPriceId}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getTypeofMenuNameById(row.menuId)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getTypeofSubMenuNameById(row.menuItemId)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getorderquantitybyId(row.quantity)}
                    </StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>

                    <StyledTableCell align="right">
                      <Grid
                        style={{ display: "flex", justifyContent: "right" }}
                      >
                        <EditIcon
                          style={{ color: " black", marginRight: "15px" }}
                          onClick={() => handleEdit(row)}
                        />
                        <DeleteIcon
                          style={{ color: "red" }}
                          onClick={() => handleDelete(row.subMenuPriceId)}
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
            count={search.length}
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

export default SubMenuList;
