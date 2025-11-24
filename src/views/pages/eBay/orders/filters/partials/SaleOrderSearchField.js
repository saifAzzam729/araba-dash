import {Controller, useFormContext} from "react-hook-form";
import useQueryParams from "@hooks/useQueryParams";
import {Input, Label} from "reactstrap";

export default function SaleOrderSearchField() {
    const {control, setValue, getValues} = useFormContext();
    const {getQueryParams} = useQueryParams();
    const searchParamValue = getQueryParams("search") || "";


    return (
      <>
        <Label className="form-label">Search</Label>
        <Controller
          name="search"
          control={control}
          defaultValue={searchParamValue}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="form-control border-1 border-gray rounded-end"
              style={{ boxShadow: "none" }}
              onChange={(e) => {
                field.onChange(e);
                setValue("status", null);
              }}
            />
          )}
        />
      </>
    );
}
