import React, {  useState,useEffect } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import  {getALLcategory} from '../redux/category'
import { useDispatch,useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    const {data} = useSelector(state=>state.category)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getALLcategory())
      },[])
      let i=0
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted bg-[#144272] mt-10 mb-0 bottom-0'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      <div className='flex flex-row gap-3'>
        <div className=''>
          <span>Connectez-vous avec nous sur les réseaux sociaux :</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <FacebookIcon style={{color:"white"}} />
          </a>
          <a href='' className='me-4 text-reset'>
            <TwitterIcon style={{color:"white"}} />
          </a>
          <a href='' className='me-4 text-reset'>
            <InstagramIcon  style={{color:"white"}} />
          </a>
          <a href='' className='me-4 text-reset'>
            <LinkedInIcon  style={{color:"white"}} />
          </a>
        </div>
        </div>
      </section>
<hr/>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                RAPYD LEARN 
              </h6>
              <p>
              Bienvenue sur notre plateforme.<br/>
              L'objectif est d'apprendre sans aucune contrainte.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Catégories de cours</h6>
            
            {
                data?.map(item=>{
                if(i<5)
               { i++ 
                return <p>
                    <a href='#!' className='text-reset'>
                     { item?.category}
                    </a>
                  </p>}})
            }
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Mode de paiement</h6>
              <p>
                <a href='#!' className='text-reset'>
                carte bancaire
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                portefeuille électronique
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                les monnaies virtuelles
                </a>
              </p>

            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p className='flex flex-row justify-center items-center gap-2'>
                <HomeIcon style={{color:"white"}} />
                38 Rue Dunois 75647 Paris Cedex 13
              </p>
              <p className='flex flex-row justify-center items-center gap-2'>
                <AlternateEmailIcon style={{color:"white"}}/>
                info@example.com
              </p>
              <p className='flex flex-row justify-center items-center gap-2'>
                <LocalPhoneIcon style={{color:"white"}} /> 03.74.73.80.80
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: 
        <a className='text-reset fw-bold' href=''>
        RAPYD LEARN 
        </a>
      </div>
    </MDBFooter>
  );
}