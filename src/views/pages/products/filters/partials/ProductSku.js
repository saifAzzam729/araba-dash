import {Controller, useFormContext} from "react-hook-form";
import useQueryParams from "@hooks/useQueryParams";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Input, InputGroup, InputGroupText, Label} from "reactstrap";
import {Search} from "react-feather";

export default function ProductSku() {
    const {control} = useFormContext();
    const {translate} = useLocaleContext();
    const {getQueryParams} = useQueryParams();


    const sku = getQueryParams("sku") || "";

    return (
        <>
         <Label className="form-label">
			{translate("common.sku")}
		</Label>
        <Controller
            name="sku"
            control={control}
            defaultValue={sku}
            render={({field}) => (
                    
                    <Input
                        {...field}
                        type="text"
                        className="form-control border-1 border-gray rounded-end"
                        style={{boxShadow: "none"}} // Remove the default focus shadow
                    />

            )}
        />
        </>
       
    );
}
