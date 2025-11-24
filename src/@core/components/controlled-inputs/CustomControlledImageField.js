import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import { Controller } from "react-hook-form";

const backend = import.meta.env.VITE_BACKEND_BASE_URL;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#7367f0'
};

const acceptStyle = {
  borderColor: '#7367f0'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};
  
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};
  
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
  
const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


const DropzoneField = ({
    name,
    control,
    InputChange,
    hidden = false,
    thumbActions = true,
    maxSize = 11800000,
    errors,
    editValue,
    onDropAccepted = () => { },
    accept,
    handleRemove,
    ...rest
    }) => {
    const [files, setFiles] = useState([])

    return (
        <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
                <Dropzone
                    onChange={e => onChange(e.target.files[0])}
                    setFiles={setFiles}
                    files={files}
                    hidden={hidden}
                    thumbActions={thumbActions}
                    maxSize={maxSize}
                    errors={errors}
                    name={name}
                    editValue={editValue}
                    InputChange={InputChange}
                    error={error}
                    onDropAccepted={onDropAccepted}
                    accept={accept}
                    handleRemove={handleRemove}
                    {...rest}
                />
            )}
            name={name}
            control={control}
        />
    )
}

const Dropzone = ({
    onChange,
    setFiles,
    files,
    maxSize,
    errors,
    name,
    editValue,
    onDropAccepted,
    InputChange,
    accept,
    label = null,
    multiple = false,
    ...rest
    }) => {
    const fileSizeValidator = file => {
        if (file.length > maxSize) return {
                code: 'file-too-large',
                message: `Max file size is ${maxSize / 2048} MB`,
            }
    }

    const { 
        getRootProps,
        getInputProps,
        fileRejections,
        isFocused,
        isDragAccept,
        isDragReject } = useDropzone({
        ...rest,
        onDropAccepted: (acceptedFiles) => {
            setFiles(prev => ([...prev]))
            acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            )
            if (multiple) setFiles(prev => [...acceptedFiles, ...prev])
            else setFiles([acceptedFiles[0]])
            onDropAccepted()
        },
        maxSize,
        validator: fileSizeValidator,
        onDropRejected: () => {
            errorWithCustomMessage('file_size_is_large')
        },
        accept: accept ? accept : {
                'image/*': ['.jpeg', '.png'],
            },
    })

    function toDataURL(url, id = null) {
        if (url) {
            fetch(`${backend}${url}`)
            .then(response => response.blob())
            .then(blob => {
                const preview = URL.createObjectURL(blob);
                const file = { id, type: blob.type, url, preview };
                
                if (multiple) {
                setFiles(prev => [...prev, file]);
                } else {
                setFiles([file]);
                }
            })
            .catch(error => {
                console.log('error', error)
            });
        }
    }

    useEffect(() => {
        if (multiple) InputChange(name, files)
        else { files && InputChange(name, files[0]) }
    }, [files])

    useEffect(() => {
        if (Array.isArray(editValue)) {
            editValue.map(_ => toDataURL(_.imageFileUrl, _.id && _.id))
        }
        if (!Array.isArray(editValue) && editValue !== null) {
            toDataURL(editValue)
        }
    }, [editValue])
    
    console.log('files', files)

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                src={file.preview}
                style={img}
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
      ));

    return (
        <section className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps({ onChange })} />
                <p>{label}</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            {errors && <p className="text-danger">{errors}</p>}
            {fileRejections.length > 0 &&
                `Max file size is ${(maxSize / 1048576).toFixed(2)} MB`}
        </section>
    );
}

export default DropzoneField;