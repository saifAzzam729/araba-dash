import CreateColumn from "../../../../../../../@core/components/table/CreateColumn";
import AvatarGroup from "@components/avatar-group";
import {Badge} from "reactstrap";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

const OptionsColumn = CreateColumn({
    name: "Options",
    translateKey: 'products-images.table.options',
    cellCustomizationFunction: (row) => {
        const data =  row.options.map((item) => (
            <Badge color={'light-secondary'}  className='me-2' pill  >
                {item.optionName}
            </Badge>
            )
        )
        return data
    },
});

const ImagesColumn = CreateColumn({
    name: "Images",
    translateKey: 'products-images.table.images',
    cellCustomizationFunction: (row) => {
        const avatarData = row.images.map((img) => ({
            img: img.imageFileUrl,
            id: img.id,
            title: 'image'
        }));
        return <AvatarGroup data={avatarData} />;
    },
});

const columns = [OptionsColumn];

export const createColumns = (openViewModal) => {
    return [
        ...columns,
      CreateColumn({
        name: "Images",
        translateKey: 'products-images.table.images',
        cellCustomizationFunction: (row) => {
            const avatarData = row.images.map((img) => ({
                img: img.imageFileUrl,
                id: img.id,
                title: 'image'
            }));
            return <AvatarGroup data={avatarData} openViewModal={openViewModal} />;
        },
    })

    ]
}


export default columns;
