import React, { useState, ChangeEvent } from "react";
import axios from 'axios';
import { FaFileDownload, FaCloudUploadAlt } from "react-icons/fa";

const Remover: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [finalUrl, setFinalUrl] = useState<string | null>(null);
    const [isUpload, setIsUpload] = useState<boolean>(false);

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let image = e.target.files?.[0];
        setSelectedFile(image || null);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;
        setIsUpload(true);
        const formData = new FormData();
        formData.append("image_file", selectedFile);
        formData.append("size", "auto");

        const api_key = "UbFQMyA92P8sYrfMMpupw4Xc";

        try {
            const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
                headers: { "X-Api-Key": api_key },
                responseType: 'blob',
            });

            const url = URL.createObjectURL(response.data);
            setFinalUrl(url);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUpload(false);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white p-4 md:p-8">
            <div className="container flex flex-col md:flex-row w-full h-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Left Section - Controls */}
                <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-700">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">BG Remover Pro</h2>
                    <p className="text-gray-400 text-sm text-center mb-4">Easily remove image backgrounds in seconds!</p>
                    <input 
                        type="file" 
                        className="hidden" 
                        id="fileUpload" 
                        onChange={handleFileInputChange} 
                    />
                    <label 
                        htmlFor="fileUpload" 
                        className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mb-4 transition-all"
                    >
                        <FaCloudUploadAlt /> Choose File
                    </label>
                    {!isUpload ? (
                        <button
                            type="button"
                            onClick={handleFileUpload}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all"
                        >
                            Upload & Remove BG
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-blue-300 text-gray-800 px-6 py-3 rounded-lg cursor-not-allowed"
                            disabled
                        >
                            Uploading...
                        </button>
                    )}
                </div>

                {/* Right Section - Output Image */}
                <div className="w-full md:w-2/3 flex items-center justify-center p-6">
                    {finalUrl ? (
                        <div className="text-center w-full">
                            <img src={finalUrl} alt="Processed" className="max-w-full h-auto rounded-lg shadow-md mx-auto" />
                            <a href={finalUrl} download={selectedFile?.name ? `BG_Removed_${selectedFile.name}` : "BG_Removed_Image.png"}>
                                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all mx-auto">
                                    Download <FaFileDownload />
                                </button>
                            </a>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center">No image uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Remover;
