import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import PieChart from '../../Page/Charts/PieChart';
import './CardTop.css'
function CardTop() {
  return (
    <Grid container spacing={3}>
    <Grid item xs={3}>
    <Card className='card-css l-bg-green-dark'>
      <CardHeader className='card-title'
        title="Total Orders"
      />
      <CardContent>
        <Typography className='card-content-title' variant="h5" component="div">
        1500
        </Typography>
      </CardContent>
      {<AddShoppingCartOutlinedIcon sx={{ fontSize: 48 }} className='icon-bg' />}
    </Card>
    </Grid>
    <Grid item xs={3}>
    <Card className='card-css l-bg-cyan-dark'>
      <CardHeader className='card-title'
        title="Orders Pending"
      />
      <CardContent>
        <Typography className='card-content-title' variant="h5" component="div">
        100
        </Typography>
      </CardContent>
      {<ShoppingCartCheckoutOutlinedIcon sx={{ fontSize: 48 }} className='icon-bg' />}
    </Card>
    </Grid>
    <Grid item xs={3}>
    <Card className='card-css l-bg-purple-dark'>
      <CardHeader className='card-title'
        title="Out For Delivery"
      />
      <CardContent>
        <Typography className='card-content-title' variant="h5" component="div">
         80
        </Typography>
      </CardContent>
      {<LocalShippingOutlinedIcon sx={{ fontSize: 48 }} className='icon-bg' />}
    </Card>
    </Grid>
    <Grid item xs={3}>
    <Card className='card-css l-bg-orange-dark'>
      <CardHeader className='card-title'
        title="Delivered"
      />
      <CardContent>
        <Typography className='card-content-title' variant="h5" component="div">
         120
        </Typography>
      </CardContent>
      {<HandshakeOutlinedIcon sx={{ fontSize: 48 }} className='icon-bg' />}
    </Card>
  
    

    </Grid>
    <div className='dashboard'>
    <Card className='barChart' style={{ width: '525px', height: '400px',margin: '0px 23px 0px' }}>
      <CardContent>
     <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      // viewBox="0 0 1200 350"
      width = {500}
      height={400}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
    </CardContent>
    
    </Card>
    <Card className='pie-chart'>
            
           <CardContent className="text-center" sx={{textAlign:'center'}}>
             <Typography sx={{marginBottom:'20px',fontWeight:'700'}}>Total Selling</Typography>
              <PieChart />
            </CardContent>
          </Card>
          </div>
  </Grid>
  
  
  )
}

export default CardTop
