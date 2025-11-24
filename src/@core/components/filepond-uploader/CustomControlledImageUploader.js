import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "reactstrap";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css';
import "./Style.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginMediaPreview);

const ImageUploader = ({
	name,
	control,
	errors,
	label,
	multiple,
	customButton = true,
						   subLabel = ('Drag & Drop your files or <span class="filepond--label-action">Browse</span>')
}) => {
	return (
		<div className="App" style={{ direction: "ltr" }}>
			<Label className="form-label" for="fullName">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					return (
						<>
							<FilePond
								files={field.value}
								acceptedFileTypes={["image/*"]}
								onupdatefiles={(fileItems) => {
									field.onChange(fileItems.map((fileItem) => fileItem.file));
								}}
								allowMultiple={multiple} // boolean
								allowImagePreview={true}
								allowVideoPreview: true
								instantUpload={false}
								imagePreviewHeight={200}
								labelIdle={subLabel}
								credits={false}

								// oninit={() => {
								//     if (customButton) {
								//         const buttons = document.querySelectorAll('.filepond--item');
								//         buttons.forEach((button) => {
								//             const customButton = document.createElement('button');
								//
								//             customButton.type = 'button';
								//             customButton.classList.add('custom-button');
								//
								//             customButton.innerText = 'publish';
								//             customButton.type = 'button';
								//             customButton.classList.add('custom-button');
								//             customButton.addEventListener('click', () => { console.log('customButton clicked') });
								//             button.insertBefore(customButton, button.querySelector('[data-remove]'));
								//         });
								//     }
								// }}
							/>
						</>
					);
				}}
			/>
			<p>{errors && errors[name]?.message}</p>
		</div>
	);
};

export default ImageUploader;
