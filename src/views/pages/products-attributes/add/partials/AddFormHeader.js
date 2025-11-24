import {useLocaleContext} from "@src/providers/LocaleProvider";
import {Button} from "reactstrap";
import {Plus, ArrowLeft, ArrowRight} from "react-feather";

export default function AddFormHeader({onBackClickedCb = () => null}) {
    const {translate, isRtl} = useLocaleContext();
    return (<div className={"pt-1 p-sm-2 d-flex flex-column flex-sm-row justify-content-between"}>
        <h3 className='card-title text-center text-primary font-large-1 mb-1 mb-sm-0'>
            {translate('product-attribute.add-page.text-header')}
        </h3>

        <div className='m-auto m-sm-0'>
            <Button className='btn-icon mx-2' color='dark' outline type={"button"} onClick={onBackClickedCb}>
                <span className='mx-25'>{translate('common.back')}</span>
                {isRtl ? <ArrowRight size={14}/> : <ArrowLeft size={14}/>}
            </Button>
            <Button className='btn-icon' color='success' outline type={"submit"}>
                <span className='mx-25'>{translate('common.create')}</span>
                <Plus size={14}/>
            </Button>
        </div>
    </div>)
}
