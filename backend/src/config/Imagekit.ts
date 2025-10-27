import ImageKit from "imagekit";
import "dotenv/config";
const publicKey=process.env.IMAGEKIT_PUBLIC_KEY||""
const privateKey=process.env.IMAGEKIT_PRIVATE_KEY||""
const urlEndpoint=process.env.IMAGEKIT_URL_ENDPOINT||"" 

let Imagekit: ImageKit | null = null;

// Only initialize ImageKit if all required credentials are provided
if (publicKey && privateKey && urlEndpoint) {
    Imagekit = new ImageKit({
        publicKey : publicKey,
        privateKey : privateKey,
        urlEndpoint : urlEndpoint
    });
}

export default Imagekit