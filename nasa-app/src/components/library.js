import Gallery from 'react-grid-gallery';
import { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({

    button: {
        minWidth: 100,
        background: 'white',
        color: deepPurple[500],
        fontWeight: 300,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 14,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus": {
            borderRadius: 12,
            background: 'white',
            borderColor: deepPurple[500]
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));
export default function UserLibrary() {


    const [imagesList, setImageList] = useState([])
    const email = "rong.ni110828@gmail.com"
    const classes = useStyles();



    function setData(data) {
        var tempList = [];
        data.forEach(function (entry) {
            var singObj = {}
            singObj['src'] = entry.img_src
            singObj['thumbnail'] = entry.img_src
            singObj['thumbnailWidth'] = 320
            singObj['thumbnailHeight'] = 320
            singObj['id'] = entry.id
            tempList.push(singObj)
        });

        setImageList(tempList)
    }
    function openDetails(id) {
        var image = imagesList[id]
        console.log(image)
    }
    function onSelectImage(index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });
    }
    const handleDeleteImage = (event) => {
        event.preventDefault();
        let seletimageList = []
        imagesList.forEach(function (entry) {
            if (entry.hasOwnProperty("isSelected")) {
                var singObj = {}
                singObj['image_id'] = entry.id
                seletimageList.push(singObj)
            }
        });
        const imageDeleteList =
        {
            'image': seletimageList
        }
        console.log(imageDeleteList)
        fetchPhoto();


        async function fetchPhoto() {
            const res = await fetch(

                '/api/library/rong.ni110828@gmail.com/images', {
                method: 'Delete',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(imageDeleteList),
            }

            );
            const data = await res.json();
            console.log(data)
        }
        window.location.reload();


    };

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(

                `/api/library/${email} `
            );
            const data = await res.json();
            setData(data[['image']])
        }

    }, []);
    return (
        <div>
            <div style={{
                paddingTop: 50,
                paddingLeft: 200,
                paddingRight: 200,
                display: "block",
                overflow: "auto",
                minHeight: "1px",
                width: "100%",
            }}>
                <Gallery images={imagesList} showLightboxThumbnails onSelectImage={onSelectImage} />
            </div>
            <div style={{ paddingTop: 20 }}>
                <button className={classes.button} onClick={handleDeleteImage}> Delete </button>
            </div>
        </div>
    )

}