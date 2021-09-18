import { Grid, Typography, Button, Card, CardActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { useEffect, useState } from 'react';
import bannerApi from '../../../../api/bannerApi';
import image from '../../../../assets/images/backgound_login.jpg';
import AddingBanner from '../../components/AddingBanner';
import EditingBanner from '../../components/EdditingBanner';
import useStyle from './style';
const Banner = () => {
  const classes = useStyle();
  const [banners, setBanners] = useState([]);
  const [openAddBanner, setOpenAddBanner] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const [bannerInfo, setBannerInfo] = useState({
    title: '',
    detail: '',
    linkImage: null,
  });
  
  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await bannerApi.getBanner();

        console.log(response);
        setBanners(response.data);
      } catch (error) {
        console.log('failed to fetch product list: ', error);
      }
    };
    getBanner();
  }, [dataChange]);

  console.log(banners);
  const handleOpenAddBanner = (e) => {
    setOpenAddBanner(true);
  };
  const handleCloseAddBanner = (e) => {
   
    setOpenAddBanner(false);
  };
  const handleOpenEditBanner = (e) => {
    setOpenEditBanner(true);
  };
  const handleCloseEditBanner = (e) => {
    
    setOpenEditBanner(false);
  };
  const handleDeleteBanner = async (id) => {
    const res = await bannerApi.deleteBanner(id);
    setDataChange(!dataChange);
    console.log(res);
  };
  const handleEditBanner = (id) => {
    const getBannerInfo = async (id) => {
      try {
        const res = await bannerApi.getBannerById(id);
        console.log(res.data);
        setBannerInfo(res.data);
        console.log(bannerInfo);
        handleOpenEditBanner();
      } catch (error) {
        console.log(error);
      }
    };
    getBannerInfo(id);
  };
  const handleChangeBannerInfo = (e) => {
    setBannerInfo({ ...bannerInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Grid
        container
        justifyContent='space-between'
        className={classes.topGrid}
      >
        <Grid item>
          <Typography variant='h5'>Danh sách Banner</Typography>
        </Grid>
        <Grid item>
          <Button
            size='large'
            variant='contained'
            color='primary'
            onClick={handleOpenAddBanner}
            startIcon={<AddIcon />}
          >
            Thêm Banner
          </Button>
          <AddingBanner
            openAddBanner={openAddBanner}
            closeAddBanner={handleCloseAddBanner}
            setDataChange={setDataChange}
            dataChange={dataChange}
           
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {banners.map((banner) => (
          <Grid item md={6} xs={12} key={banner._id}>
            <Card>
              <Typography
                gutterBottom
                variant='h5'
                className={classes.imgTitle}
              >
                Ảnh Banner
              </Typography>
              <CardMedia
                component='img'
                alt='green iguana'
                image={banner.linkImage}
                className={classes.bannerImg}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' className={classes.title}>
                  Tiêu đề
                </Typography>
                <Typography variant='body2'>{banner.title}</Typography>
                <Typography
                  gutterBottom
                  variant='h5'
                  className={classes.detail}
                >
                  Nội dung
                </Typography>
                <Typography variant='body2'>{banner.detail}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  onClick={(e) => {
                    handleDeleteBanner(banner._id);
                  }}
                  color='secondary'
                  variant='contained'
                >
                  Xóa Banner
                </Button>
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  onClick={(e) => {
                    handleEditBanner(banner._id);
                  }}
                >
                  Chỉnh Sửa
                </Button>
                {bannerInfo && (
                  <EditingBanner
                    openEditBanner={openEditBanner}
                    closeEditBanner={handleCloseEditBanner}
                    setDataChange={setDataChange}
                    dataChange={dataChange}
                    bannerInfo={bannerInfo}
                    handleChangeBannerInfo={handleChangeBannerInfo}
                    
                  />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Banner;
