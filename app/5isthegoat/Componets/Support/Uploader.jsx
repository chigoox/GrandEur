import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


export const Uploader = ({ setFiles, defualt }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setFileList(defualt.map((item, index) => {
            return {


                name: index,
                url: item,


            }
        }))
    }, [])

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ file, fileList: newFileList }) => {
        const files = newFileList.map(item => {
            return item.originFileObj
        })
        setFiles(o => ({ ...o, images: [...files] }))
        setFileList(newFileList)
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    console.log(defualt)
    return (
        <div className='rounded border-dotted p-2 border-2'>
            <h1 className='text-center font- text-xs'>Accepts images, videos, or 3D models</h1>
            <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                defaultFileList={defualt}
                multiple
                beforeUpload={() => { return false }}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
}
