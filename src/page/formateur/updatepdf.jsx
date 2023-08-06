import React,{useEffect} from "react"
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getpdf,updatepdf } from '../../redux/pdf'
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { TextField } from "@mui/material";
import './uploadpdf.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      // input label when focused
      "& label.Mui-focused": {
        color: "white"
      },
      // focused color for input with variant='standard'
      "& .MuiInput-underline:after": {
        borderBottomColor: "white"
      },
      // focused color for input with variant='filled'
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: "white"
      },
      // focused color for input with variant='outlined'
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "white"
        }
      },
    
    }
  }));

const Updatepdf = () => {
    const classes = useStyles();
    const user=JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [pdfFiles, setPdfFiles] = React.useState(null);
    const inputRef = React.useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} =useSelector(x=>x.pdf)
    useEffect(()=>{
        dispatch(getpdf(id))
        // setPdfFiles(data?.file)
      },[])
    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values)
        const formData = new FormData();
        formData.append('file', values.file)
        formData.append('titre', values.titre)
        formData.append('description', values.description)
        formData.append('createur',user?._id)
        dispatch(updatepdf({id:id,data:formData})).then(secc => {
            if (secc?.type === "pdf/updatepdf/fulfilled") {
                navigate("/formateur/listevideobycour/"+data?.course)
            }
        }).catch(err => {
            console.log('test2', err)
        })

    };

    const getFileType = (fileName) => {
        if (!fileName) {
            return '';
        }
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
    };
    const initialValues = {
        file: data?.file,
        description: data?.description,
        titre: data?.titre,
    };

    const checkoutSchema = yup.object().shape({
        description: yup.string().required("Required"),
        titre: yup.string().required("Required"),
        file:yup.mixed().required("Required"),
    })
    return (
        <div className="wrapper">
            <div className="box">
                <div className="input-bx"> 
                    <h2 className="upload-area-title"> Mise à jour  votre exercice</h2>
                    <Formik  enableReinitialize={true}  onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
                        {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit, }) => (
                            <form onSubmit={handleSubmit}>
                                  <div  className="uploaded">
                                    <label>Titre PDF</label>
                                        <TextField
                                         className={classes.root}
                                            sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                color: "white"
                                            },shrink:{color: "white"}}}  
                                             style={{ width: '100%', marginTop: '3px' }}
                                             inputProps={{ style: { color: 'white'} }}          
                                            name="titre"
                                            placeholder="Entrez votre titre"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.titre}
                                            error={!!touched.titre && !!errors.titre}
                                            helperText={touched.titre && errors.titre} 
                                        >
                                        </TextField>
                                </div>
                                <div className="uploaded">
                                    <label >Description PDF</label>
                                        <TextField
                                         className={classes.root}
                                            sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                color: "white"
                                            },shrink:{color: "white"}}}  
                                             style={{ width: '100%', marginTop: '3px' }}
                                             inputProps={{ style: { color: 'white'} }}
                                            multiline  
                                            rows={5}
                                            name="description"
                                            placeholder="Entrez votre description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.description}
                                            error={!!touched.description && !!errors.description}
                                            helperText={touched.description && errors.description} 
                                        >
                                        </TextField>
                                </div>
                                <div className="uploadlabel">
                                    <input
                                        type="file"
                                        id="contained-button-file"
                                        accept="application/pdf"
                                        style={{ display: "none" }}
                                        onBlur={handleBlur}
                                        onChange={e => {
                                            setFieldValue("file", e.target.files[0])
                                            const newFile = {
                                                id: uuidv4(),
                                                name: e.target.files[0].name,
                                                type: e.target.files[0].type,
                                            };
                                            setPdfFiles(newFile);
                                        }}
                                        name="file"
                                         ref={inputRef}
                                    />
                                     <span>
                                        <FontAwesomeIcon icon={faCloudUpload} className="" />
                                    </span>
                                    <button onClick={() => inputRef.current.click()}   >Cliquez pour télécharger</button>
                                </div>
                                <Button style={{ marginTop: "20px", width: "100%" }} variant="contained" type="submit">Terminer</Button>
                            </form >
                        )}
                    </Formik >
                </div>
                {pdfFiles != null ? <div className="filewrapper">
                    <h3 className="uploaded"> Documents Téléchargés</h3>
                    <div className="showfilebox" key={pdfFiles.id}>
                        <div className="left">
                            <span className={`filetype ${getFileType(pdfFiles.name)}`}>{getFileType(pdfFiles.name)}</span>
                            <h3>{pdfFiles.name}</h3>
                        </div>
                    </div>
                </div> : null}
            </div>
        </div>

    );
};

export default Updatepdf;