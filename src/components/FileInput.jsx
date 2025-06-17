import { useRef } from "react"
import { Button } from "@mui/material"

function FileInput({ handleFileChanged }) {
    const fileRef = useRef()

    const onFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileChanged(file)
        }
    }
    return (
        <div>
            <Button
                variant="contained"
                sx={{ backgroundColor: "#673ab7" }}
                component="label"
                onClick={() => {
                    fileRef.current.click()
                }}
            >
                Seleccionar archivo
            </Button>
            <input max={1} ref={fileRef} type="file" style={{ display: "none" }} onChange={onFileInputChange} required />
        </div>
    )
}

export default FileInput