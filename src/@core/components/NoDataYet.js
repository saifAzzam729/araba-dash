import NoDataImage from "@src/assets/images/no-data.svg"
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function NoDataYet(){
    const {translate} = useLocaleContext();
    return(
        <div className={"w-100 text-center p-5"}>
            <img src={NoDataImage} width={"250px"} alt={"No Data Image"}/>
            <h3 className={"mt-3"}>{translate('common.no-data')}</h3>
        </div>
    )
}
