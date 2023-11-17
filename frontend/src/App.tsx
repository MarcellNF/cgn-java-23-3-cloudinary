import './App.css'
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

function App() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        } else {
            setFile(event.target.files[0])
        }
    }

    function uploadFile(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file!)
        axios.post("/api/upload/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((r) => {
                setIsUploaded(true);
                setUrl(r.data);
            })
            .catch((e) => setUrl(e));
    }

    return (
        <form onSubmit={uploadFile}>
            <input type="file" onChange={handleChangeFile}/>
            <button type="submit">Upload file</button>
            {
                isUploaded && url
            }
        </form>
    )
}

export default App
