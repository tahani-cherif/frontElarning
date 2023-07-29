import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Link } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import "./sidebar.css"

export  const Menu = ({ isMenuOpen ,handleMenu}) => {
    const user=JSON.parse(localStorage.getItem('user'));
  const menu=()=>{
    if(user.role==="user")
    {
    return (<div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`}>
        <Paper sx={{ width: 320, maxWidth: '100%',backgroundColor:"#144272",color: "white" }}>
        <Link to="/user" onClick={handleMenu}> <Typography variant="h5" gutterBottom style={{color: "white",padding: "23px",marginTop: "11px"}}>
        RAPYD LEARN</Typography></Link>
      <Typography variant="subtitle1" gutterBottom  style={{color: "white",padding: "10px",marginTop: "-34px",    paddingLeft: "26px"}}>
       {user?.fullName}
      </Typography>
        <Divider />
     <MenuList>
      <Link to="/user" onClick={handleMenu}> 
       <MenuItem>
          <ListItemIcon>
            <HomeIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Page d'accueil</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/user/listecour" onClick={handleMenu}>  
        <MenuItem>
          <ListItemIcon>
            <FormatListBulletedIcon fontSize="small" sx={{ color: "white"}} />
          </ListItemIcon>
          <ListItemText>Consulter la liste des cours</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/editprofile" onClick={handleMenu}>
           <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Consulter votre profil</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/user/cart" onClick={handleMenu}>
          <MenuItem>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Accéder au panier</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/chatroom" onClick={handleMenu}>
           <MenuItem>
          <ListItemIcon>
            <MarkUnreadChatAltIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Chatroom</ListItemText>
        </MenuItem>
        </Link>
      </MenuList>
    </Paper>
      </div>) }
       else if(user?.role==="formateur"){ 
       return (<div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`}>
        <Paper sx={{ width: 320, maxWidth: '100%',backgroundColor:"#144272",color: "white"  }}>
        <Link to="/formateur" onClick={handleMenu}> <Typography variant="h5" gutterBottom style={{color: "white",padding: "23px",marginTop: "11px"}}>
        RAPYD LEARN</Typography></Link>
      <Typography variant="subtitle1" gutterBottom  style={{color: "white",padding: "10px",marginTop: "-34px",    paddingLeft: "26px"}}>
       {user?.fullName} {' '}
      </Typography>
        <Divider />
     <MenuList>
      <Link to="/formateur" onClick={handleMenu}> 
       <MenuItem>
          <ListItemIcon>
            <HomeIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Page d'accueil</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/formateur/listecourformateur" onClick={handleMenu}>  
        <MenuItem>
          <ListItemIcon>
            <FormatListBulletedIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>liste des cours</ListItemText>
        </MenuItem>
        </Link>
        <Link to='/formateur/listecour' onClick={handleMenu}>
        <MenuItem>
          <ListItemIcon>
            <FormatListBulletedIcon fontSize="small" sx={{ color: "white"}} />
          </ListItemIcon>
          <ListItemText>liste des cours Achete</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/editprofile" onClick={handleMenu}>
           <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Consulter votre profil</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/formateur/cart" onClick={handleMenu}>
          <MenuItem>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Accéder au panier</ListItemText>
        </MenuItem>
        </Link>
        <Link to="/chatroom" onClick={handleMenu}>
           <MenuItem>
          <ListItemIcon>
            <MarkUnreadChatAltIcon fontSize="small" sx={{ color: "white"}}/>
          </ListItemIcon>
          <ListItemText>Chatroom</ListItemText>
        </MenuItem>
        </Link>
      </MenuList>
    </Paper>
      </div>)}
         else { 
          return (<div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`}>
           <Paper sx={{ width: 320, maxWidth: '100%' ,backgroundColor:"#144272",color: "white" }}>
           <Link to="/admin" onClick={handleMenu}> <Typography variant="h5" gutterBottom style={{color: "white",padding: "23px",marginTop: "11px"}}>
           RAPYD LEARN</Typography></Link>
         <Typography variant="subtitle1" gutterBottom  style={{color: "white",padding: "10px",marginTop: "-34px",    paddingLeft: "26px"}}>
         {user?.fullName} {' '}
         </Typography>
           <Divider />
        <MenuList>
         <Link to="/admin" onClick={handleMenu}> 
          <MenuItem>
             <ListItemIcon>
               <HomeIcon fontSize="small" sx={{ color: "white"}}/>
             </ListItemIcon>
             <ListItemText>dashboard </ListItemText>
           </MenuItem>
           </Link>
           <Link to="/admin/listecouradmin" onClick={handleMenu}>  
           <MenuItem>
             <ListItemIcon>
               <FormatListBulletedIcon fontSize="small"  sx={{ color: "white"}}/>
             </ListItemIcon>
             <ListItemText>Liste des cours</ListItemText>
           </MenuItem>
           </Link>
           <Link to="/admin/listeuser" onClick={handleMenu}>
              <MenuItem>
             <ListItemIcon>
               <AccountBoxIcon fontSize="small" sx={{ color: "white"}} />
             </ListItemIcon>
             <ListItemText>Liste des utilisateurs</ListItemText>
           </MenuItem>
           </Link>
           <Link to="/admin/listecommande" onClick={handleMenu}>
             <MenuItem>
             <ListItemIcon>
               <ShoppingCartIcon fontSize="small" sx={{ color: "white"}}/>
             </ListItemIcon>
             <ListItemText>Liste des commandes</ListItemText>
           </MenuItem>
           </Link>
           <Link to="/admin/listecategory" onClick={handleMenu}>
             <MenuItem>
             <ListItemIcon>
               <ControlPointDuplicateIcon fontSize="small" sx={{ color: "white"}}/>
             </ListItemIcon>
             <ListItemText>Liste des Categorie</ListItemText>
           </MenuItem>
           </Link>
         </MenuList>
       </Paper>
         </div>)}
  }
    return menu()

  };

