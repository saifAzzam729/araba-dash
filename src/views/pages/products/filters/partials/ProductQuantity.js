import {Controller, useFormContext} from "react-hook-form";
import useQueryParams from "@hooks/useQueryParams";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Input, Label} from "reactstrap";
import {Search} from "react-feather";

export default function ProductQuantity() {
    const {control} = useFormContext();
    const {translate} = useLocaleContext();
    const {getQueryParams} = useQueryParams();


    const quantity = getQueryParams("quantity") || "";

    return (
        <>
         <Label className="form-label">
			{translate("common.quantity")}
		</Label>
        <Controller
            name="quantity"
            control={control}
            defaultValue={quantity}
            render={({field}) => (
                    
                    <Input
                        {...field}
                        type="text"
                        className="form-control border-1 border-gray rounded-end"
                        style={{boxShadow: "none"}}
                    />

            )}
        />
        </>
       
    );
}
